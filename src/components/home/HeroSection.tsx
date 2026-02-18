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
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 animate-fade-in-delayed">
              <Link to="/services">
                <Button variant="hero" size="xl" className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xl">
                  Explore Our Solutions
                </Button>
              </Link>
              <Link to="/become-advisor">
                <Button variant="outline" size="xl" className="border-white/50 bg-white text-foreground hover:bg-white/90 backdrop-blur-sm shadow-xl">
                  Become an Advisor
                </Button>
              </Link>
              <Link to="/register-laboratory">
                <Button variant="outline" size="xl" className="border-white/50 bg-white text-foreground hover:bg-white/90 backdrop-blur-sm shadow-xl">
                  Register as Laboratory
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="border-white/50 bg-white text-foreground hover:bg-white/90 backdrop-blur-sm shadow-xl">
                  Our Distribution Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Biological floating elements */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">

        {/* DNA Double Helix 1 */}
        <svg className="absolute top-[8%] right-[12%] w-20 h-40 opacity-20 animate-float-slow" viewBox="0 0 40 100">
          <path d="M10,0 Q30,12 10,25 Q-10,38 10,50 Q30,62 10,75 Q-10,88 10,100" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="1.5"/>
          <path d="M30,0 Q10,12 30,25 Q50,38 30,50 Q10,62 30,75 Q50,88 30,100" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="1.5"/>
          {[0,12,25,38,50,62,75,88].map(y => <line key={y} x1="10" y1={y} x2="30" y2={y} stroke="hsl(var(--emerald-glow))" strokeWidth="0.8" opacity="0.5"/>)}
        </svg>

        {/* XY Chromosome */}
        <svg className="absolute top-[55%] left-[8%] w-16 h-20 opacity-25 animate-float-medium" viewBox="0 0 50 60">
          <line x1="10" y1="5" x2="25" y2="30" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
          <line x1="40" y1="5" x2="25" y2="30" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
          <line x1="25" y1="30" x2="25" y2="55" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"/>
          <text x="3" y="5" fill="hsl(var(--emerald-glow))" fontSize="6" fontFamily="sans-serif" opacity="0.6">X</text>
        </svg>

        {/* Y Chromosome */}
        <svg className="absolute bottom-[20%] right-[22%] w-12 h-16 opacity-20 animate-float-diagonal" viewBox="0 0 40 55">
          <line x1="8" y1="5" x2="20" y2="25" stroke="hsl(var(--emerald-glow))" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="5" x2="20" y2="25" stroke="hsl(var(--emerald-glow))" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="20" y1="25" x2="20" y2="50" stroke="hsl(var(--emerald-glow))" strokeWidth="2.5" strokeLinecap="round"/>
          <text x="30" y="8" fill="hsl(var(--emerald-glow))" fontSize="6" fontFamily="sans-serif" opacity="0.5">Y</text>
        </svg>

        {/* Cell with nucleus */}
        <svg className="absolute top-[30%] right-[5%] w-24 h-24 opacity-15 animate-float-reverse" viewBox="0 0 60 60">
          <ellipse cx="30" cy="30" rx="28" ry="25" fill="none" stroke="white" strokeWidth="1" />
          <ellipse cx="30" cy="30" rx="10" ry="9" fill="hsl(var(--emerald-glow))" opacity="0.3" />
          <ellipse cx="30" cy="30" rx="10" ry="9" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="0.8" />
          <circle cx="32" cy="28" r="3" fill="hsl(var(--primary))" opacity="0.4" />
        </svg>

        {/* Red blood cell */}
        <svg className="absolute top-[75%] left-[30%] w-14 h-14 opacity-15 animate-float-fast" viewBox="0 0 40 40">
          <ellipse cx="20" cy="20" rx="18" ry="12" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="1.2"/>
          <ellipse cx="20" cy="20" rx="8" ry="5" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="0.8" opacity="0.5"/>
        </svg>

        {/* DNA Double Helix 2 (smaller) */}
        <svg className="absolute bottom-[35%] left-[45%] w-10 h-28 opacity-15 animate-float-slow-reverse" viewBox="0 0 30 80">
          <path d="M8,0 Q22,10 8,20 Q-6,30 8,40 Q22,50 8,60 Q-6,70 8,80" fill="none" stroke="white" strokeWidth="1"/>
          <path d="M22,0 Q8,10 22,20 Q36,30 22,40 Q8,50 22,60 Q36,70 22,80" fill="none" stroke="white" strokeWidth="1"/>
          {[0,10,20,30,40,50,60,70].map(y => <line key={y} x1="8" y1={y} x2="22" y2={y} stroke="white" strokeWidth="0.5" opacity="0.4"/>)}
        </svg>

        {/* Mitosis cell dividing */}
        <svg className="absolute top-[18%] left-[25%] w-20 h-14 opacity-15 animate-float-medium-reverse" viewBox="0 0 70 40">
          <ellipse cx="22" cy="20" rx="18" ry="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
          <ellipse cx="48" cy="20" rx="18" ry="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
          <ellipse cx="22" cy="20" rx="5" ry="5" fill="hsl(var(--emerald-glow))" opacity="0.25"/>
          <ellipse cx="48" cy="20" rx="5" ry="5" fill="hsl(var(--emerald-glow))" opacity="0.25"/>
        </svg>

        {/* Neuron-like cell */}
        <svg className="absolute bottom-[10%] right-[40%] w-16 h-16 opacity-15 animate-float-fast-reverse" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="8" fill="hsl(var(--emerald-glow))" opacity="0.2" stroke="hsl(var(--emerald-glow))" strokeWidth="0.8"/>
          <line x1="25" y1="17" x2="25" y2="3" stroke="white" strokeWidth="0.8" opacity="0.4"/>
          <line x1="33" y1="25" x2="47" y2="25" stroke="white" strokeWidth="0.8" opacity="0.4"/>
          <line x1="17" y1="25" x2="3" y2="25" stroke="white" strokeWidth="0.8" opacity="0.4"/>
          <line x1="31" y1="19" x2="42" y2="8" stroke="white" strokeWidth="0.8" opacity="0.4"/>
          <line x1="19" y1="31" x2="8" y2="42" stroke="white" strokeWidth="0.8" opacity="0.4"/>
          <line x1="31" y1="31" x2="42" y2="42" stroke="white" strokeWidth="0.6" opacity="0.3"/>
          <line x1="19" y1="19" x2="8" y2="8" stroke="white" strokeWidth="0.6" opacity="0.3"/>
        </svg>

        {/* Small floating molecules */}
        <svg className="absolute top-[45%] left-[18%] w-10 h-10 opacity-20 animate-float-fast" viewBox="0 0 30 30">
          <circle cx="15" cy="8" r="4" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="1"/>
          <circle cx="8" cy="22" r="4" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="1"/>
          <circle cx="22" cy="22" r="4" fill="none" stroke="hsl(var(--emerald-glow))" strokeWidth="1"/>
          <line x1="15" y1="12" x2="8" y2="18" stroke="hsl(var(--emerald-glow))" strokeWidth="0.8"/>
          <line x1="15" y1="12" x2="22" y2="18" stroke="hsl(var(--emerald-glow))" strokeWidth="0.8"/>
        </svg>

        {/* X Chromosome */}
        <svg className="absolute top-[65%] right-[8%] w-14 h-18 opacity-20 animate-float-slow" viewBox="0 0 40 50">
          <line x1="8" y1="5" x2="32" y2="45" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="5" x2="8" y2="45" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="20" cy="25" r="3" fill="hsl(var(--emerald-glow))" opacity="0.3"/>
        </svg>
      </div>

      {/* Glow overlay */}
      <div className="absolute inset-0 opacity-5 z-[4] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-glow blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary blur-[80px]" />
      </div>
    </section>
  );
}
