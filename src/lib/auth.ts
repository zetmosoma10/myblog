import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const client = new MongoClient(process.env.LOCAL_DATABASE_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { transaction: false }),

  emailAndPassword: { enabled: true },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  plugins: [tanstackStartCookies()],
});

// * Export the session type for use across the app
export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
