import type { auth } from "#/lib/auth";

// * Export the session type for use across the app
export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;

export type LoginCredentials = {
  email: string;
  password: string;
};
