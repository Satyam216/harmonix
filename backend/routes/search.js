import express from "express";
import admin from "../config/firebaseAdmin.js";

const router = express.Router();

/**
 * GET /api/search?q=apna
 * Searches songs (tracks)
 */
router.get("/", async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase();

    if (!q) {
      return res.json({ tracks: [] });
    }

    const snapshot = await admin.firestore().collection("tracks").get();

    const results = [];

    snapshot.forEach((doc) => {
        console.log("DOC:", doc.id, doc.data());
      const data = doc.data();

      const title = data.title?.toLowerCase() || "";
      const artist = data.artist?.toLowerCase() || "";

      if (title.includes(q) || artist.includes(q)) {
        results.push({
          id: doc.id,
          ...data,
        });
      }
    });

    res.json({ tracks: results });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});

export default router;
