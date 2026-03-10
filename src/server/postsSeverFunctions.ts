import { postSchema } from "#/schemas/post.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Post } from "./models/Post";
import { setResponseStatus } from "@tanstack/react-start/server";

export const addPost = createServerFn({ method: "POST" })
  .inputValidator(postSchema)
  .handler(async ({ data }) => {
    await connectDB();

    try {
      const post = await Post.create({
        title: data.title,
        excerpt: data.excerpt,
        tags: data.tags,
        content: data.content,
      });

      console.log("Database: ", post);

      setResponseStatus(201);

      return JSON.parse(JSON.stringify(post));
    } catch (error: any) {
      if (error.code === 11000) {
        setResponseStatus(409);
        throw new Error("Post with this title already exist");
      }

      setResponseStatus(500);
      throw new Error("Server error");
    }
  });

export const getPosts = createServerFn().handler(async () => {
  await connectDB();

  try {
    const post = await Post.find().lean();

    setResponseStatus(200);
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.log(error);
    setResponseStatus(500);
    throw new Error("Unexpected error occured.");
  }
});
