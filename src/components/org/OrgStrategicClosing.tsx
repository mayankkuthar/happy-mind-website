import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrgStrategicClosing = () => {
  return (
    <section className="py-24 px-6 lg:px-16 bg-background">
      <div className="container mx-auto max-w-4xl text-center">
        {/* H1 */}
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
          Build conscious, high-performing teams through{" "}
          <span className="text-primary">people intelligence</span>
        </h2>

        {/* Closing Paragraph */}
        <p className="font-sans text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          You cannot separate performance from people. HappiMynd helps
          organisations unlock potential through psychology-powered, data-backed
          solutions that strengthen awareness, leadership, and culture — at
          scale.
        </p>

        {/* CTA Strip */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-10 md:p-16 border border-primary/20">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {/* Primary CTA */}
            <div className="text-center">
              <Link to="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-contact-form')); }}>
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-10 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
              >
                Talk to HappiMynd
              </Button>
              </Link>
              <p className="text-xs text-muted-foreground">
                Explore how people intelligence strengthens performance.
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgStrategicClosing;
