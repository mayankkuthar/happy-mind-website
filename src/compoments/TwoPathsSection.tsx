import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TwoPathsSection = () => {
  return (
    <section className="py-24 px-6 lg:px-16">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm">Two Clear Paths</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Choose your journey.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Individuals Path */}
          <div className="group bg-gradient-to-br from-primary/10 to-accent rounded-3xl p-8 lg:p-10 text-center space-y-6 hover:shadow-lg transition-all duration-500">
            <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Explore SOLV</h3>
            <p className="text-muted-foreground">Start your conscious growth journey.</p>
            <Button 
              variant="default" 
              size="lg" 
              className="rounded-full px-8 group-hover:shadow-lg transition-all duration-300"
            >
              Start for Myself
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Organisations Path */}
          <div className="group bg-gradient-to-br from-secondary/10 to-muted rounded-3xl p-8 lg:p-10 text-center space-y-6 hover:shadow-lg transition-all duration-500">
            <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Talk to HappiMynd</h3>
            <p className="text-muted-foreground">Build conscious workplaces.</p>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 border-2 group-hover:shadow-lg transition-all duration-300"
            >
              Explore for My Team
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoPathsSection;
