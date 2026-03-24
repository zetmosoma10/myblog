import mongoose, { Document, Model, model, Schema, Types } from "mongoose";

// export interface PostDocument extends Document {
//   title: string;
//   slug: string;
//   excerpt: string;
//   tags: string[];
//   status?: "draft" | "published";
//   content: string;
//   readingTime: number;
//   coverImage?: string;
//   coverImagePublicId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

const postSchemaDocument = new Schema(
  {
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
      type: [Types.ObjectId],
      ref: "Tag",
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readingTime: {
      type: Number,
      required: true,
    },
    coverImage: String,
    coverImagePublicId: String,
  },
  { timestamps: true },
);

postSchemaDocument.index({ slug: 1 }, { unique: true });
postSchemaDocument.index({ tags: 1 });
postSchemaDocument.index({ title: "text", content: "text" });

// ✅ Fix — delete cache, force recompile
// delete (mongoose.models as any).Post; // * Uncomment this in development when you add new field to the collection

// * Check if the model already exist before creating it
export const Post = mongoose.models.Post || model("Post", postSchemaDocument);
