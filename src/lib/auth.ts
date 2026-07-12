import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const PROFILE_RETRY_DELAY_MS = 250;

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function fetchOwnProfile<T>(userId: string, select: string, retryCount = 1): Promise<{
  data: T | null;
  error: PostgrestError | null;
}> {
  let lastError: PostgrestError | null = null;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    const { data, error } = await supabase
      .from("profiles")
      .select(select)
      .eq("user_id", userId)
      .maybeSingle();

    if (data) {
      return { data: data as T, error: null };
    }

    lastError = error;

    if (attempt < retryCount) {
      await delay(PROFILE_RETRY_DELAY_MS);
    }
  }

  return { data: null, error: lastError };
}

const SUPABASE_TOKEN_KEY = "sb-ismtjnkzgfsrcstlyops-auth-token";

/**
 * Sign the user out from THIS device only. Other devices where the same
 * account is logged in remain signed in. Clears cached tokens from local
 * and session storage on this device.
 */
export async function signOutEverywhere() {
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch { /* noop */ }
  try { localStorage.removeItem(SUPABASE_TOKEN_KEY); } catch { /* noop */ }
  try { sessionStorage.removeItem(SUPABASE_TOKEN_KEY); } catch { /* noop */ }
}

/**
 * Verify the current session is still valid on the server. Returns true when
 * the session was revoked (e.g. signed out from another device) so callers
 * can force a local sign-out. Returns false on network errors so transient
 * failures don't kick the user out.
 */
export async function isSessionRevoked(): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      // AuthApiError with status 401/403 means the refresh token was revoked.
      const status = (error as { status?: number }).status;
      if (status === 401 || status === 403) return true;
      return false;
    }
    return !data?.user;
  } catch {
    return false;
  }
}