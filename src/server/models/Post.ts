import mongoose, { Document, Model, model, Schema } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  content: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: [255, "Title must be less than 255 characters"],
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    maxLength: [255, "Slug must be less than 255 characters"],
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
    maxLength: [500, "Excerpt must be less than 500 characters"],
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  content: {
    type: String,
    required: true,
  },
  readingTime: {
    type: Number,
    required: true,
  },
});

export const Post: Model<PostDocument> =
  mongoose.models.Post || model<PostDocument>("Post", postSchema);
