import { useEffect, useRef, useState } from "react";
const stats = [{
  value: "50,000+",
  label: "Individuals Supported"
}, {
  value: "200+",
  label: "Organisations Partnered"
}, {
  value: "92%",
  label: "Adoption Rate"
}, {
  value: "4.8/5",
  label: "Satisfaction Score"
}];
const ImpactStatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="py-24 md:py-32 px-6 lg:px-16 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary tracking-widest uppercase mb-12 font-medium text-4xl">
            Impact
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => <div key={stat.label} className={`space-y-3 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{
            transitionDelay: `${0.2 + index * 0.15}s`
          }}>
                <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default ImpactStatsSection;