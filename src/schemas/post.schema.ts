import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title is required" })
    .max(255, { error: "Title must be less than 255 characters" }),
  excerpt: z
    .string()
    .min(1, { error: "Excerpt is required" })
    .max(500, { error: "Excerpt must be less than 500 characters" }),
  tags: z
    .array(z.string())
    .min(1, { error: "At least one tag is required" })
    .max(5, { error: "You can select up to 5 tags" }),
  content: z.string().min(1, { error: "Content is required" }),
});
