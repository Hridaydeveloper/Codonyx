import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";
import { supabase } from "./integrations/supabase/client";

// Initialize production error monitoring
initMonitoring();

// Only clear corrupted (unparseable) tokens — valid tokens must be preserved for session persistence
const STORAGE_KEY = "sb-ismtjnkzgfsrcstlyops-auth-token";
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    JSON.parse(stored); // Just validate it's valid JSON
  }
} catch {
  localStorage.removeItem(STORAGE_KEY);
}

// Handle invalid refresh token errors globally — clear corrupt session to prevent 400 loops
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "TOKEN_REFRESHED" && !session) {
    // Refresh failed — clear local storage to stop retry loops
    localStorage.removeItem(STORAGE_KEY);
  }
});

createRoot(document.getElementById("root")!).render(<App />);
