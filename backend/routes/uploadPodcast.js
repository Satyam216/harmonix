import express from "express";
import upload from "../middleware/upload.js";
import { isAdmin } from "../middleware/isAdmin.js";
import admin from "../config/firebaseAdmin.js";
import { initCloudinary } from "../config/cloudinary.js";

const router = express.Router();
const cloudinary = initCloudinary();

router.post(
  "/podcast",
  isAdmin,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, host, description } = req.body;

      const videoUpload = await cloudinary.uploader.upload(
        req.files.video[0].path,
        { resource_type: "video", folder: "harmonix/podcasts/podcast_video" }
      );

      const coverUpload = await cloudinary.uploader.upload(
        req.files.cover[0].path,
        { folder: "harmonix/podcasts/podcast_covers" }
      );

      await admin.firestore().collection("podcasts").add({
        title,
        host,
        description,
        videoUrl: videoUpload.secure_url,
        coverUrl: coverUpload.secure_url,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Podcast upload failed" });
    }
  }
);

export default router;
