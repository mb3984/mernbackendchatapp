import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      default: null, // Can be used to store the file path if files are stored in the file system or cloud
    },
  },
  { timestamps: true }
);

// Index for faster querying by filename or createdAt
fileSchema.index({ filename: 1 });
fileSchema.index({ createdAt: -1 });

export default mongoose.model("File", fileSchema);
