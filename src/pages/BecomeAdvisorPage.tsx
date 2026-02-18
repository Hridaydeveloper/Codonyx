import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCheck, Mail, ShieldCheck } from "lucide-react";

const BecomeAdvisorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
              <UserCheck className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Become an Advisor
            </h1>
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
              Join our exclusive network of world-class advisors shaping the future of molecular science, AI-driven healthcare, and sustainable innovation.
            </p>

            <div className="bg-card border border-divider rounded-xl p-8 mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl font-semibold text-card-foreground">
                  Invitation-Only Registration
                </h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                We maintain the highest standards by operating on an invitation-only basis. 
                To ensure quality and trust within our advisor network, registration is exclusively 
                available through a personal invitation from the Codonyx team.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                If you are a seasoned professional in life sciences, biotechnology, pharmaceutical development, 
                or AI-driven healthcare and wish to contribute as an advisor, please reach out to us. 
                Our team will review your profile and provide you with a registration link.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us for Registration
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeAdvisorPage;
