import { Button } from "@/components/ui/button";

const pills = [
  "Built for Today's Generation",
  "Your Growth Companion",
  "People First. Phygital Space.",
];

const SolvHeroSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {pills.map((pill) => (
            <span
              key={pill}
              className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-primary font-medium text-lg mb-4">
          20 Minutes Can Change Your Life
        </p>

        {/* H1 */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
          Conscious Growth for Any Life Challenges
        </h1>

        {/* H2 */}
        <h2 className="font-serif text-xl md:text-2xl text-primary font-medium mb-6">
          Know Yourself with Science-Backed Accuracy
        </h2>

        {/* Copy */}
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Understand who you are, unlock your potential, and grow with clarity and purpose.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="rounded-full px-10">
            Begin Your Growth Session
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-10">
            Explore About SOLV
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolvHeroSection;
