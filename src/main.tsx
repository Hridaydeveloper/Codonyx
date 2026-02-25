import { createRoot } from "react-dom/client";
import { supabase } from "@/integrations/supabase/client";
import App from "./App.tsx";
import "./index.css";

// Clear stale auth sessions that cause retry storms
(async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || (session && !session.access_token)) {
      await supabase.auth.signOut();
    }
  } catch {
    localStorage.removeItem("sb-ismtjnkzgfsrcstlyops-auth-token");
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
