import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import individualHero from "@/assets/individual-hero.png";
import organizationHero from "@/assets/organization-hero.png";
const WhoIsThisForSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Re-trigger animation every time section enters viewport
      if (entry.isIntersecting) {
        setIsVisible(false);
        // Small delay to reset animation state
        setTimeout(() => setIsVisible(true), 50);
      } else {
        setIsVisible(false);
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section className="py-24 px-6 lg:px-16" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl text-primary text-center font-sans font-semibold md:text-4xl">
            Who Is This For?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Individuals Card */}
          <Link to="/for-individuals" className={`group relative bg-card rounded-3xl p-8 lg:p-10 border border-border/50 overflow-hidden block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.15)]' : 'opacity-0 translate-y-8 shadow-none'} hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.25)]`} style={{
          transitionDelay: '0ms'
        }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              {/* Polaroid-style image */}
              <div className="mx-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={individualHero} alt="Individual growth" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-serif text-2xl font-semibold text-foreground">For Individuals</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-5 flex-grow">
                ​If your mind feels busy, emotions feel unclear, or stress feels constant even when life looks fine, HappiMynd is here for you.
              </p>
              <button className="mt-4 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors self-start">
                Explore
              </button>
            </div>
          </Link>

          {/* Organisations Card */}
          <Link to="/for-organisations" className={`group relative bg-card rounded-3xl p-8 lg:p-10 border border-border/50 overflow-hidden block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.15)]' : 'opacity-0 translate-y-8 shadow-none'} hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.25)]`} style={{
          transitionDelay: '150ms'
        }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              {/* Polaroid-style image */}
              <div className="mx-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={organizationHero} alt="Organisation teams" className="w-full h-full border-0 shadow-md object-cover" />
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-serif text-2xl font-semibold text-foreground">For Organisations</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-5 flex-grow">
                Support emotionally healthier teams. Reduce burnout. Improve focus, engagement, and sustainability at work.
              </p>
              <button className="mt-4 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors self-start">
                Explore
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>;
};
export default WhoIsThisForSection;