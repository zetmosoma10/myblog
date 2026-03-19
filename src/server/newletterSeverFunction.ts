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
      console.log("Exist", existingNewsLetter);

      if (existingNewsLetter) {
        console.log("RUN!");
        setResponseStatus(409);
        throw new Error("email already exist");
      }

      await NewsLetter.create({ email });

      return { success: true };
    } catch (error: any) {
      console.error("SERVER", error);
      throw new Error(error);
    }
  });
