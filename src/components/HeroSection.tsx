import { Button } from "@/components/ui/button";
import { Shield, Users, Star } from "lucide-react";
import whatSpaceHero from "@/assets/what-space-hero.png";

const trustPills = [{
  icon: Shield,
  text: "100% Private & Secure"
}, {
  icon: Users,
  text: "50K+ Users Trust Us"
}, {
  icon: Star,
  text: "4.8★ Rated"
}];

const HeroSection = () => {
  return <section className="min-h-[100vh] sm:min-h-[110vh] flex items-center py-8 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Trust Pills */}
          <div className="flex flex-row gap-4 justify-center lg:justify-start">
            {trustPills.map((pill, index) => <div key={index} className="flex items-center gap-2 bg-white border border-border/30 rounded-full px-5 py-2.5 shadow-md">
                <pill.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground whitespace-nowrap" style={{
              fontFamily: "'IBM Plex Sans', sans-serif"
            }}>
                  {pill.text}
                </span>
              </div>)}
          </div>

          {/* Micro-intro */}
          <p className="font-sans text-base text-muted-foreground tracking-wide">
            Welcome to
          </p>
          
          {/* H1 */}
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-muted-foreground">
            A <span className="text-primary">Conscious Growth Ecosystem</span> Where
          </h1>
          
          {/* H2 - Hero Statement */}
          <h2 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-black">
            Technology empowers people & organisations to become more{" "}
            <span className="text-primary">aware, capable, and connected.</span>
          </h2>
          
          {/* H3 - Support Line */}
          <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif"
        }} className="text-sm md:text-base font-medium tracking-wide font-mono text-muted-foreground">
            Psychology-powered. Human-led.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button variant="default" size="lg" className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Start for Myself
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-medium border-2 border-primary text-primary bg-background hover:bg-primary/5 transition-all duration-300">
              Explore for My Team
            </Button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex items-center justify-center">
          <img 
            src={whatSpaceHero} 
            alt="People growing together in a conscious space" 
            className="w-full max-w-xs sm:max-w-lg lg:max-w-xl h-auto object-contain rounded-2xl shadow-lg" 
          />
        </div>
      </div>
    </section>;
};

export default HeroSection;
