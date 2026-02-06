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
        <AboutHeroSection />
        <AboutGapSection />
        <AboutMissionVisionSection />
        <AboutApproachSection />
        <AboutMilestonesSection />
        <AboutTeamSection />
        <FinalInvitationSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
