import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
const SolvHeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true
  });

  // 5 placeholder slides
  const slides = [{
    id: 1,
    placeholder: "Image 1"
  }, {
    id: 2,
    placeholder: "Image 2"
  }, {
    id: 3,
    placeholder: "Image 3"
  }, {
    id: 4,
    placeholder: "Image 4"
  }, {
    id: 5,
    placeholder: "Image 5"
  }];
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const autoSlide = setInterval(() => {
      emblaApi.scrollNext();
    }, 2000);
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      clearInterval(autoSlide);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);
  return <section className="h-[calc(100vh-80px)] w-full overflow-hidden">
      <div className="h-full w-full grid lg:grid-cols-2 relative">
        {/* Left Content */}
        <div className="relative z-20 flex items-center px-6 lg:px-16 py-12 lg:py-0">
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-semibold text-foreground leading-tight font-sans md:text-3xl">
                A <span className="text-primary text-3xl">Conscious Growth Space</span> For Life's Real Decisions.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed font-serif font-semibold text-left md:text-2xl">
                SOLV helps you understand yourself better, make clearer choices, and move forward with confidence through psychology-powered, human-led guidance.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Learn More
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                My Personality Snapshot
              </Button>
              <Button size="lg" className="rounded-full px-8">
                Book My SOLV Session
              </Button>
            </div>
          </div>
        </div>

        {/* Right Carousel - Full Height */}
        <div className="absolute inset-0 lg:relative lg:inset-auto h-full">
          {/* Gradient overlay for text readability - only on left portion */}
          <div className="absolute inset-0 z-10 pointer-events-none lg:hidden" style={{
          background: "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 30%, hsl(var(--background) / 0.7) 50%, transparent 70%)"
        }} />
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{
          background: "linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 40%, transparent 100%)"
        }} />

          {/* Embla Carousel */}
          <div className="h-full w-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {slides.map(slide => <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-full relative">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/40 to-primary/10 flex items-center justify-center">
                    <span className="text-muted-foreground font-medium text-2xl">
                      {slide.placeholder}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>


          {/* Dot Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, index) => <button key={index} onClick={() => scrollTo(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${index === selectedIndex ? "bg-primary scale-110" : "border-2 border-foreground/50 bg-transparent hover:border-foreground"}`} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default SolvHeroSection;