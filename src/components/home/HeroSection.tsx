import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroLabImage from "@/assets/hero-lab.jpg";
import heroHealthcare1 from "@/assets/hero-healthcare-1.jpg";
import heroHealthcare2 from "@/assets/hero-healthcare-2.jpg";
import heroHealthcare3 from "@/assets/hero-healthcare-3.jpg";

const heroImages = [heroLabImage, heroHealthcare1, heroHealthcare2, heroHealthcare3];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-navy">
      <div className="container mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="relative z-10">
            <p className="text-emerald-glow font-body text-sm font-semibold tracking-[0.2em] uppercase mb-6 animate-fade-in">
              Molecular Science · AI Healthcare · Global Impact
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 animate-fade-in">
              Where Life's Code Meets Planetary{" "}
              <span className="italic text-emerald-glow">Responsibility.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 animate-fade-in-delayed font-body max-w-lg leading-relaxed">
              CODONYX blends molecular biology, artificial intelligence, and 
              Earth-conscious innovation to shape the future of life sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed">
              <Link to="/product">
                <Button variant="hero" size="xl" className="bg-white text-foreground hover:bg-white/90">
                  Explore Our Solutions
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="bg-white text-foreground hover:bg-white/90">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image - Auto-rotating */}
          <div className="relative animate-fade-in hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
              {heroImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`AI healthcare technology ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </div>
            {/* Decorative floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-emerald-glow/20 animate-float" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/10 animate-pulse-glow" />
          </div>
        </div>
      </div>

      {/* Subtle background molecular pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-glow blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary blur-[80px]" />
      </div>
    </section>
  );
}
