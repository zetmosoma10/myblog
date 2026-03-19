import mongoose, { Model, Schema } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Subscriber: Model<{ email: string }> =
  mongoose.models.NewsLetter ||
  mongoose.model<{ email: string }>("NewsLetter", subscriberSchema);
