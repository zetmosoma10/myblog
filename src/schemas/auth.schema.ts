import { z } from "zod";

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

export const forgotPasswordSchema = loginSchema.pick({ email: true });

export const resetPasswordSchema = z.object({
  otp: z
    .string()
    .nonempty({ error: "otp required" })
    .length(6, { error: "otp must be 6 digits" }),
  newPassword: z
    .string()
    .nonempty({ error: "password required" })
    .min(8, { error: "min password must be 8" })
    .max(255, { error: "max length must be 255" }),
  confirmPassword: z
    .string()
    .nonempty({ error: "ConfirmPassword required" })
    .min(8, { error: "min confirmPassword must be 8" })
    .max(255, { error: "max length must be 255" }),
});
