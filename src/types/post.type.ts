import type { articleSchema } from "#/schemas/post.schema";
import { z } from "zod";

export type ArticleType = z.infer<typeof articleSchema>;
