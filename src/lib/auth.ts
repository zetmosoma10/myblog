import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { emailOTP } from "better-auth/plugins";
import resend from "#/lib/resend";

const client = new MongoClient(process.env.LOCAL_DATABASE_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { transaction: false }),

  emailAndPassword: { enabled: true },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "forget-password") {
          await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: email,
            subject: "Reset your password",
            html: `<p>Here is the otp: ${otp} </p>`,
          });
        }
      },
    }),
    tanstackStartCookies(),
  ],
});
