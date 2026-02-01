import { useEffect, useRef, useState } from "react";
const stats = [{
  value: "80%",
  label: "unsure about career direction"
}, {
  value: "70%+",
  label: "fear making wrong life decisions"
}, {
  value: "200+",
  label: "advice pieces consumed daily, yet unclear"
}, {
  value: "90%",
  label: "never received personalised guidance"
}];
const SolvRealityCheck = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center space-y-6 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold text-primary font-sans">
            The Truth About Young Adults Today
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Comparison pressure, emotional confusion, and decision fatigue define modern life. Most people are capable, ambitious, and self-driven — yet struggle with clarity and direction.
          </p>
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((stat, index) => <div key={stat.label} className="text-center space-y-2" style={{
          transitionDelay: `${0.3 + index * 0.1}s`
        }}>
              <div className="font-serif text-3xl md:text-4xl font-semibold text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>)}
        </div>

        <div className={`text-center space-y-6 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-medium text-lg">
            The problem isn't you. The problem is lack of awareness.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Today's generation has unlimited information but very little personalised guidance. SOLV gives you a way to pause, understand yourself deeply, and grow with structure instead of noise.
          </p>
        </div>
      </div>
    </section>;
};
export default SolvRealityCheck;