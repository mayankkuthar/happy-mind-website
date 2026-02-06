import { Quote } from "lucide-react";

const reviews = [
  {
    quote: "HappiMynd helped us identify emotional patterns we didn't know existed. Our leadership team now makes decisions with better awareness of team dynamics.",
    author: "CHRO",
    company: "Technology Company",
  },
  {
    quote: "The psychodiagnostic insights gave us clarity on why certain teams were underperforming. It wasn't the process — it was the people dynamics.",
    author: "Head of People",
    company: "Financial Services",
  },
  {
    quote: "We've seen measurable improvement in retention and engagement since implementing HappiMynd's people intelligence framework.",
    author: "CEO",
    company: "Healthcare Organisation",
  },
];

const OrgClientReviews = () => {
  return (
    <section className="py-16 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border/30 shadow-sm"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <blockquote className="font-sans text-muted-foreground leading-relaxed mb-6 italic">
                "{review.quote}"
              </blockquote>
              <div className="border-t border-border/30 pt-4">
                <p className="font-semibold text-foreground">{review.author}</p>
                <p className="text-sm text-muted-foreground">{review.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgClientReviews;
