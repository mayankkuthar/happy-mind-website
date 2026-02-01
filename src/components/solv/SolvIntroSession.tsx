import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const explorations = [
  "Your growth stage",
  "Priority area",
  "Personality influence",
  "Patterns affecting outcomes",
  "Next-level direction",
];

const SolvIntroSession = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div
          className={`text-center space-y-6 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            What happens in your 20-minute intro session
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Your growth coach helps you understand where you truly stand and what direction can unlock your next level. No pressure. No commitments.
          </p>
        </div>

        <div
          className={`bg-background rounded-3xl p-8 md:p-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-foreground font-medium mb-6">You'll explore:</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {explorations.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3"
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button size="lg" className="rounded-full px-10">
              Book your free intro session
            </Button>
            <p className="text-muted-foreground text-sm">
              Continue with weekly 20-minute check-ins if you choose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolvIntroSession;
