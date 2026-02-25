import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Aggressively clear any stale Supabase auth tokens BEFORE importing the client
// This prevents the infinite refresh_token retry storm
const STORAGE_KEY = "sb-ismtjnkzgfsrcstlyops-auth-token";
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // If the token is expired or has no valid access_token, remove it immediately
    const expiresAt = parsed?.expires_at;
    const now = Math.floor(Date.now() / 1000);
    if (!parsed?.access_token || !expiresAt || expiresAt < now) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
} catch {
  // If parsing fails, the token is corrupted — remove it
  localStorage.removeItem(STORAGE_KEY);
}

createRoot(document.getElementById("root")!).render(<App />);
