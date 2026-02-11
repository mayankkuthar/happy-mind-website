import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolvHeroSection from "@/components/solv/SolvHeroSection";
import SolvImpactStats from "@/components/solv/SolvImpactStats";
import SolvRealityCheck from "@/components/solv/SolvRealityCheck";
import SolvBridgeStatement from "@/components/solv/SolvBridgeStatement";
import SolvHowItWorks from "@/components/solv/SolvHowItWorks";
import SolvIntroSession from "@/components/solv/SolvIntroSession";
import SolvConversionOffer from "@/components/solv/SolvConversionOffer";
import SolvPrivacySecurity from "@/components/solv/SolvPrivacySecurity";

const Solv = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* 1. Hero */}
        <div className="bg-background">
          <SolvHeroSection />
        </div>

        {/* 2. Impact Stats */}
        <div className="bg-muted/30">
          <SolvImpactStats />
        </div>

        {/* 3. Reality Check */}
        <div className="bg-background">
          <SolvRealityCheck />
        </div>

        {/* 4. Bridge Statement */}
        <div className="bg-muted/30">
          <SolvBridgeStatement />
        </div>

        {/* 5. How It Works */}
        <div className="bg-background">
          <SolvHowItWorks />
        </div>

        {/* 6. Intro Session Experience */}
        <div className="bg-muted/30">
          <SolvIntroSession />
        </div>

        {/* 7. Conversion Offer */}
        <div className="bg-background">
          <SolvConversionOffer />
        </div>

        {/* 8. Trust, Privacy & Security */}
        <div className="bg-muted/30">
          <SolvPrivacySecurity />
        </div>
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

export default Solv;
