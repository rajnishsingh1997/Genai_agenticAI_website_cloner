import express from "express";
import isValidURL from "../utils/validateUrl.js";
import axios from "axios";
import * as cheerio from "cheerio";
import mainProcessor from "../services/processWithLLM.js";

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

  try {
    const response = await axios.get(url);
    const resultFromLLM = await mainProcessor(response);
    
    res.status(200).json({
      success: true,
      message: resultFromLLM,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

export default analyzeUrl;
