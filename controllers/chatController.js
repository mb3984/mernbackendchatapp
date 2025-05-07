import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const chatWithAI = async (req, res) => {
  try {
    const { user, message } = req.body;

    // Optional: Fetch and format relevant context from uploaded files if needed
    const context = "Add any relevant context or file text here";

    const payload = {
      contents: [
        {
          parts: [{ text: `Context:\n${context}\n\nUser Message: ${message}` }],
        },
      ],
    };

    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply = geminiResponse.data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
};
