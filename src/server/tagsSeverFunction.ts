import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./middleware/authMiddlware";
import { tagSchema } from "#/schemas/post.schema";
import { connectDB } from "./db.server";
import { setResponseStatus } from "@tanstack/react-start/server";
import Tag from "./models/Tag";
import generateSlug from "#/utils/generateSlug";

export const addTag = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(tagSchema)
  .handler(async ({ data: tag }) => {
    await connectDB();

    try {
      const createdTag = await Tag.create({
        name: tag.name,
        slug: generateSlug(tag.name),
      });

      setResponseStatus(201);
      return JSON.parse(JSON.stringify(createdTag));
    } catch (error) {
      setResponseStatus(500);
      throw new Error("Unexpected error");
    }
  });
