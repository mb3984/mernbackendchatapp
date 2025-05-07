import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model (if you have one)
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["user", "ai", "system"], // Message types: user message, AI response, or system-generated message
      default: "user",
    },
    status: {
      type: String,
      enum: ["sent", "processing", "failed", "completed"],
      default: "sent", // You can track the status of the message
    },
    metadata: {
      type: Map,
      of: String, // This can hold any additional metadata (e.g., model used, processing time)
      default: {},
    },
  },
  { timestamps: true }
);

// Index for faster querying (e.g., fetching messages by user or by status)
messageSchema.index({ user: 1 });
messageSchema.index({ status: 1 });
messageSchema.index({ createdAt: -1 });

export default mongoose.model("Message", messageSchema);
