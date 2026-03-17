import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api"
});

export const enhanceText = (text) =>
  API.post("/text/enhance", { text });

export const generateImage = (prompt) =>
  API.post("/image/generate", { prompt });

export const analyzeImage = (image) =>
  API.post("/image/analyze", { image });