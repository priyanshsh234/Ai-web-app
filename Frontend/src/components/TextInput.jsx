import { useState } from "react";
import { enhanceText, generateImage } from "../services/api";
import ResultDisplay from "./ResultDisplay";

const TextInput = () => {
  const [text, setText] = useState("");
  const [enhanced, setEnhanced] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    try {
      setLoading(true);
      const res = await enhanceText(text);
      setEnhanced(res.data.enhancedText);
    } catch (error) {
      console.error("Enhance error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await generateImage(enhanced);
      setImage(res.data.image);
    } catch (error) {
      console.error("Image generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Text → Image</h2>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter prompt (e.g. a futuristic city)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />

      <br /><br />

      {/* Enhance Button */}
      <button onClick={handleEnhance} disabled={loading || !text}>
        {loading ? "Processing..." : "Enhance"}
      </button>

      <br /><br />

      {/* Generate Button */}
      {enhanced && (
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>
      )}

      {/* Results */}
      <ResultDisplay enhanced={enhanced} image={image} />
    </div>
  );
};

export default TextInput;