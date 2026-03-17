import OpenAI from "openai";

let openai = null;

const getOpenAIClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
};

// 🔹 TEXT ENHANCEMENT
export const enhancePrompt = async (inputText) => {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Improve this prompt for image generation: ${inputText}`
      }
    ]
  });

  return response.choices[0].message.content;
};

// 🔹 IMAGE GENERATION
export const generateImageFromPrompt = async (prompt) => {
  const client = getOpenAIClient();
  const response = await client.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    size: "1024x1024"
  });

  return response.data[0].url; 
};

// 🔹 IMAGE ANALYSIS
export const analyzeImageContent = async (base64Image) => {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image in detail" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`
            }
          }
        ]
      }
    ]
  });

  return response.choices[0].message.content;
};