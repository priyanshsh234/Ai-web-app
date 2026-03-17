import { enhancePrompt } from "../services/openai.js";

export const enhanceText = async (req, res) => {
  try {
    const { text } = req.body;

    const enhanced = await enhancePrompt(text);

    res.json({ enhancedText: enhanced });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Text enhancement failed" });
  }
};