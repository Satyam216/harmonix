import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";
import { initCloudinary } from "./config/cloudinary.js"; // 🔥 ADD

const app = express();

app.use(cors());
app.use(express.json());

initCloudinary();

app.get("/", (req, res) => {
  res.send("HARMONIX backend is running 🚀");
});

// routes
app.use("/api/upload", uploadRoutes);
console.log("TEST ENV:", process.env.CLOUDINARY_API_KEY);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
