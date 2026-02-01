import { Building, Building2, Landmark, Globe } from "lucide-react";

const environments = [
  { icon: Building, label: "Startups", range: "10–100" },
  { icon: Building2, label: "Mid-sized", range: "100–1000" },
  { icon: Landmark, label: "Enterprise", range: "1000+" },
  { icon: Globe, label: "Global, multi-geo teams", range: null },
];

const OrgScalability = () => {
  return (
    <section className="py-20 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Designed for scale, privacy, and compliance
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Suitable for startups, mid-sized companies, and enterprises — across
            teams and geographies.
          </p>
        </div>

        {/* Supported Environments */}
        <div className="mb-12">
          <h3 className="font-serif text-xl font-semibold text-foreground text-center mb-10">
            Supported environments
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {environments.map((env, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border/30 shadow-sm text-center"
              >
                <env.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <div className="font-semibold text-foreground mb-1">
                  {env.label}
                </div>
                {env.range && (
                  <span className="text-sm text-muted-foreground">
                    {env.range}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Closing Line */}
        <p className="font-sans text-lg text-muted-foreground text-center">
          HappiMynd enables emotional support without compromising trust.
        </p>
      </div>
    </section>
  );
};

export default OrgScalability;
