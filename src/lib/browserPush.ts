// Native browser (system) notifications for Codonyx.
// Shows OS-level notifications even when the tab is in the background.

const ASKED_KEY = "codonyx-push-permission-asked";

export function isPushSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export function pushPermission(): NotificationPermission | "unsupported" {
  if (!isPushSupported()) return "unsupported";
  return Notification.permission;
}

/**
 * Ask for notification permission once (first visit / first login).
 * Safe to call repeatedly — it only prompts once per browser.
 */
export async function requestPushPermission(force = false): Promise<NotificationPermission | "unsupported"> {
  if (!isPushSupported()) return "unsupported";
  if (Notification.permission !== "default") return Notification.permission;

  if (!force) {
    try {
      if (localStorage.getItem(ASKED_KEY) === "true") return Notification.permission;
      localStorage.setItem(ASKED_KEY, "true");
    } catch {
      // ignore storage errors
    }
  }

  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}

export interface SystemNotificationOptions {
  title: string;
  body?: string;
  link?: string | null;
  tag?: string;
  icon?: string;
}

/** Display a native system notification. Clicking it focuses the app (and opens the link). */
export function showSystemNotification({ title, body, link, tag, icon }: SystemNotificationOptions) {
  if (!isPushSupported() || Notification.permission !== "granted") return;

  try {
    const n = new Notification(title, {
      body: body || "",
      icon: icon || "/icon.png",
      badge: "/icon.png",
      tag,
    });

    n.onclick = () => {
      window.focus();
      if (link) {
        try {
          window.location.assign(link);
        } catch {
          // ignore navigation errors
        }
      }
      n.close();
    };
  } catch {
    // ignore notification construction errors
  }
}
