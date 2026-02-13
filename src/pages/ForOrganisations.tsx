import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrgHeroSection from "@/components/org/OrgHeroSection";
import OrgScrollingBanner from "@/components/org/OrgScrollingBanner";
import OrgBusinessRealityStrip from "@/components/org/OrgBusinessRealityStrip";
import OrgStrategicGapWithHappiMynd from "@/components/org/OrgStrategicGapWithHappiMynd";
import OrgImpactSection from "@/components/org/OrgImpactSection";
import OrgHowWeWork from "@/components/org/OrgHowWeWork";
import OrgProofSection from "@/components/org/OrgProofSection";
import OrgClientReviews from "@/components/org/OrgClientReviews";
import OrgTrustConfidentiality from "@/components/org/OrgTrustConfidentiality";
import OrgScalability from "@/components/org/OrgScalability";
import OrgStrategicClosing from "@/components/org/OrgStrategicClosing";

const ForOrganisations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="bg-background">
          <OrgHeroSection />
        </div>
        <div className="bg-muted/30">
          <OrgScrollingBanner />
        </div>
        <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50">
          <OrgBusinessRealityStrip />
        </div>
        <div className="bg-background">
          <OrgStrategicGapWithHappiMynd />
        </div>
        <div className="bg-muted/30">
          <OrgImpactSection />
        </div>
        <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50">
          <OrgHowWeWork />
        </div>
        <div className="bg-background">
          <OrgProofSection />
        </div>
        <div className="bg-muted/30">
          <OrgClientReviews />
        </div>
        <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50">
          <OrgTrustConfidentiality />
        </div>
        <div className="bg-background">
          <OrgScalability />
        </div>
        <div className="bg-muted/30">
          <OrgStrategicClosing />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForOrganisations;
