const steps = [{
  number: "01",
  title: "You choose where you are",
  description: "Start from your current state, not from labels or assumptions."
}, {
  number: "02",
  title: "We guide you with the right support",
  description: "Matched resources and tools that fit your journey."
}, {
  number: "03",
  title: "You stay in control",
  description: "Your pace. Your choices. Your growth."
}, {
  number: "04",
  title: "You move at your pace",
  description: "No rush. No pressure. Just continuous progress."
}];
const HowItWorksSection = () => {
  return <section className="py-24 px-6 lg:px-16">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <p className="text-primary tracking-wide uppercase font-sans font-semibold text-4xl">How It Works</p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-3xl">
            Simple steps. Calm guidance.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={step.number} className="relative text-center space-y-4 group">
              {/* Connector Line */}
              {index < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-primary/30 to-primary/10" />}
              
              <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center text-accent-foreground font-serif text-xl font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {step.number}
              </div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;