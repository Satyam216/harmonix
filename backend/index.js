const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/tracks", (req, res) => {
  res.json([
    { id: 1, title: "Night Drive", artist: "Harmonix" },
    { id: 2, title: "LoFi Chill", artist: "Harmonix" }
  ]);
});

app.get("/categories", (req, res) => {
  res.json(["Chill", "Workout", "Focus"]);
});

app.listen(5000, () => console.log("Backend running"));
