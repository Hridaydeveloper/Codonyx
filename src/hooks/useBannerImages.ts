import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BannerImage {
  id: string;
  image_url: string;
  alt_text: string | null;
}

export function useBannerImages() {
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    const { data } = await supabase
      .from("banner_images")
      .select("id, image_url, alt_text")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });
    setBanners(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBanners();

    // Listen for realtime changes so newly added banners show up without a hard refresh
    const channel = supabase
      .channel("banner_images_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "banner_images" },
        () => fetchBanners()
      )
      .subscribe();

    // Also refetch when the tab regains focus (covers cache/edge cases)
    const onFocus = () => fetchBanners();
    window.addEventListener("focus", onFocus);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchBanners]);

  return { banners, loading, refetch: fetchBanners };
}
