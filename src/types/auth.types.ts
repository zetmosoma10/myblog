import type { auth } from "#/lib/auth";

// * Export the session type for use across the app
export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = Pick<RegisterCredentials, "email" | "password">;
export type ResetPasswordCredentials = {
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
};
