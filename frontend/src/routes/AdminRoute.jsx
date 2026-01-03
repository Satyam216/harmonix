import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      setIsAdmin(snap.data()?.role === "admin");
    });
  }, [user]);

  if (isAdmin === null) return null;
  return isAdmin ? children : <Navigate to="/" />;
}
