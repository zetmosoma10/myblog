import mongoose, { Model, Schema } from "mongoose";

const newsLetterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

export const NewsLetter: Model<{ email: string }> =
  mongoose.models.NewsLetter ||
  mongoose.model<{ email: string }>("NewsLetter", newsLetterSchema);
