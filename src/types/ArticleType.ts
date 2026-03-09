import type { articleSchema } from "#/schemas/articleSchema";
import { z } from "zod";

export type ArticleType = z.infer<typeof articleSchema>;
