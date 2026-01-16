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
import Layout from "./layout/Layout";
import LikedSongs from "./pages/LikedSongs";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import PlaylistDetails from "./pages/PlaylistDetails";
import UploadPodcast from "./pages/admin/UploadPodcast";

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
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/podcasts"
        element={
          <ProtectedRoute>
            <Layout>
              <Podcasts />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/podcast/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <PodcastDetail />
            </Layout>
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
        path="/admin/uploadSong"
        element={
          <AdminRoute>
            <UploadSong />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/uploadPodcast"
        element={
          <AdminRoute>
            <UploadPodcast />
          </AdminRoute>
        }
      />


       {/* 🔥 LIKED PAGE */}
      <Route
        path="/liked"
        element={
          <ProtectedRoute>
            <Layout>
              <LikedSongs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Layout>
                <Search />
              </Layout>
            </ProtectedRoute>
          }
        />

      <Route 
        path="/playlists" 
        element={
            <ProtectedRoute>
              <Layout>
                <Playlist/>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route 
        path="/playlist/:id" 
        element={
            <ProtectedRoute>
              <Layout>
                <PlaylistDetails/>
              </Layout>
            </ProtectedRoute>
          }
        />  
    </Routes>
  );
}
