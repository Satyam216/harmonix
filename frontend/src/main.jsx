import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { AudioProvider } from "./context/AudioContext";
import { PodcastProvider } from "./context/PodcastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AudioProvider>
        <PodcastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PodcastProvider>
      </AudioProvider>
    </AuthProvider>
  </React.StrictMode>
);
