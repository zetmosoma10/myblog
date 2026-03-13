import { setResponseStatus } from "@tanstack/react-start/server";
import mongoose from "mongoose";

export default function isObjectId(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    setResponseStatus(400);
    throw new Error("Invalid objectId.");
  }

  return id;
}
