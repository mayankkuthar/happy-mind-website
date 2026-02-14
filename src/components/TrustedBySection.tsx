import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Users } from "lucide-react";
import axisMaxLifeLogo from "@/assets/brand_logo/AXISmaxlife.png";
import bptpLogo from "@/assets/brand_logo/BPTP.png";
import bigFMLogo from "@/assets/brand_logo/BigFM.jpg";
import cityFloLogo from "@/assets/brand_logo/CITY FLO.png";
import centralParkLogo from "@/assets/brand_logo/CentralPark.jpg";
import chintelsLogo from "@/assets/brand_logo/Chintels.jpg";
import ekartLogo from "@/assets/brand_logo/EKART.jpeg";
import flipkartLogo from "@/assets/brand_logo/Flipkart.jpeg";
import googleLogo from "@/assets/brand_logo/Google.webp";
import m3mLogo from "@/assets/brand_logo/M3M.png";
import mmtcPampLogo from "@/assets/brand_logo/MMTC PAMP.jpg";
import nuvocoLogo from "@/assets/brand_logo/Nuvoco.jpeg";
import signatureGlobalLogo from "@/assets/brand_logo/SignatureGlobal.webp";

const partnerLogos = [
  { name: "Axis Max Life", category: "Finance", logo: axisMaxLifeLogo },
  { name: "BPTP", category: "Real Estate", logo: bptpLogo },
  { name: "Big FM", category: "Media", logo: bigFMLogo },
  { name: "City Flo", category: "Transport", logo: cityFloLogo },
  { name: "Central Park", category: "Real Estate", logo: centralParkLogo },
  { name: "Chintels", category: "Construction", logo: chintelsLogo },
  { name: "Ekart", category: "Logistics", logo: ekartLogo },
  { name: "Flipkart", category: "E-commerce", logo: flipkartLogo },
  { name: "Google", category: "Technology", logo: googleLogo },
  { name: "M3M", category: "Real Estate", logo: m3mLogo },
  { name: "MMTC PAMP", category: "Precious Metals", logo: mmtcPampLogo },
  { name: "Nuvoco", category: "Cement", logo: nuvocoLogo },
  { name: "Signature Global", category: "Real Estate", logo: signatureGlobalLogo }
];

const brandCategories = [
  {
    title: "Finance & Banking",
    brands: ["Axis Max Life"],
    description: "Leading financial services companies trusted by customers"
  },
  {
    title: "Real Estate & Construction",
    brands: ["BPTP", "Central Park", "M3M", "Signature Global", "Chintels"],
    description: "Premium real estate and construction companies with proven track records"
  },
  {
    title: "Technology & E-commerce",
    brands: ["Google", "Flipkart", "Ekart"],
    description: "Innovative technology and e-commerce platforms transforming industries"
  }
];

const TrustedBySection = () => {
  return (
    <section id="partners-brands" className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">TRUSTED BY</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-foreground mb-2">Our Corporate Clients</h3>
          <p className="text-xl md:text-2xl text-muted-foreground">From various industries</p>
        </div>


        {/* Partner Logos Grid */}
        <div className="bg-gradient-subtle rounded-2xl p-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {partnerLogos.map((partner, index) => (
              <div 
                key={index} 
                className="bg-background rounded-lg p-4 shadow-soft hover:shadow-card transition-smooth group cursor-pointer hover-lift"
              >
                <div className="text-center">
                  <div className="h-16 w-full bg-white rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-smooth border border-gray-200">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-h-12 max-w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default TrustedBySection;