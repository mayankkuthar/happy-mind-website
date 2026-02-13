import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import brand logos
import AxisLogo from "@/assets/brand_logo/AXISmaxlife.png";
import BPTPLogo from "@/assets/brand_logo/BPTP.png";
import BigFMLogo from "@/assets/brand_logo/BigFM.jpg";
import CityFloLogo from "@/assets/brand_logo/CITY FLO.png";
import CentralParkLogo from "@/assets/brand_logo/CentralPark.jpg";
import ChintelsLogo from "@/assets/brand_logo/Chintels.jpg";
import EkartLogo from "@/assets/brand_logo/EKART.jpeg";
import FlipkartLogo from "@/assets/brand_logo/Flipkart.jpeg";
import GoogleLogo from "@/assets/brand_logo/Google.webp";
import MMMLogo from "@/assets/brand_logo/M3M.png";
import NuvocoLogo from "@/assets/brand_logo/Nuvoco.jpeg";
import SignatureGlobalLogo from "@/assets/brand_logo/SignatureGlobal.webp";

const logos = [
  { id: 1, size: "w-16 h-16", position: "left-[3%] top-[8%]", delay: "0s", logo: FlipkartLogo },
  { id: 2, size: "w-20 h-20", position: "left-[8%] top-[45%]", delay: "0.4s", logo: "" }, // Honda not available
  { id: 3, size: "w-14 h-14", position: "left-[2%] top-[75%]", delay: "0.8s", logo: "" }, // IKEA not available
  { id: 4, size: "w-16 h-16", position: "left-[18%] top-[15%]", delay: "0.2s", logo: "" }, // WeWork not available
  { id: 5, size: "w-16 h-16", position: "left-[15%] top-[70%]", delay: "0.6s", logo: "" }, // Sun Life not available
  { id: 6, size: "w-14 h-14", position: "left-[22%] top-[40%]", delay: "1s", logo: "" }, // EMAAR not available
  { id: 7, size: "w-16 h-16", position: "left-[6%] top-[25%]", delay: "0.3s", logo: "" }, // Crestron not available
  { id: 8, size: "w-16 h-16", position: "left-[25%] top-[85%]", delay: "0.7s", logo: "" }, // Netcore not available
  { id: 9, size: "w-20 h-20", position: "right-[25%] top-[85%]", delay: "0.15s", logo: "" }, // G-Cube not available
  { id: 10, size: "w-14 h-14", position: "right-[22%] top-[40%]", delay: "0.55s", logo: "" }, // Aakash not available
  { id: 11, size: "w-16 h-16", position: "right-[18%] top-[15%]", delay: "0.95s", logo: AxisLogo },
  { id: 12, size: "w-16 h-16", position: "right-[15%] top-[70%]", delay: "0.25s", logo: BigFMLogo },
  { id: 13, size: "w-14 h-14", position: "right-[8%] top-[45%]", delay: "0.65s", logo: "" }, // Nova not available
  { id: 14, size: "w-20 h-20", position: "right-[3%] top-[8%]", delay: "0.85s", logo: CityFloLogo },
  { id: 15, size: "w-16 h-16", position: "right-[2%] top-[75%]", delay: "0.45s", logo: "" }, // IFFCO not available
  { id: 16, size: "w-16 h-16", position: "left-[10%] top-[35%]", delay: "0.5s", logo: BPTPLogo },
  { id: 17, size: "w-16 h-16", position: "right-[10%] top-[35%]", delay: "0.75s", logo: CentralParkLogo },
  { id: 18, size: "w-16 h-16", position: "left-[20%] top-[55%]", delay: "0.9s", logo: ChintelsLogo },
  { id: 19, size: "w-16 h-16", position: "right-[20%] top-[55%]", delay: "0.35s", logo: EkartLogo },
  { id: 20, size: "w-16 h-16", position: "left-[5%] top-[55%]", delay: "1.1s", logo: GoogleLogo },
  { id: 21, size: "w-16 h-16", position: "right-[5%] top-[55%]", delay: "0.25s", logo: MMMLogo },
  { id: 22, size: "w-16 h-16", position: "left-[25%] top-[25%]", delay: "0.6s", logo: NuvocoLogo },
  { id: 23, size: "w-16 h-16", position: "right-[25%] top-[25%]", delay: "0.4s", logo: SignatureGlobalLogo },
];

const TrustedBySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-16 bg-background overflow-hidden min-h-[60vh] sm:min-h-[80vh] flex items-center"
    >
      {/* Floating Logo Circles - positioned relative to section */}
      {logos.map((logoData) => (
        <div
          key={logoData.id}
          className={`absolute ${logoData.position} ${logoData.size} rounded-full bg-background border border-border/40 shadow-sm flex items-center justify-center transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ 
            transitionDelay: logoData.delay,
            animation: isVisible ? `gentleFloat 6s ease-in-out infinite ${logoData.delay}` : 'none'
          }}
        >
          {logoData.logo ? (
            <img 
              src={logoData.logo} 
              alt={`Client logo ${logoData.id}`}
              className="w-3/4 h-3/4 object-contain p-1"
            />
          ) : (
            <span 
              className="text-[8px] font-bold text-center leading-tight px-1.5 truncate"
              style={{ color: '#666' }}
            >
              Logo
            </span>
          )}
        </div>
      ))}

      <div 
        className={`container mx-auto max-w-4xl transition-all duration-1000 ease-out ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-16"
        }`}
      >
        {/* Center Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Label - H1 */}
          <p 
            className={`text-primary font-medium tracking-widest uppercase text-sm transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            TRUSTED BY
          </p>

          {/* Main Heading - H2 */}
          <h2 
            className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            Our Corporate Clients
          </h2>

          {/* Subheading - H3 */}
          <p 
            className={`text-muted-foreground text-base sm:text-lg md:text-xl transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.7s" }}
          >
            From various industries
          </p>

          {/* CTA Button */}
          <div 
            className={`pt-4 transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0.9s" }}
          >
            <Button 
              className="rounded-full px-8 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              know more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
