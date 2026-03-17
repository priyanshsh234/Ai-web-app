const ResultDisplay = ({ enhanced, image, analysis }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {/* Enhanced Text */}
      {enhanced && (
        <div>
          <h3>Enhanced Prompt</h3>
          <p>{enhanced}</p>
        </div>
      )}

      {/* Generated Image */}
      {image && (
        <div>
          <h3>Generated Image</h3>
          <img src={image} alt="generated" width="300" />
        </div>
      )}

      {/* Image Analysis */}
      {analysis && (
        <div>
          <h3>Image Analysis</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;