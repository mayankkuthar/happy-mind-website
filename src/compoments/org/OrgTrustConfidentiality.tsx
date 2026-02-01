import { Shield, Lock, CheckCircle2, XCircle, Eye } from "lucide-react";

const leadershipReceives = [
  "Aggregated, anonymised emotional trend data",
  "Early warning indicators for burnout and disengagement",
  "Clear insights to guide people decisions",
];

const leadershipDoesNot = [
  "Individual employee records",
  "Therapy notes or session details",
  "Personal disclosures",
];

const employeeExperience = [
  "Confidential emotional support",
  "Simple daily tools",
  "Access to professional guidance",
  "Voluntary participation built on trust",
];

const securityBadges = [
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Lock, text: "GDPR compliant" },
  { icon: Eye, text: "ISO 27001 ready" },
];

const OrgTrustConfidentiality = () => {
  return (
    <section className="py-20 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Confidentiality is foundational to adoption and impact
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Trust is not a feature. It is the system.
          </p>
        </div>

        {/* Three Column Trust Structure */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* What Leadership Receives */}
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
              What leadership receives
            </h3>
            <div className="space-y-4">
              {leadershipReceives.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What Leadership Does NOT Receive */}
          <div className="bg-muted/50 rounded-2xl p-8 border border-border/30">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
              What leadership does NOT receive
            </h3>
            <div className="space-y-4">
              {leadershipDoesNot.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive/70 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What Employees Experience */}
          <div className="bg-card rounded-2xl p-8 border border-border/30 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
              What employees experience
            </h3>
            <div className="space-y-4">
              {employeeExperience.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Strip */}
        <div className="flex flex-wrap justify-center gap-6">
          {securityBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-muted/50 rounded-full px-6 py-3 border border-border/30"
            >
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgTrustConfidentiality;
