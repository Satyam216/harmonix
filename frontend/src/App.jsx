import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Podcasts from "./pages/Podcasts";
import PodcastDetail from "./pages/PodcastDetail";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadSong from "./pages/admin/UploadSong";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      {/* 🔓 PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 👤 USER ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/podcasts"
        element={
          <ProtectedRoute>
            <Podcasts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/podcast/:id"
        element={
          <ProtectedRoute>
            <PodcastDetail />
          </ProtectedRoute>
        }
      />

      {/* 🛠️ ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/upload"
        element={
          <AdminRoute>
            <UploadSong />
          </AdminRoute>
        }
      />

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

    </Routes>
  );
}
