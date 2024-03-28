// MemeGenerator.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MemeGenerator = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memeUrl, setMemeUrl] = useState("");

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await axios.get("https://api.memegen.link/templates/");
      setMemes(response.data);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  const generateMeme = () => {
    setMemeUrl(
      `https://api.memegen.link/images/${selectedMeme}/${topText}/${bottomText}.png`
    );
  };

  return (
    <div style={{ backgroundColor: "grey", padding: "20px" }}>
      {/* <h1>Meme Generator</h1> */}
      <label>Select a meme template:</label>
      <select
        value={selectedMeme}
        onChange={(e) => setSelectedMeme(e.target.value)}
      >
        {memes.map((meme) => (
          <option key={meme.id} value={meme.id}>
            {meme.name}
          </option>
        ))}
      </select>

      <br />

      <label>Top Text:</label>
      <input
        type="text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
      />

      <br />

      <label>Bottom Text:</label>
      <input
        type="text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
      />

      <br />

      <button onClick={generateMeme}>Generate Meme</button>

      {memeUrl && (
        <div>
          <h2>Generated Meme</h2>
          <img src={memeUrl} alt="Generated Meme" />
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;
