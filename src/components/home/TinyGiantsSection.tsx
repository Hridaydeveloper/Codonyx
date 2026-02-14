import dnaHelixBg from "@/assets/dna-helix-bg.jpg";

export function TinyGiantsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={dnaHelixBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
        <p className="text-emerald-glow font-body text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          The Concept
        </p>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
          Tiny Giants — Small Molecular Systems,{" "}
          <span className="text-emerald-glow">Global Impact</span>
        </h2>
        <p className="text-white/70 text-lg font-body max-w-2xl mx-auto leading-relaxed mb-12">
          At the molecular level, the smallest building blocks of life hold the power to 
          transform entire healthcare systems. CODONYX harnesses these tiny giants — codons, 
          proteins and molecular signals — to engineer solutions that scale from laboratory 
          benches to global populations.
        </p>
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { number: "400+", label: "Investments" },
            { number: "70+", label: "Countries" },
            { number: "1,000+", label: "Advisors" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-display font-bold text-emerald-glow mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 font-body text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
