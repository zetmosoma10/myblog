import { forgotPasswordSchema } from "#/schemas/auth.schema";
import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Subscriber } from "./models/Subscriber";
import { setResponseStatus } from "@tanstack/react-start/server";

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator(forgotPasswordSchema)
  .handler(async ({ data: { email } }) => {
    await connectDB();

    try {
      const existingNewsLetter = await Subscriber.findOne({ email });

      if (existingNewsLetter) {
        setResponseStatus(409);
        throw new Error("email already exist");
      }

      await Subscriber.create({ email });
      setResponseStatus(201);
      return { success: true };
    } catch (error: any) {
      throw new Error(error);
    }
  });
