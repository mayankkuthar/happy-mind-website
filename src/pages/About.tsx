import Navbar from "@/components/Navbar";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutGapSection from "@/components/about/AboutGapSection";
import AboutMissionVisionSection from "@/components/about/AboutMissionVisionSection";
import AboutApproachSection from "@/components/about/AboutApproachSection";
import AboutMilestonesSection from "@/components/about/AboutMilestonesSection";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import FinalInvitationSection from "@/components/FinalInvitationSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <div className="bg-background">
          <AboutHeroSection />
        </div>
        <div className="bg-muted/30">
          <AboutGapSection />
        </div>
        <div className="bg-background">
          <AboutMissionVisionSection />
        </div>
        <div className="bg-muted/30">
          <AboutApproachSection />
        </div>
        <div className="bg-background">
          <AboutMilestonesSection />
        </div>
        <div className="bg-muted/30">
          <AboutTeamSection />
        </div>
        <div className="bg-background">
          <FinalInvitationSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
