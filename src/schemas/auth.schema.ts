import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().max(100, { error: "max length must be 100 characters" }),
  password: z
    .string()
    .min(4, { error: "Password required" })
    .max(255, { error: "max length must be 255" }),
});
