import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import chromosomesImage from "@/assets/chromosomes.jpg";
import dnaHelixBg from "@/assets/dna-helix-bg.jpg";
import codonyxLogo from "@/assets/codonyx_logo.png";

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: philRef, isVisible: philVisible } = useScrollAnimation();
  const { ref: toastRef, isVisible: toastVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={dnaHelixBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
          </div>
          <div
            ref={heroRef}
            className={`container mx-auto px-6 lg:px-8 relative z-10 py-20 lg:py-32 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

            <div className="max-w-3xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <img src={codonyxLogo} alt="Codonyx" className="w-12 h-12 object-contain" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                About <span className="text-emerald-glow">CODONYX</span>
              </h1>
              <p className="text-white/80 text-lg lg:text-xl font-body leading-relaxed max-w-2xl">
                Blending science, mystery and diverse innovation — where life's code meets planetary responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy / Name Origin */}
        <section className="py-20 lg:py-28 bg-background">
          <div
            ref={philRef}
            className={`container mx-auto px-6 lg:px-8 transition-all duration-700 ${philVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-primary font-body text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                  The Name
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8 leading-tight">
                  CODONYX — blending science, mystery and diverse innovation
                </h2>
                <div className="space-y-5 text-muted-foreground font-body text-lg leading-relaxed">
                  <p>
                    <strong className="text-foreground">CODONYX</strong> combines{" "}
                    <strong className="text-primary">codon</strong>, the code of life, and{" "}
                    <strong className="text-primary">onyx</strong>, symbolizing Earth's mystery and strength.
                  </p>
                  <p>
                    The <strong className="text-emerald-glow">"YX"</strong> hints at sex chromosomes, honouring life's diversity and balance.
                  </p>
                  <p>
                    At CODONYX, we see science not just as a tool, but as a bridge between life and possibility. Every molecule we work with is a step toward a healthier world, a more sustainable future, and a deeper understanding of life itself.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={chromosomesImage}
                    alt="Scientific visualization of chromosomes"
                    className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl" />

                  <div className="absolute inset-0 rounded-2xl border border-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Toast to Life */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={chromosomesImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-navy/90" />
          </div>
          <div
            ref={toastRef}
            className={`container mx-auto px-6 lg:px-8 relative z-10 max-w-3xl text-center transition-all duration-700 ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

            <p className="text-emerald-glow font-body text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Spirit
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-8">
              We Cheer to Life!
            </h2>
            <div className="space-y-5 text-white/70 font-body text-lg leading-relaxed">
              <p>
                In everything we do, we raise a toast — to curiosity, to innovation, to the courage of discovery, and most importantly, <strong className="text-white">to life</strong>.
              </p>
              <p>
                Because at <strong className="text-emerald-glow">CODONYX</strong>, we don't just work in molecular science.{" "}
                <span className="text-white font-semibold italic text-xl">We cheer to life!</span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}