import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrgHeroSection from "@/components/org/OrgHeroSection";
import OrgBusinessRealityStrip from "@/components/org/OrgBusinessRealityStrip";
import OrgBusinessCase from "@/components/org/OrgBusinessCase";
import OrgStrategicGap from "@/components/org/OrgStrategicGap";
import OrgPlatformPhilosophy from "@/components/org/OrgPlatformPhilosophy";
import OrgCorporatePlatform from "@/components/org/OrgCorporatePlatform";
import OrgTrustConfidentiality from "@/components/org/OrgTrustConfidentiality";
import OrgUseCases from "@/components/org/OrgUseCases";
import OrgScalability from "@/components/org/OrgScalability";
import OrgTrustedByLeaders from "@/components/org/OrgTrustedByLeaders";
import OrgStrategicClosing from "@/components/org/OrgStrategicClosing";

const ForOrganisations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <OrgHeroSection />
        <OrgBusinessRealityStrip />
        <OrgBusinessCase />
        <OrgStrategicGap />
        <OrgPlatformPhilosophy />
        <OrgCorporatePlatform />
        <OrgTrustConfidentiality />
        <OrgUseCases />
        <OrgScalability />
        <OrgTrustedByLeaders />
        <OrgStrategicClosing />
      </main>
      <Footer />
    </div>
  );
};

export default ForOrganisations;
