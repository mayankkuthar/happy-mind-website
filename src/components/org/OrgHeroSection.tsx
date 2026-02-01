import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye } from "lucide-react";
import organizationHero from "@/assets/organization-hero.png";

const trustBadges = [
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Lock, text: "GDPR compliant" },
  { icon: Eye, text: "Anonymised insights" },
];

const OrgHeroSection = () => {
  return (
    <section className="min-h-[90vh] flex items-center py-16 px-6 lg:px-16">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2.5">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Built for enterprise trust
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            When people feel supported, companies{" "}
            <span className="text-primary">outperform.</span>
          </h1>

          {/* H2 */}
          <h2 className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed">
            Performance and productivity are not driven by systems alone — they
            are driven by people.
          </h2>

          {/* Core Value Paragraph */}
          <p className="font-sans text-base text-muted-foreground/80 leading-relaxed max-w-xl">
            HappiMynd enables organisations to strengthen employee well-being
            through psychology-driven, people-centric intelligence that turns
            emotional awareness into a strategic advantage — without creating
            operational risk.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-background border border-border/50 rounded-full px-4 py-2 shadow-sm"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button
              variant="default"
              size="lg"
              className="rounded-full px-10 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Talk to HappiMynd
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Explore how people intelligence strengthens performance.
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex items-center justify-center">
          <img
            src={organizationHero}
            alt="People-centric organizational growth"
            className="w-full max-w-lg lg:max-w-xl h-auto object-contain rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default OrgHeroSection;
