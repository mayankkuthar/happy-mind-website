import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Building2, Sparkles } from "lucide-react";

const Solv = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto max-w-5xl text-center px-0">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Welcome to <span className="text-primary">SOLV</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-12">
              A conscious growth ecosystem designed to help individuals and organisations 
              pause, reflect, and grow — before stress turns into struggle.
            </p>
            <div className="flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary mr-2" />
              <span className="text-muted-foreground">Choose your path below</span>
            </div>
          </div>
        </section>

        {/* Two Paths Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-card">
          <div className="container mx-auto max-w-5xl px-0">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* For Individuals Card */}
              <div className="group bg-background rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
                  For Individuals
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 flex-grow">
                  Your personal space for conscious growth. Understand yourself better, 
                  navigate life transitions, and build emotional resilience with expert guidance.
                </p>
                <ul className="text-muted-foreground text-xs sm:text-sm space-y-2 mb-6 sm:mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Personalized assessments & insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    1-on-1 growth coaching sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Self-help tools & daily practices
                  </li>
                </ul>
                <Link to="/for-individuals">
                  <Button className="w-full rounded-full group-hover:bg-primary/90 text-sm sm:text-base py-2 sm:py-3">
                    Explore for Myself
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* For Organisations Card */}
              <div className="group bg-background rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
                  For Organisations
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 flex-grow">
                  Support emotionally healthier teams. Reduce burnout, improve focus, 
                  engagement, and sustainability at work.
                </p>
                <ul className="text-muted-foreground text-xs sm:text-sm space-y-2 mb-6 sm:mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Team wellness assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Leadership development programs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Organizational culture insights
                  </li>
                </ul>
                <Link to="/for-organisations">
                  <Button variant="outline" className="w-full rounded-full group-hover:bg-accent text-sm sm:text-base py-2 sm:py-3">
                    Explore for My Team
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16">
          <div className="container mx-auto max-w-3xl text-center px-0">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
              Not sure where to start?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">
              Book a free 20-minute intro session with our growth coaches to find the right path for you.
            </p>
            <Button size="lg" className="rounded-full px-8 sm:px-10 text-sm sm:text-base py-2 sm:py-3">
              Book Free Session
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solv;
