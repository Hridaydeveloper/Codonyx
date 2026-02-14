import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { CoreCapabilitiesSection } from "@/components/home/CoreCapabilitiesSection";
import { TinyGiantsSection } from "@/components/home/TinyGiantsSection";
import { AIIntegrationSection } from "@/components/home/AIIntegrationSection";
import { IndustryTrustSection } from "@/components/home/IndustryTrustSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <CoreCapabilitiesSection />
        <TinyGiantsSection />
        <AIIntegrationSection />
        <IndustryTrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
