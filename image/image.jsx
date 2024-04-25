import React, { useState } from "react";
import './style.css'

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const apiKey = "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";
  const imageCount = 4; // how many images we want

  // Function to generate random number between min and max
  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to disable generate button
  const disableGenerateButton = () => {
    document.getElementById("generate").disabled = true;
  };

  // Function to enable generate button
  const enableGenerateButton = () => {
    document.getElementById("generate").disabled = false;
  };

  // Function to clear image grid
  const clearImageGrid = () => {
    setImages([]);
  };

  // Function to generate images
  const generateImages = async (input) => {
    disableGenerateButton();
    clearImageGrid();
    setLoading(true);

    const imageUrls = [];
    for (let i = 0; i < imageCount; i++) {
      const randomNum = getRandomNum(1, 1000);

      const prompt = `${input} ${randomNum}`;
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      if (!response.ok) {
        alert("Unable to generate images...");
      }

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);
      imageUrls.push(imageUrl);
    }
    setImages(imageUrls);
    setLoading(false);
    enableGenerateButton();
  };

  // Function to download image
  const downloadImage = (imageUrl, imageNumber) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `image-${imageNumber + 1}.png`;
    link.click();
  };

  return (
    <section id="Image-done">
    <div className="container">
      <h1>AI Image Generator</h1>
      <p>
        Write a prompt below (such as):
        cat on street, human on moon, apple on chair<br />
        - To download images - click on image
      </p>
      <form className="gen-form">
        <input
          type="text"
          className="image-input"
          id="user-prompt"
          placeholder="Type your prompt here..."
          autoComplete="off"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="button"
          id="generate"
          onClick={() => generateImages(prompt)}
        >
          Generate
        </button>
      </form>
      <div className="result-fin">
        <div id="loading" style={{ display: loading ? "block" : "none" }}>
          Generating...
          <div className="spin">
            <div className="hourglassBackground">
              <div className="hourglassContainer">
                <div className="hourglassCurves"></div>
                <div className="hourglassCapTop"></div>
                <div className="hourglassGlassTop"></div>
                <div className="hourglassSand"></div>
                <div className="hourglassSandStream"></div>
                <div className="hourglassCapBottom"></div>
                <div className="hourglassGlass"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="image-grid">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Generated image ${index}`}
              onClick={() => downloadImage(imageUrl, index)}
            />
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default AIImageGenerator;
