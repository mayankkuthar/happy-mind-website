import { TrendingUp, DollarSign, Users } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "76%",
    label: "of employees report burnout symptoms at work",
  },
  {
    icon: DollarSign,
    value: "$322B",
    label: "global cost of turnover linked to burnout",
  },
  {
    icon: Users,
    value: "4×",
    label: "higher engagement with emotionally aware leaders",
  },
];

const OrgBusinessRealityStrip = () => {
  return (
    <section className="py-16 px-6 lg:px-16 bg-primary/5">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Why this matters
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border/30 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="font-serif text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pull Quote */}
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed">
            "Most organisations intervene only after performance drops.
            HappiMynd helps you move earlier."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default OrgBusinessRealityStrip;
