import fs from "fs";
import File from "../models/File.js";

export const uploadFile = async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, "utf-8");
    const file = new File({
      filename: req.file.originalname,
      content: fileContent,
    });
    await file.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "File upload failed" });
  }
};
