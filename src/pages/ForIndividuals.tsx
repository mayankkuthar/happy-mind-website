import Navbar from "@/components/Navbar";
import SolvHeroSection from "@/components/individual/SolvHeroSection";
import SolvImpactStats from "@/components/individual/SolvImpactStats";
import SolvWhoThisIsFor from "@/components/individual/SolvWhoThisIsFor";
import SolvRealityCheck from "@/components/individual/SolvRealityCheck";
import JourneySection from "@/components/individual/JourneySection";
import SolvBackedByPsychology from "@/components/individual/SolvBackedByPsychology";
import SolvCommunity from "@/components/individual/SolvCommunity";
import SolvPrivacySecurity from "@/components/individual/SolvPrivacySecurity";
import Footer from "@/components/Footer";

const ForIndividuals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="bg-background">
          <SolvHeroSection />
        </div>
        <div className="bg-muted/30">
          <SolvImpactStats />
        </div>
        <div className="bg-background">
          <SolvWhoThisIsFor />
        </div>
        <div className="bg-muted/30">
          <SolvRealityCheck />
        </div>
        <div className="bg-background">
          <JourneySection />
        </div>
        <div className="bg-muted/30">
          <SolvBackedByPsychology />
        </div>
        <div className="bg-background">
          <SolvCommunity />
        </div>
        <div className="bg-muted/30">
          <SolvPrivacySecurity />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForIndividuals;
