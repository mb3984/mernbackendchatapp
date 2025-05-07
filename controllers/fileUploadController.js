import fs from "fs";
import path from "path";
import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    // Validate file existence
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Validate file size (for example, max size 10MB)
    if (req.file.size > 10 * 1024 * 1024) {
      // 10MB
      return res
        .status(400)
        .json({ error: "File size exceeds the maximum limit of 10MB." });
    }

    // Validate file type (for example, only allow text files)
    const allowedTypes = ["text/plain", "application/json"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({
          error: "Invalid file type. Only text and JSON files are allowed.",
        });
    }

    // Asynchronously read the file content (non-blocking)
    const fileContent = await fs.promises.readFile(req.file.path, "utf-8");

    // Store file details in database
    const file = new File({
      filename: req.file.originalname,
      content: fileContent,
    });

    await file.save();

    // Return success response
    res
      .status(201)
      .json({
        message: "File uploaded successfully",
        filename: req.file.originalname,
      });
  } catch (err) {
    // Catch any errors and send a meaningful message
    console.error("File upload error:", err);
    res.status(500).json({ error: "File upload failed. Please try again." });
  }
};
