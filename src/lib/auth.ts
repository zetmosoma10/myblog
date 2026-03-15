import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const client = new MongoClient(process.env.LOCAL_DATABASE_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: { enabled: true },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  plugins: [tanstackStartCookies()],
});
