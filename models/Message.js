import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    topic: String,
    payload: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
