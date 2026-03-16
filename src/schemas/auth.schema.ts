import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty({ error: "FullName required" })
      .max(100, { error: "max length must be 100" }),
    email: z
      .string()
      .nonempty({ error: "email required" })
      .email()
      .max(100, { error: "max length must be 100" }),
    password: z
      .string()
      .nonempty({ error: "password required" })
      .min(8, { error: "min password must be 8" })
      .max(255, { error: "max length must be 255" }),
    confirmPassword: z
      .string()
      .nonempty({ error: "ConfirmPassword required" })
      .min(8, { error: "min confirmPassword must be 8" })
      .max(255, { error: "max length must be 255" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ error: "email required" })
    .email()
    .max(100, { error: "max length must be 100 characters" }),
  password: z
    .string()
    .nonempty({ error: "password required" })
    .min(8, { error: "min password must be 8" })
    .max(255, { error: "max length must be 255" }),
});
