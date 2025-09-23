import express from "express";
import dotenv from "dotenv";
import analyzeApi from "./routes/analyzeUrl.js";
dotenv.config();

// import statement above this line

const app = express();
const portNumber = process.env.PORT;
app.use(express.json());
app.use("/api", analyzeApi);
app.listen(portNumber, () => {
  console.log(`server running on port:${portNumber}`);
});
