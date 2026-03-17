import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import textRoutes from "./routes/textRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/text", textRoutes);
app.use("/api/image", imageRoutes);

app.get("/", (req, res) => {
  res.send("AI Backend Running ");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});