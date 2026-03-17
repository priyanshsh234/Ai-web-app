import { useState } from "react";
import { analyzeImage, generateImage } from "../services/api";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImage(reader.result.split(",")[1]); // base64 only
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await analyzeImage(image);
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError("Failed to analyze image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await generateImage(prompt);
      setGeneratedImage(res.data.image);
    } catch (err) {
      setError("Failed to generate image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Image → Analysis</h2>

      <input type="file" onChange={handleUpload} />

      {preview && <img src={preview} alt="preview" width="200" />}

      <button onClick={handleAnalyze} disabled={!image || loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {analysis && <p><strong>Analysis:</strong> {analysis}</p>}

      <hr />

      <h2>Generate Image from Prompt</h2>
      <input
        type="text"
        placeholder="Enter image prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerateImage} disabled={!prompt || loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {generatedImage && (
        <div>
          <img src={generatedImage} alt="generated" width="300" />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;