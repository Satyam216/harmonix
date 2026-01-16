import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import uploadSongsRoutes from "./routes/uploadSongs.js";
import { initCloudinary } from "./config/cloudinary.js"; // 🔥 ADD
import searchRoutes from "./routes/search.js";
import "./config/firebaseAdmin.js";
import uploadPodcastRoutes from "./routes/uploadPodcast.js";

const app = express();

app.use(cors());
app.use(express.json());

initCloudinary();

app.get("/", (req, res) => {
  res.send("HARMONIX backend is running 🚀");
});

// routes
app.use("/api/upload", uploadSongsRoutes);
app.use("/api/upload", uploadPodcastRoutes);

console.log("TEST ENV:", process.env.CLOUDINARY_API_KEY);

app.use("/api/search", searchRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
