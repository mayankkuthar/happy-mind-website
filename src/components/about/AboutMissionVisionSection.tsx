import { Eye, Rocket, Users, Shield, Sparkles, Heart } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "People-Centric",
    description: "Every solution starts with understanding human behaviour and needs.",
  },
  {
    icon: Shield,
    title: "Trust & Privacy",
    description: "Confidentiality and ethical practice are non-negotiable foundations.",
  },
  {
    icon: Sparkles,
    title: "Conscious Growth",
    description: "We believe in growth that is intentional, sustainable, and meaningful.",
  },
  {
    icon: Heart,
    title: "Accessible Impact",
    description: "Psychological support should be available to everyone, everywhere.",
  },
];

const AboutMissionVisionSection = () => {
  return (
    <section className="py-24 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Our Mission, Vision & Values
          </h2>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-10 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Vision</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg">
              To make psychological support accessible, actionable and transformative, creating people-centric intelligence systems that help every individual and organisation become more aware, emotionally intelligent and capable of growing consciously.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-10 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Mission</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed text-lg">
              To empower people and organisations through psychology and technology, enabling conscious growth that unlocks people potential, improves performance, and redefines happiness in a people-centric world.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                {value.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVisionSection;
