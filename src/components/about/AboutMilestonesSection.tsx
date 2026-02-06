const milestones = [
  {
    year: "2019",
    title: "Founded",
    description:
      "HappiMynd was born from a simple belief: mental well-being should be accessible to everyone.",
  },
  {
    year: "2020",
    title: "First 1,000 Users",
    description:
      "Launched our core platform and helped our first thousand individuals find clarity.",
  },
  {
    year: "2021",
    title: "Corporate Launch",
    description:
      "Expanded to serve organizations, bringing emotional well-being to workplaces across India.",
  },
  {
    year: "2022",
    title: "25K+ Assessments",
    description:
      "Crossed 25,000 psychological assessments, building India's largest emotional intelligence dataset.",
  },
  {
    year: "2023",
    title: "App Launched",
    description:
      "Released the HappiMynd mobile app, making conscious growth accessible on-the-go.",
  },
  {
    year: "2024",
    title: "2L+ Lives Touched",
    description:
      "Reached over 200,000 individuals and partnered with 40+ corporate clients.",
  },
  {
    year: "2025",
    title: "HappiMynd 2.0 & SOLV",
    description:
      "Launched HappiMynd 2.0 platform and introduced SOLV for youth conscious growth.",
  },
];

const AboutMilestonesSection = () => {
  return (
    <section className="py-24 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Our Milestones
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                  }`}
                >
                  <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-all duration-300">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-mono text-sm font-semibold rounded-full mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMilestonesSection;
