import { forgotPasswordSchema } from "#/schemas/auth.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { NewsLetter } from "./models/NewsLetter";
import { setResponseStatus } from "@tanstack/react-start/server";

export const addUserToNewsletter = createServerFn({ method: "POST" })
  .inputValidator(forgotPasswordSchema)
  .handler(async ({ data: { email } }) => {
    await connectDB();

    try {
      const existingNewsLetter = await NewsLetter.findOne({ email });
      if (existingNewsLetter) {
        setResponseStatus(409);
        throw new Error("email already exist");
      }

      await NewsLetter.create({ email });

      return { success: true };
    } catch (error) {
      console.error(error);
      setResponseStatus(500);
      throw new Error("Unexpected error occurred.");
    }
  });
