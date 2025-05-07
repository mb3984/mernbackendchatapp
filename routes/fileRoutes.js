import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/fileUploadController.js";

const router = express.Router();

// Set up multer to handle file uploads
const upload = multer({ dest: "uploads/" });

// POST route to handle file upload
router.post("/upload", upload.single("file"), uploadFile);

export default router;
