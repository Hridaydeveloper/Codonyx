import { useEffect } from "react";
import { requestPushPermission, isPushSupported } from "@/lib/browserPush";

/**
 * Asks for native notification permission on first visit / first login.
 * Waits for the first user interaction because some browsers (Safari, mobile
 * Chrome) only allow the permission prompt from a user gesture.
 */
export default function PushPermissionManager() {
  useEffect(() => {
    if (!isPushSupported()) return;
    if (Notification.permission !== "default") return;

    let done = false;
    const ask = () => {
      if (done) return;
      done = true;
      cleanup();
      requestPushPermission();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", ask);
      window.removeEventListener("keydown", ask);
    };

    window.addEventListener("pointerdown", ask, { once: true });
    window.addEventListener("keydown", ask, { once: true });

    // Fallback for browsers that allow prompting without a gesture.
    const timer = window.setTimeout(ask, 4000);

    return () => {
      window.clearTimeout(timer);
      cleanup();
    };
  }, []);

  return null;
}
