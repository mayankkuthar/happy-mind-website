import { Users, Building, Award, TrendingUp } from "lucide-react";

const proofStats = [
  {
    icon: Users,
    value: "2L+",
    label: "individuals engaged across environments",
  },
  {
    icon: Building,
    value: "40+",
    label: "institutional clients across BFSI, IT, media, real estate, energy",
  },
  {
    icon: Award,
    value: "Industry First",
    label: "programs for PWD employees & D.E.I. interventions",
  },
  {
    icon: TrendingUp,
    value: "35%+",
    label: "engagement in corporate emotional support programmes",
  },
];

const OrgProofSection = () => {
  return (
    <section className="py-20 px-6 lg:px-16 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Proof
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Built on real-world experience, not theory
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofStats.map((stat, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border/30 shadow-sm text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgProofSection;
