import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
