import Navbar from "@/components/Navbar";
import SolvHeroSection from "@/components/solv/SolvHeroSection";
import SolvImpactStats from "@/components/solv/SolvImpactStats";
import SolvWhoThisIsFor from "@/components/solv/SolvWhoThisIsFor";
import SolvRealityCheck from "@/components/solv/SolvRealityCheck";
import JourneySection from "@/components/JourneySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SolvHowItWorks from "@/components/solv/SolvHowItWorks";
import SolvIntroSession from "@/components/solv/SolvIntroSession";
import SolvProductsEcosystem from "@/components/solv/SolvProductsEcosystem";
import SolvBackedByPsychology from "@/components/solv/SolvBackedByPsychology";
import SolvCommunity from "@/components/solv/SolvCommunity";
import SolvPrivacySecurity from "@/components/solv/SolvPrivacySecurity";
import SolvConversionOffer from "@/components/solv/SolvConversionOffer";
import Footer from "@/components/Footer";

const ForIndividuals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <div className="pt-0">
          <SolvHeroSection />
        </div>
        <SolvImpactStats />
        <SolvWhoThisIsFor />
        <SolvRealityCheck />
        <JourneySection />
        <HowItWorksSection />
        <div id="how-it-works">
          <SolvHowItWorks />
        </div>
        <SolvIntroSession />
        <div id="products">
          <SolvProductsEcosystem />
        </div>
        <SolvBackedByPsychology />
        <SolvCommunity />
        <SolvPrivacySecurity />
        <SolvConversionOffer />
      </main>
      <Footer />
    </div>
  );
};

export default ForIndividuals;
