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
      const existingTag = await Tag.findOne({ slug: generateSlug(tag.name) });
      if (existingTag) {
        setResponseStatus(409);
        throw new Error("Tag already exist, please use another name tag");
      }

      const createdTag = await Tag.create({
        name: tag.name,
        slug: generateSlug(tag.name),
      });

      setResponseStatus(201);
      return JSON.parse(JSON.stringify(createdTag));
    } catch (error: any) {
      throw new Error(error);
    }
  });

export const getTags = createServerFn().handler(async () => {
  await connectDB();

  try {
    const tags = await Tag.find().lean();

    setResponseStatus(200);
    return JSON.parse(JSON.stringify(tags));
  } catch (error: any) {
    throw new Error(error);
  }
});
