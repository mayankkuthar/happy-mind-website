import { useEffect, useRef, useState } from "react";

const frameworks = [
  { name: "Personality Science", orbit: 1, angle: 0 },
  { name: "Emotional Intelligence Mapping", orbit: 2, angle: 36 },
  { name: "Cognitive Behaviour Therapy", orbit: 1, angle: 72 },
  { name: "Cognitive Pattern Analysis", orbit: 2, angle: 108 },
  { name: "Behaviour Therapy", orbit: 1, angle: 144 },
  { name: "Solution-Focused Brief Therapy", orbit: 2, angle: 180 },
  { name: "Single Session Therapy", orbit: 1, angle: 216 },
  { name: "Cognitive Overload Reduction", orbit: 2, angle: 252 },
  { name: "Motivational Interviewing", orbit: 1, angle: 288 },
  { name: "Evidence-Based Coaching", orbit: 2, angle: 324 },
];

const SolvBackedByPsychology = () => {
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
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-card overflow-hidden">
      <div className="container mx-auto max-w-6xl px-0">
        {/* Header */}
        <div
          className={`text-center space-y-4 mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground">
            Built on psychological science
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            5+ years of behavioural and emotional intelligence research, validated through lakhs of real user journeys on the HappiMynd platform.
          </p>
        </div>

        {/* Solar System Container */}
        <div
          className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center transition-all duration-1000 overflow-hidden ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Orbital Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ring 1 - tilted */}
            <div 
              className="absolute w-[200px] sm:w-[280px] md:w-[380px] h-[200px] sm:h-[280px] md:h-[380px] rounded-full border border-foreground/10"
              style={{ transform: "rotate(70deg)" }}
            />
            {/* Ring 2 - tilted opposite */}
            <div 
              className="absolute w-[240px] sm:w-[320px] md:w-[440px] h-[240px] sm:h-[320px] md:h-[440px] rounded-full border border-foreground/8"
              style={{ transform: "rotate(-75deg)" }}
            />
            {/* Ring 3 - subtle */}
            <div 
              className="absolute w-[280px] sm:w-[360px] md:w-[500px] h-[280px] sm:h-[360px] md:h-[500px] rounded-full border border-foreground/5"
              style={{ transform: "rotate(68deg)" }}
            />
          </div>

          {/* Central Globe */}
          <div 
            className="absolute z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/40 via-primary/60 to-primary/30 flex items-center justify-center shadow-lg"
            style={{ 
              animation: "spin-slow 60s linear infinite",
              boxShadow: "0 0 40px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.2)"
            }}
          >
            <div className="text-center px-2 sm:px-3">
              <span className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary-foreground leading-tight block">
                Psychological
              </span>
              <span className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary-foreground leading-tight block">
                Science
              </span>
            </div>
          </div>

          {/* Orbiting Planets Container */}
          <div 
            className="absolute w-[300px] sm:w-[400px] md:w-[520px] h-[300px] sm:h-[400px] md:h-[520px]"
            style={{ animation: "orbit 80s linear infinite" }}
          >
            {frameworks.map((framework, index) => {
              const orbitRadius = framework.orbit === 1 ? 100 : 140;
              const angleRad = (framework.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * orbitRadius;
              const y = Math.sin(angleRad) * orbitRadius;
              
              // Determine size and depth based on position
              const isBack = framework.angle > 90 && framework.angle < 270;
              const scale = isBack ? 0.85 : 1;
              const opacity = isBack ? 0.7 : 1;
              const zIndex = isBack ? 10 : 30;

              return (
                <div
                  key={framework.name}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
                  }}
                >
                  <div
                    className={`
                      w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center p-1 sm:p-2 text-center
                      ${index % 3 === 0 
                        ? "bg-gradient-to-br from-primary/20 to-primary/30" 
                        : index % 3 === 1 
                          ? "bg-gradient-to-br from-muted/60 to-muted/80" 
                          : "bg-gradient-to-br from-primary/15 to-muted/50"
                      }
                    `}
                    style={{
                      boxShadow: isBack 
                        ? "0 4px 15px hsl(var(--primary) / 0.1)" 
                        : "0 8px 25px hsl(var(--primary) / 0.2)",
                      animation: `counter-orbit 80s linear infinite`,
                    }}
                  >
                    <span className="text-[6px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-wide text-foreground/80 leading-tight">
                      {framework.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes counter-orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default SolvBackedByPsychology;
