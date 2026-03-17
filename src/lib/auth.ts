import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import resend from "#/emails/resend";

const client = new MongoClient(process.env.LOCAL_DATABASE_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { transaction: false }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, token }) => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        subject: "reset-password",
        html: `<p>Reset link: ${process.env.BETTER_AUTH_URL}?token=${token}</p>`,
      });
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  plugins: [tanstackStartCookies()],
});
