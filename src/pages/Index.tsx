import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DistinctionSection from "@/components/DistinctionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AgentInActionSection from "@/components/AgentInActionSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import TwoSidesSection from "@/components/TwoSidesSection";
import BuilderCollectiveSection from "@/components/BuilderCollectiveSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <DistinctionSection />
      <HowItWorksSection />
      <AgentInActionSection />
      <MarketplaceSection />
      <TwoSidesSection />
      <BuilderCollectiveSection />
      <GetInvolvedSection />
      <Footer />
    </div>
  );
};

export default Index;
