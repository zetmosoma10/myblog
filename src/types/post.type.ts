import type {
  postSearchQuerySchema,
  updatePostSchema,
} from "#/schemas/post.schema";
import { z } from "zod";

export type PostType = {
  _id: string;
  title: string;
  slug?: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  imageBase64?: string;
  content: string;
  readingTime: number;
  status?: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
};

export type UpdatePostType = z.infer<typeof updatePostSchema>;

export type PostSearchQuery = z.infer<typeof postSearchQuerySchema>;
