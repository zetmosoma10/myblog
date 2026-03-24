import mongoose, { Document, Model, Schema } from "mongoose";

interface TagDocument extends Document {
  name: string;
}

const tagMongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    maxLength: [50, "max length is 50 or less"],
  },
});

delete (mongoose.models as any).Tag;
const Tag: Model<TagDocument> =
  mongoose.models.Tag || mongoose.model("Tag", tagMongoSchema);

export default Tag;
