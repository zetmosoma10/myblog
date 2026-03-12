import { notFound } from "@tanstack/react-router";
import { postSchema } from "#/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Post } from "./models/Post";
import { setResponseStatus } from "@tanstack/react-start/server";
import type { PostType } from "#/types/post.type";
import generateSlug from "#/utils/generateSlug";
import cloudinary from "#/lib/cloudinaryConfigs.server";

export const addPost = createServerFn({ method: "POST" })
  .inputValidator(postSchema)
  .handler(async ({ data }) => {
    await connectDB();

    try {
      let coverImage: string | undefined;

      // * Upload image to cloudinary if exist
      if (data.imageBase64) {
        const results = await cloudinary.uploader.upload(data.imageBase64, {
          folder: "myblog/posts",
          transformation: [
            { width: 1200, height: 630, crop: "fill" }, // * Consistent cover size
          ],
        });

        coverImage = results.secure_url;
      }

      // * Average reading speed 200 word per minute
      const wordCount = data.content.trim().split(" ").length;
      const readingTime = Math.ceil(wordCount / 200);

      const post = await Post.create({
        title: data.title,
        slug: generateSlug(data.title),
        excerpt: data.excerpt,
        tags: data.tags,
        content: data.content,
        coverImage,
        readingTime,
      });

      setResponseStatus(201);
      return JSON.parse(JSON.stringify(post));
    } catch (error: any) {
      console.error(error);

      if (error.code === 11000) {
        setResponseStatus(409);
        throw new Error("Post with this title already exist");
      }

      setResponseStatus(500);
      throw new Error("Server error");
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

      setResponseStatus(500);
      throw new Error("Unexpected error");
    }
  });
