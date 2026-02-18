import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical, Mail, ShieldCheck } from "lucide-react";

const RegisterLaboratoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
              <FlaskConical className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Register as a Laboratory
            </h1>
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
              Connect with our global network of expert advisors to accelerate your research, 
              gain strategic insights, and unlock new collaboration opportunities.
            </p>

            <div className="bg-card border border-divider rounded-xl p-8 mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl font-semibold text-card-foreground">
                  Invitation-Only Registration
                </h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Laboratories can register on our platform to connect with top-tier advisors 
                across molecular biology, AI diagnostics, GMP manufacturing, regulatory strategy, 
                and more. Our invitation-only model ensures that every connection is meaningful and verified.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                If your laboratory is looking to partner with experienced advisors and expand your 
                scientific capabilities, please contact us. Our team will evaluate your profile 
                and provide you with a registration invitation.
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

export default RegisterLaboratoryPage;
