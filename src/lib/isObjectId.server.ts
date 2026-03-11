import { Types } from "mongoose";

const isObjectId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid objectId");
  }

  return id;
};

export default isObjectId;
