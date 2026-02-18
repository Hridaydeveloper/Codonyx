import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical, Mail, ShieldCheck, Users, Cpu, FileSearch, Handshake } from "lucide-react";
import heroLabImage from "@/assets/hero-lab.jpg";
import aiMolecularImg from "@/assets/ai-molecular.jpg";

const advantages = [
  { icon: Users, title: "Expert Advisors", desc: "Access top-tier advisors across molecular biology, AI diagnostics, regulatory strategy, and more." },
  { icon: Cpu, title: "AI-Powered Insights", desc: "Leverage our AI platform for smart advisor matching tailored to your research needs." },
  { icon: FileSearch, title: "Verified Network", desc: "Every advisor in our network is vetted for excellence, ensuring meaningful partnerships." },
  { icon: Handshake, title: "Strategic Collaboration", desc: "Unlock new collaboration opportunities to accelerate your research and expand capabilities." },
];

const RegisterLaboratoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroLabImage} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/60" />
          </div>
          <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20 lg:py-32">
            <div className="max-w-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm mb-6">
                <FlaskConical className="w-8 h-8 text-emerald-glow" />
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Register as a <span className="text-emerald-glow">Laboratory</span>
              </h1>
              <p className="text-white/80 text-lg lg:text-xl font-body leading-relaxed max-w-xl">
                Connect with our global network of expert advisors to accelerate your research, 
                gain strategic insights, and unlock new collaboration opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Advantages Grid */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <p className="text-primary font-body text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              Why Register
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-16 text-center">
              Advantages for Laboratories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((a) => (
                <div key={a.title} className="bg-card border border-divider rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                    <a.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-card-foreground mb-2">{a.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Invitation CTA */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={aiMolecularImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-navy/85" />
          </div>
          <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-glow/20 backdrop-blur-sm mb-6">
              <ShieldCheck className="w-8 h-8 text-emerald-glow" />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
              Invitation-Only Registration
            </h2>
            <p className="text-white/70 font-body text-lg leading-relaxed mb-6">
              Laboratories can register on our platform to connect with top-tier advisors 
              across molecular biology, AI diagnostics, GMP manufacturing, regulatory strategy, 
              and more. Our invitation-only model ensures that every connection is meaningful and verified.
            </p>
            <p className="text-white/70 font-body text-lg leading-relaxed mb-10">
              If your laboratory is looking to partner with experienced advisors and expand your 
              scientific capabilities, please contact us. Our team will evaluate your profile 
              and provide you with a registration invitation.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="gap-2 text-base px-8 py-4">
                <Mail className="w-5 h-5" />
                Contact Us for Registration
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterLaboratoryPage;
