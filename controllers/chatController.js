import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const chatWithAI = async (req, res) => {
  try {
    const { user, message } = req.body;
    const context = "Add any relevant context or file text here";

    // Validate API key presence
    const apiKey = process.env.OPENAI_API_KEY; // Updated to use OpenAI API key
    if (!apiKey) {
      return res
        .status(400)
        .json({ error: "API key is missing in environment variables." });
    }

    // Prepare the payload for the AI request
    const payload = {
      model: "gpt-3.5-turbo", // Use gpt-3.5-turbo (you can switch to gpt-4 if needed)
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Context:\n${context}\n\nUser Message: ${message}`,
        },
      ],
      max_tokens: 100, // Adjust the token limit based on your requirements
      temperature: 0.7, // Adjust creativity level
    };

    // Make the API request to OpenAI
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions", // OpenAI API endpoint for chat models
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Pass the OpenAI API key in the Authorization header
        },
      }
    );

    // Extract the response and send it back to the client
    const reply = openaiResponse.data.choices[0]?.message?.content.trim();

    if (!reply) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve response from OpenAI API." });
    }

    // Return the reply from OpenAI to the client
    res.status(200).json({ reply });
  } catch (error) {
    // Handle different error cases
    if (error.response) {
      // If the error comes from the API (e.g., invalid API key, rate limits)
      console.error("OpenAI API Error:", error.response.data);
      return res
        .status(error.response.status)
        .json({ error: error.response.data.error.message });
    } else {
      // If it's a network error or other errors
      console.error("Error:", error.message);
      return res.status(500).json({
        error: "An error occurred while communicating with OpenAI API",
      });
    }
  }
};
