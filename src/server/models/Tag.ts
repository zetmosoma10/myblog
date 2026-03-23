import mongoose, { Document, Model, Schema } from "mongoose";

interface TagDocument extends Document {
  name: string;
  slug: string;
}

const tagMongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: [50, "max length is 50 or less"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Tag: Model<TagDocument> =
  mongoose.models.Tag || mongoose.model("Tag", tagMongoSchema);

export default Tag;
