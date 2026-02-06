import { Monitor, Brain, FlaskConical, BookOpen } from "lucide-react";

const approaches = [
  { icon: Monitor, label: "Technology-Backed" },
  { icon: FlaskConical, label: "Evidence-Based Tools" },
  { icon: Brain, label: "Positive Psychology" },
  { icon: BookOpen, label: "Research-Driven" },
];

const AboutApproachSection = () => {
  return (
    <section className="py-20 px-6 lg:px-16 bg-card">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Approach
        </h2>
        
        <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
          We are a phygital platform — a conscious growth system for individuals and People Intelligence System for organisations using technology-backed approach, evidence-based tools, positive psychology, and research.
        </p>

        {/* Approach Pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {approaches.map((approach, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-background px-6 py-3 rounded-full border border-border/50 shadow-sm"
            >
              <approach.icon className="w-5 h-5 text-primary" />
              <span className="font-sans text-foreground font-medium">
                {approach.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutApproachSection;
