import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMonitoring } from "./lib/monitoring";

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

createRoot(document.getElementById("root")!).render(<App />);
