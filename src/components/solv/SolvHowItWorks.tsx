import { useEffect, useRef, useState } from "react";
import { FileText, Calendar, Compass } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Fill a 2-minute form",
    description: "Free",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Schedule your 20-minute intro call",
    description: "At your convenience",
  },
  {
    icon: Compass,
    number: "03",
    title: "Get personalised direction",
    description: "Clarity awaits",
  },
];

const SolvHowItWorks = () => {
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
    <section ref={sectionRef} className="py-24 px-6 lg:px-16">
      <div className="container mx-auto max-w-5xl">
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            How it works
          </h2>
          <p className="text-primary font-medium">A simple three-step process</p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No complex onboarding. No long forms. Just clarity in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative text-center space-y-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              <div className="w-20 h-20 mx-auto rounded-full bg-accent flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <span className="text-primary/60 font-mono text-sm">{step.number}</span>
                <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolvHowItWorks;
