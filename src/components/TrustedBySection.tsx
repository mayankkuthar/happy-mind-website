import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const logoPlaceholders = [
  { id: 1, size: "w-16 h-16", position: "left-[3%] top-[8%]", delay: "0s", brand: "Flipkart", color: "#2874F0" },
  { id: 2, size: "w-20 h-20", position: "left-[8%] top-[45%]", delay: "0.4s", brand: "Honda", color: "#CC0000" },
  { id: 3, size: "w-14 h-14", position: "left-[2%] top-[75%]", delay: "0.8s", brand: "IKEA", color: "#0058A3" },
  { id: 4, size: "w-16 h-16", position: "left-[18%] top-[15%]", delay: "0.2s", brand: "WeWork", color: "#000000" },
  { id: 5, size: "w-16 h-16", position: "left-[15%] top-[70%]", delay: "0.6s", brand: "Sun Life", color: "#FFB81C" },
  { id: 6, size: "w-14 h-14", position: "left-[22%] top-[40%]", delay: "1s", brand: "EMAAR", color: "#1B4F72" },
  { id: 7, size: "w-16 h-16", position: "left-[6%] top-[25%]", delay: "0.3s", brand: "Crestron", color: "#000000" },
  { id: 8, size: "w-16 h-16", position: "left-[25%] top-[85%]", delay: "0.7s", brand: "Netcore", color: "#E91E63" },
  { id: 9, size: "w-20 h-20", position: "right-[25%] top-[85%]", delay: "0.15s", brand: "G-Cube", color: "#2E7D32" },
  { id: 10, size: "w-14 h-14", position: "right-[22%] top-[40%]", delay: "0.55s", brand: "Aakash", color: "#FF6B00" },
  { id: 11, size: "w-16 h-16", position: "right-[18%] top-[15%]", delay: "0.95s", brand: "Axis", color: "#97144D" },
  { id: 12, size: "w-16 h-16", position: "right-[15%] top-[70%]", delay: "0.25s", brand: "BIG FM", color: "#E31937" },
  { id: 13, size: "w-14 h-14", position: "right-[8%] top-[45%]", delay: "0.65s", brand: "Nova", color: "#6366F1" },
  { id: 14, size: "w-20 h-20", position: "right-[3%] top-[8%]", delay: "0.85s", brand: "Cityflo", color: "#00BFA5" },
  { id: 15, size: "w-16 h-16", position: "right-[2%] top-[75%]", delay: "0.45s", brand: "IFFCO", color: "#1E8449" },
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
      className="relative py-24 md:py-32 px-6 lg:px-16 bg-background overflow-hidden min-h-[80vh] flex items-center"
    >
      {/* Floating Logo Circles - positioned relative to section */}
      {logoPlaceholders.map((logo) => (
        <div
          key={logo.id}
          className={`absolute ${logo.position} ${logo.size} rounded-full bg-background border border-border/40 shadow-sm flex items-center justify-center transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
          style={{ 
            transitionDelay: logo.delay,
            animation: isVisible ? `gentleFloat 6s ease-in-out infinite ${logo.delay}` : 'none'
          }}
        >
          <span 
            className="text-[8px] font-bold text-center leading-tight px-1.5 truncate"
            style={{ color: logo.color }}
          >
            {logo.brand}
          </span>
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
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground transition-all duration-700 ease-out ${
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
            className={`text-muted-foreground text-lg md:text-xl transition-all duration-700 ease-out ${
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
