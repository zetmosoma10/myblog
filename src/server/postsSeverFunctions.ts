import { postSchema } from "#/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Post } from "./models/Post";
import { setResponseStatus } from "@tanstack/react-start/server";
import type { PostType } from "#/types/post.type";
import generateSlug from "#/utils/generateSlug";

export const addPost = createServerFn({ method: "POST" })
  .inputValidator(postSchema)
  .handler(async ({ data }) => {
    await connectDB();

    // * Average reading speed 200 word per minute
    const wordCount = data.content.trim().split(" ").length;
    const readingTime = Math.ceil(wordCount / 200);

    try {
      const post = await Post.create({
        title: data.title,
        slug: generateSlug(data.title),
        excerpt: data.excerpt,
        tags: data.tags,
        content: data.content,
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
