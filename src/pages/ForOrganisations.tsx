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
        <OrgHeroSection />
        <OrgScrollingBanner />
        <OrgBusinessRealityStrip />
        <OrgStrategicGapWithHappiMynd />
        <OrgImpactSection />
        <OrgHowWeWork />
        <OrgProofSection />
        <OrgClientReviews />
        <OrgTrustConfidentiality />
        <OrgScalability />
        <OrgStrategicClosing />
      </main>
      <Footer />
    </div>
  );
};

export default ForOrganisations;
