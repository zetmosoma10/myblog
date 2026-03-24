import { isNotFound, notFound } from "@tanstack/react-router";
import {
  postSchema,
  postSearchQuerySchema,
  updatePostSchema,
} from "#/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Post } from "./models/Post";
import { setResponseStatus } from "@tanstack/react-start/server";
import type { ResponsePostType } from "#/types/post.type";
import { Subscriber } from "./models/Subscriber";
import { NewPostEmailHtml } from "#/emails/NewPostEmail";
import { getSession } from "./authServerFunctions";
import type { Response } from "#/types/response.type";
import { authMiddleware } from "./middleware/authMiddleware";
import generateSlug from "#/utils/generateSlug";
import cloudinary from "#/lib/cloudinaryConfigs.server";
import isObjectId from "#/lib/isObjectId.server";
import uploadImage from "#/lib/uploadImage.server";
import getWordCount from "#/utils/getWordCount";
import resend from "#/lib/resend";
import Tag from "./models/Tag";

export const addPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(postSchema)
  .handler(async ({ data }) => {
    await connectDB();
    console.log("Recieved FormData: ", data);

    try {
      // * Throw error to avoid same slug urls
      const existingSlugPost = await Post.findOne({
        slug: generateSlug(data.title),
      });
      if (existingSlugPost) {
        setResponseStatus(409);
        throw new Error(
          "Post with that Title already exist. Please use another Title",
        );
      }

      const { coverImage, coverImagePublicId } = await uploadImage(
        data.imageBase64,
        "myblog/posts",
      );

      // * Get tags Ids from Tag collection to save them on post collection
      const tags = await Tag.find({ name: { $in: data.tags } });
      const tagsIds = tags.map((t) => t.id);

      const post = await Post.create({
        title: data.title,
        slug: generateSlug(data.title),
        excerpt: data.excerpt,
        tags: tagsIds,
        content: data.content,
        status: data.status,
        readingTime: getWordCount(data.content),
        coverImage,
        coverImagePublicId,
      });

      // * Send Email to subscribers
      const subscribers = await Subscriber.find().lean();

      if (post.status === "published" && subscribers.length > 0) {
        const postUrl = `${process.env.VITE_APP_URL}/posts/${post.slug}`;

        const html = await NewPostEmailHtml({
          postTitle: post.title,
          postExcerpt: post.excerpt,
          postUrl: postUrl,
          tags: post.tags,
        });

        const emails = subscribers.map((sub) => ({
          from: process.env.EMAIL_FROM!,
          to: sub.email,
          subject: `New Post: ${post.title}`,
          html,
        }));

        const chuckSize = 100;
        for (let i = 0; i < emails.length; i += chuckSize) {
          const chuck = emails.slice(i, i + chuckSize);
          await resend.batch.send(chuck);
        }
      }

      setResponseStatus(201);
      return JSON.parse(JSON.stringify(post));
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  });

export const getPosts = createServerFn()
  .inputValidator(postSearchQuerySchema)
  .handler(async ({ data }): Promise<Response> => {
    await connectDB();
    const { user } = await getSession();
    const { page = 1, tags, search } = data;

    try {
      // ! BASE FILTER
      // * Authenticated → can view drafts
      // * Unauthenticated → published only
      const filter: Record<string, any> = user ? {} : { status: "published" };

      // ! TAGS FILTER
      if (tags && tags !== "all") {
        // * Get tag with given tag name from Tag collection
        const foundTag = await Tag.findOne({ name: tags });

        // * Return empty array if tag don't exist
        if (!foundTag) {
          return JSON.parse(
            JSON.stringify({
              totalPages: 0,
              currentPage: 1,
              hasNextPage: false,
              totalDocuments: 0,
              data: [],
            }),
          );
        }

        filter.tags = foundTag._id;
      }

      // ! SEARCH FILTER
      if (search) {
        filter.$text = { $search: search };
      }

      const limit = 9;
      const skip = (page - 1) * limit;

      // * RUN COUNT & FETCH POST IN PARALLEL
      const [posts, documentCounts] = await Promise.all([
        Post.find(filter)
          .populate("tags", "name")
          .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Post.countDocuments(filter),
      ]);

      setResponseStatus(200);

      return JSON.parse(
        JSON.stringify({
          totalPages: Math.ceil(documentCounts / limit),
          currentPage: page,
          hasNextPage: page < Math.ceil(documentCounts / limit),
          totalDocuments: documentCounts,
          data: posts,
        }),
      );
    } catch (error) {
      console.log(error);
      setResponseStatus(500);
      throw new Error("Unexpected error occurred.");
    }
  });

export const getPost = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<ResponsePostType> => {
    await connectDB();

    const { user } = await getSession();

    try {
      // * Authenticated → can view drafts
      // * Unauthenticated → published only
      const filter = user ? { slug } : { slug, status: "published" };

      const post = await Post.findOne(filter).lean();

      if (!post) {
        setResponseStatus(404);
        throw notFound();
      }

      setResponseStatus(200);
      return JSON.parse(JSON.stringify(post));
    } catch (error) {
      console.log(error);

      if (isNotFound(error)) throw error;

      setResponseStatus(500);
      throw new Error("Unexpected error");
    }
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((id: string) => isObjectId(id))
  .handler(async ({ data: id }) => {
    await connectDB();

    try {
      const post = await Post.findById(id);
      if (!post) throw notFound();

      // * Delete Image from cloudinary
      if (post.coverImagePublicId) {
        await cloudinary.uploader.destroy(post.coverImagePublicId);
      }

      await post.deleteOne();

      setResponseStatus(200);
      return { success: true };
    } catch (error) {
      console.log(error);

      if (isNotFound(error)) throw error;

      setResponseStatus(500);
      throw new Error("Unexpected error occurred.");
    }
  });

export const updatePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(updatePostSchema)
  .handler(async ({ data: post }) => {
    await connectDB();

    try {
      const { coverImage, coverImagePublicId } = await uploadImage(
        post.imageBase64,
        "myblog/posts",
      );

      const updatedPost = await Post.findByIdAndUpdate(
        post?._id,
        {
          ...post,
          coverImage,
          coverImagePublicId,
          readingTime: getWordCount(post?.content),
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatePost) {
        setResponseStatus(404);
        throw notFound();
      }

      setResponseStatus(200);
      return JSON.parse(JSON.stringify(updatedPost));
    } catch (error) {
      console.log(error);

      if (isNotFound(error)) {
        throw notFound();
      }

      setResponseStatus(500);
      throw new Error("Unexpected error occurred.");
    }
  });
