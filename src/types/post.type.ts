import type { postSchema } from "#/schemas/post.schema";
import { z } from "zod";

export type PostType = z.infer<typeof postSchema>;
