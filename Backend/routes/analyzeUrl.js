import express from "express";
import isValidURL from "../utils/validateUrl.js";
import axios from "axios";


const analyzeUrl = express();

analyzeUrl.post("/analyze", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Url is required",
    });
  }

  const isProvidedUrlValid = isValidURL(url);

  if (!isProvidedUrlValid) {
    return res.status(400).json({
      success: false,
      message: "Provided Url is not valid",
    });
  }
  
  const response = await axios.get(url);
  res.status(200).json({
    success: true,
    message: response.data,
  });
});

export default analyzeUrl;
