import { Document, Model, model, models, Schema } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
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
});

export const Post: Model<PostDocument> =
  models.Post || model<PostDocument>("Post", postSchema);
