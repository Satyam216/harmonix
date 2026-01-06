import admin from "firebase-admin";
import fs from "fs";

// 🔑 Service account key path
const serviceAccount = JSON.parse(
  fs.readFileSync("./harmonix-serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
