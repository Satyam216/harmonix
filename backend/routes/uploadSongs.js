import express from "express";
import { initCloudinary } from "../config/cloudinary.js";
import upload from "../middleware/upload.js";
import { isAdmin } from "../middleware/isAdmin.js";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();
const cloudinary = initCloudinary(); 

router.post(
  "/song",
  isAdmin,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, artist } = req.body;

      const audioUpload = await cloudinary.uploader.upload(
        req.files.audio[0].path,
        { resource_type: "video", folder: "harmonix/songs" }
      );

      const coverUpload = await cloudinary.uploader.upload(
        req.files.cover[0].path,
        { folder: "harmonix/covers" }
      );

      await admin.firestore().collection("tracks").add({
        title,
        artist,
        audioUrl: audioUpload.secure_url,
        coverUrl: coverUpload.secure_url,
        playCount: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

export default router;
