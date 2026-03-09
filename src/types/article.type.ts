import type { articleSchema } from "#/schemas/article.schema";
import { z } from "zod";

export type ArticleType = z.infer<typeof articleSchema>;
