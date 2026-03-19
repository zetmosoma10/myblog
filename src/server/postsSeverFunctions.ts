import { isNotFound, notFound } from "@tanstack/react-router";
import { postSchema, updatePostSchema } from "#/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Post } from "./models/Post";
import { setResponseStatus } from "@tanstack/react-start/server";
import type { PostType } from "#/types/post.type";
import generateSlug from "#/utils/generateSlug";
import cloudinary from "#/lib/cloudinaryConfigs.server";
import isObjectId from "#/lib/isObjectId.server";
import uploadImage from "#/lib/uploadImage.server";
import getWordCount from "#/utils/getWordCount";
import { Subscriber } from "./models/Subscriber";
import resend from "#/lib/resend";

export const addPost = createServerFn({ method: "POST" })
  .inputValidator(postSchema)
  .handler(async ({ data }) => {
    await connectDB();

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

      const post = await Post.create({
        title: data.title,
        slug: generateSlug(data.title),
        excerpt: data.excerpt,
        tags: data.tags,
        content: data.content,
        readingTime: getWordCount(data.content),
        coverImage,
        coverImagePublicId,
      });

      // * Send Email to subscribers
      const subscribers = await Subscriber.find().lean();

      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: subscribers.map((s) => s.email),
        subject: "New Post added!",
        html: `<p>Hi, New Post Created visit this link to check it</p>`,
      });

      if (error) console.log("EMAIL ERROR: ", error);

      setResponseStatus(201);
      return JSON.parse(JSON.stringify(post));
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  });

export const getPosts = createServerFn().handler(
  async (): Promise<PostType[]> => {
    await connectDB();

    try {
      const post = await Post.find().lean();

      setResponseStatus(200);
      return JSON.parse(JSON.stringify(post));
    } catch (error) {
      console.log(error);
      setResponseStatus(500);
      throw new Error("Unexpected error occurred.");
    }
  },
);

export const getPost = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<PostType> => {
    await connectDB();

    try {
      const post = await Post.findOne({ slug }).lean();

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
