import express from "express";
import { chatWithAI } from "../controllers/chatController.js";

const router = express.Router();

// POST route to handle chat requests
router.post("/ask", chatWithAI);

export default router;
