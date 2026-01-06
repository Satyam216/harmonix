import admin from "firebase-admin";

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = await admin.auth().verifyIdToken(token);

    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (userDoc.data()?.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
