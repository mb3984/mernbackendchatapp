import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
    response: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
