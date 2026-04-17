import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BannerImage {
  id: string;
  image_url: string;
  alt_text: string | null;
}

export function useBannerImages() {
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("banner_images")
        .select("id, image_url, alt_text")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (!cancelled) {
        setBanners(data || []);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { banners, loading };
}
