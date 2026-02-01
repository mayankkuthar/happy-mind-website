import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
const FinalInvitationSection = () => {
  return <section className="py-24 px-6 lg:px-16 text-center bg-background">
      <div className="container mx-auto max-w-4xl space-y-10">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-sans text-primary">
          Ready for conscious growth?
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-serif md:text-2xl font-semibold">
          Whether you're an individual seeking clarity or an organisation building people potential, we're here to help you unlock your best self.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild variant="default" size="lg" className="rounded-full px-8 py-6 text-base font-medium">
            <Link to="/for-individuals">Start My Journey →</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-medium">
            <Link to="/for-organisations">Explore Corporate Solutions</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="rounded-full px-8 py-6 text-base font-medium">
            <Link to="/talk-to-professional">Talk to a Professional</Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-px bg-border" />
        </div>

        {/* Support line */}
        <p className="text-muted-foreground text-base font-mono">
          Have questions? Reach out to us.
        </p>

        {/* Contact row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <a href="mailto:hello@happimynd.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            <span>hello@happimynd.com</span>
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span>+91 98765 43210</span>
          </a>
          <Link to="/live-chat" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>Live Chat</span>
          </Link>
        </div>
      </div>
    </section>;
};
export default FinalInvitationSection;