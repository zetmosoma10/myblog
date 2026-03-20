import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title is required" })
    .max(255, { error: "Title must be less than 255 characters" }),
  slug: z
    .string()
    .max(255, { error: "Slug must be less than 255 characters" })
    .optional(),
  excerpt: z
    .string()
    .min(1, { error: "Excerpt is required" })
    .max(500, { error: "Excerpt must be less than 500 characters" }),
  tags: z
    .array(z.string())
    .min(1, { error: "At least one tag is required" })
    .max(5, { error: "You can select up to 5 tags" }),
  content: z.string().min(1, { error: "Content is required" }),
  coverImage: z.string().optional(),
  imageBase64: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export const updatePostSchema = postSchema.partial().extend({
  _id: z.string().min(1, { error: "_id is required" }),
});

export const postQuery = z.object({
  page: z.number().optional(),
  tags: z.string().optional(),
  search: z.string().optional(),
});
