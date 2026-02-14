import { Dna, Brain, Factory, ShieldCheck, ArrowLeftRight, Globe } from "lucide-react";

const capabilities = [
  {
    icon: Dna,
    title: "Molecular Biology & Genomics",
    description: "Advanced genomic analysis and molecular engineering for precision therapeutics.",
  },
  {
    icon: Brain,
    title: "AI-Driven Diagnostics",
    description: "Machine learning models that accelerate disease detection and patient outcomes.",
  },
  {
    icon: Factory,
    title: "GMP Manufacturing",
    description: "Scalable, compliant production of biologics and advanced therapy products.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory & Compliance Strategy",
    description: "Global regulatory navigation ensuring market readiness across jurisdictions.",
  },
  {
    icon: ArrowLeftRight,
    title: "Technology Transfer",
    description: "Seamless transition from lab-scale innovation to commercial-scale production.",
  },
  {
    icon: Globe,
    title: "Global Scientific Partnerships",
    description: "Cross-border collaborations connecting research institutions and industry leaders.",
  },
];

export function CoreCapabilitiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Core Capabilities
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto">
            Six integrated pillars driving molecular innovation from discovery to global deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group p-8 rounded-xl border border-divider bg-card hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <cap.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-card-foreground mb-3">
                {cap.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
