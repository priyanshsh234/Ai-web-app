import {
  generateImageFromPrompt,
  analyzeImageContent
} from "../services/openai.js";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const image = await generateImageFromPrompt(prompt);

    res.json({ image });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
};

export const analyzeImage = async (req, res) => {
  try {
    const { image } = req.body;

    const result = await analyzeImageContent(image);

    res.json({ analysis: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Image analysis failed" });
  }
};