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
        <SolvHeroSection />

        {/* 2. Impact Stats */}
        <SolvImpactStats />

        {/* 3. Reality Check */}
        <SolvRealityCheck />

        {/* 4. Bridge Statement */}
        <SolvBridgeStatement />

        {/* 5. How It Works */}
        <SolvHowItWorks />

        {/* 6. Intro Session Experience */}
        <SolvIntroSession />

        {/* 7. Conversion Offer */}
        <SolvConversionOffer />

        {/* 8. Trust, Privacy & Security */}
        <SolvPrivacySecurity />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

export default Solv;
