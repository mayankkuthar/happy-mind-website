import { Separator } from "@/components/ui/separator";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card py-16 px-6 lg:px-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Block */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="font-serif text-xl font-semibold text-foreground">HappiMynd</h3>
            <p className="text-muted-foreground leading-relaxed text-xs">
              A conscious growth ecosystem empowering people to become more aware, capable, and connected.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Platform</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">MyPulse</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MyCheck-In</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Learn</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MyGuide</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Solutions</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">For Individuals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Organisations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SOLV</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Company</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Legal</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
          <p>© 2024 HappiMynd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;