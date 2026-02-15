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
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images - Auto-rotating */}
      <div className="absolute inset-0 z-0">
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
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="relative">
            <p className="text-emerald-glow font-body text-sm font-semibold tracking-[0.2em] uppercase mb-6 animate-fade-in drop-shadow-lg">
              Molecular Science · AI Healthcare · Global Impact
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 animate-fade-in drop-shadow-2xl">
              Where Life's Code Meets Planetary{" "}
              <span className="italic text-emerald-glow drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                Responsibility.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 animate-fade-in-delayed font-body max-w-lg leading-relaxed drop-shadow-lg">
              CODONYX blends molecular biology, artificial intelligence and 
              Earth-conscious innovation to shape the future of life sciences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed">
              <Link to="/product">
                <Button variant="hero" size="xl" className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xl">
                  Explore Our Solutions
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="border-white/50 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm shadow-xl">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cells - Multiple decorative elements */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {/* Cell 1 - Large ring */}
        <div className="absolute top-[15%] right-[20%] w-24 h-24 rounded-full border-2 border-emerald-glow/20 animate-float-slow" />
        
        {/* Cell 2 - Medium filled */}
        <div className="absolute top-[60%] left-[10%] w-16 h-16 rounded-full bg-primary/10 animate-float-medium" />
        
        {/* Cell 3 - Small ring */}
        <div className="absolute bottom-[30%] right-[15%] w-12 h-12 rounded-full border border-white/10 animate-float-fast" />
        
        {/* Cell 4 - Large filled with glow */}
        <div className="absolute top-[40%] right-[8%] w-20 h-20 rounded-full bg-emerald-glow/5 animate-float-diagonal" />
        
        {/* Cell 5 - Small ring top left */}
        <div className="absolute top-[25%] left-[15%] w-10 h-10 rounded-full border border-primary/20 animate-float-reverse" />
        
        {/* Cell 6 - Medium ring bottom */}
        <div className="absolute bottom-[15%] left-[25%] w-14 h-14 rounded-full border-2 border-white/10 animate-float-slow-reverse" />
        
        {/* Cell 7 - Tiny dot */}
        <div className="absolute top-[70%] right-[30%] w-8 h-8 rounded-full bg-primary/15 animate-float-fast-reverse" />
        
        {/* Cell 8 - Medium filled */}
        <div className="absolute bottom-[40%] left-[40%] w-16 h-16 rounded-full bg-white/5 animate-float-medium-reverse" />
      </div>
      
      {/* Subtle molecular pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-[5] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-glow blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary blur-[80px]" />
      </div>
    </section>
  );
}
