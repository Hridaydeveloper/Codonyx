import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/useCountUp";
import { useBannerImages } from "@/hooks/useBannerImages";
import { ArrowRight } from "lucide-react";
import heroLabImage from "@/assets/hero-lab.jpg";
import heroHealthcare1 from "@/assets/hero-healthcare-1.jpg";
import heroHealthcare2 from "@/assets/hero-healthcare-2.jpg";
import heroHealthcare3 from "@/assets/hero-healthcare-3.jpg";

const fallbackImages = [heroLabImage, heroHealthcare1, heroHealthcare2, heroHealthcare3];

function StatCounter({ end, suffix, label, enabled }: { end: number; suffix: string; label: string; enabled: boolean }) {
  const count = useCountUp(end, 2200, 0, enabled);
  return (
    <div className="text-center px-3 sm:px-6">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-emerald-glow mb-1">
        {count}{suffix}
      </div>
      <div className="text-white/60 font-body text-[10px] sm:text-xs uppercase tracking-wider leading-tight">
        {label}
      </div>
    </div>
  );
}

export function HeroSection() {
  const { banners } = useBannerImages();
  const heroImages = banners.length > 0
    ? banners.map(b => ({ src: b.image_url, alt: b.alt_text || "CODONYX banner" }))
    : fallbackImages.map((src, i) => ({ src, alt: `AI healthcare technology ${i + 1}` }));

  const [currentImage, setCurrentImage] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Reset index if banner list shrinks
  useEffect(() => {
    if (currentImage >= heroImages.length) setCurrentImage(0);
  }, [heroImages.length, currentImage]);

  // Preload all banner images so transitions are instant
  useEffect(() => {
    heroImages.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, [heroImages]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Background images — preloaded, full-bleed (NASA style) */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <img
            key={`${img.src}-${index}`}
            src={img.src}
            alt={img.alt}
            loading={index === 0 ? "eager" : "eager"}
            decoding="sync"
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Strong dark overlay for NASA-style readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      </div>

      {/* NASA-style content: huge headline left, paragraph, primary CTA, then 3 link cards across bottom */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex flex-col">
        {/* Top spacer for navbar */}
        <div className="h-20 sm:h-24 lg:h-28" />

        {/* Main hero text */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl py-8">
          <p className="text-emerald-glow font-mono-display text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase mb-4 sm:mb-6 animate-fade-in">
            Molecular Science · AI Healthcare · Global Impact
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-white leading-[1.05] mb-6 sm:mb-8 animate-fade-in tracking-tight">
            Where Life's Code{" "}
            <br className="hidden sm:block" />
            Meets Planetary{" "}
            <span className="text-emerald-glow">Responsibility.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 animate-fade-in-delayed font-body max-w-2xl leading-relaxed">
            CODONYX blends molecular biology, artificial intelligence and Earth-conscious
            innovation to shape the future of life sciences.
          </p>

          <div className="animate-fade-in-delayed">
            <Link to="/services">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full px-7 py-6 text-base font-semibold shadow-2xl group"
              >
                Explore Our Solutions
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* NASA-style 3-column link grid */}
        <div className="border-t border-white/15 pb-10 sm:pb-12 pt-6 sm:pt-8 animate-fade-in-delayed">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8">
            {[
              { label: "Become an Advisor", sub: "Join our expert network", to: "/become-advisor" },
              { label: "Register as Laboratory", sub: "Showcase your research", to: "/laboratory-info" },
              { label: "Distribution Partner", sub: "Expand your reach globally", to: "/distributor-info" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group block border-t-2 border-white/30 pt-4 hover:border-emerald-glow transition-colors"
              >
                <p className="text-emerald-glow font-mono-display text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2">
                  {item.sub}
                </p>
                <div className="flex items-center justify-between text-white">
                  <span className="font-display text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
                    {item.label}
                  </span>
                  <span className="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/90 group-hover:bg-emerald-glow group-hover:text-navy transition-all flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="flex justify-start divide-x divide-white/15 -mx-3 sm:-mx-6">
            <StatCounter end={80} suffix="%" label="Clinical Decisions via Diagnostics" enabled={statsVisible} />
            <StatCounter end={150} suffix="B+" label="AI Healthcare Market by 2030" enabled={statsVisible} />
            <StatCounter end={8} suffix="B+" label="Lives Impacted Globally" enabled={statsVisible} />
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {heroImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrentImage(i)}
              className={`h-1 rounded-full transition-all ${
                i === currentImage ? "w-8 bg-emerald-glow" : "w-4 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
