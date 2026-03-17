import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-web-app-cys6.onrender.com/api"
});

export const enhanceText = (text) =>
  API.post("/text/enhance", { text });

export const generateImage = (prompt) =>
  API.post("/image/generate", { prompt });

export const analyzeImage = (image) =>
  API.post("/image/analyze", { image });