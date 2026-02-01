import { useEffect, useRef, useState } from "react";

import personalHabitsImg from "@/assets/solv-personal-habits.png";
import emotionalPatternsImg from "@/assets/solv-emotional-patterns.png";
import lifeDirectionImg from "@/assets/solv-life-direction.png";
import relationshipImg from "@/assets/solv-relationship.png";
import selfUnderstandingImg from "@/assets/solv-self-understanding.png";
import careerChoicesImg from "@/assets/solv-career-choices.png";
import moneyIndependenceImg from "@/assets/solv-money-independence.png";

const categories = [
  { title: "PERSONAL HABITS", image: personalHabitsImg },
  { title: "EMOTIONAL PATTERNS", image: emotionalPatternsImg },
  { title: "LIFE DIRECTION", image: lifeDirectionImg },
  { title: "MONEY & INDEPENDENCE", image: moneyIndependenceImg },
  { title: "RELATIONSHIP", image: relationshipImg },
  { title: "SELF UNDERSTANDING", image: selfUnderstandingImg },
  { title: "CAREER CHOICES", image: careerChoicesImg }
];

const SolvWhoThisIsFor = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous rotation animation
  useEffect(() => {
    if (!isVisible) return;
    
    const speed = 0.08; // Slow, premium speed
    
    const animate = () => {
      if (!isPaused) {
        setRotation(prev => (prev + speed) % 360);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, isPaused]);

  // Calculate card position on the curved arc
  const getCardStyle = (index: number) => {
    const totalCards = categories.length;
    const anglePerCard = 360 / totalCards;
    const cardAngle = (index * anglePerCard + rotation) % 360;
    
    // Convert to radians for calculations
    const radians = (cardAngle * Math.PI) / 180;
    
    // Arc parameters - creates a gentle curved path
    const radiusX = 420; // Horizontal spread
    const radiusY = 60; // Vertical depth of curve
    
    // Calculate position on elliptical arc
    const x = Math.sin(radians) * radiusX;
    const z = Math.cos(radians) * radiusY;
    
    // Scale based on z-position (front = larger, back = smaller)
    const normalizedZ = (z + radiusY) / (radiusY * 2); // 0 to 1
    const scale = 0.65 + normalizedZ * 0.45; // 0.65 to 1.1
    
    // Opacity based on position (front = visible, back = faded)
    const opacity = 0.4 + normalizedZ * 0.6; // 0.4 to 1
    
    // Z-index based on depth
    const zIndex = Math.round(normalizedZ * 10);
    
    // Vertical offset to create arc effect
    const y = -Math.abs(Math.cos(radians)) * 25;
    
    return {
      transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: isPaused ? 'all 0.3s ease-out' : 'none'
    };
  };

  return (
    <section ref={sectionRef} className="py-16 px-6 lg:px-16 overflow-hidden flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        {/* Header */}
        <div className={`text-center space-y-3 mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold font-sans text-primary">
            If You're Figuring Life Out, This Is For You.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-serif font-medium text-2xl">
            SOLV supports the moments that shape your direction, not just the ones that feel difficult.
          </p>
        </div>

        {/* Curved Carousel */}
        <div 
          className={`relative h-[400px] w-full flex items-center justify-center transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {/* Center point for the carousel */}
          <div className="relative">
            {categories.map((category, index) => {
              const style = getCardStyle(index);
              
              return (
                <div
                  key={category.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[180px] h-[260px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  style={style}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Image */}
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xs text-center leading-tight uppercase tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolvWhoThisIsFor;
