import { Separator } from "@/components/ui/separator";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card py-12 sm:py-16 px-4 sm:px-6 lg:px-16">
      <div class="container mx-auto max-w-6xl px-0">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Block */}
          <div class="col-span-1 space-y-4">
            <h3 class="font-serif text-xl font-semibold text-foreground">HappiMynd</h3>
            <p class="text-muted-foreground leading-relaxed text-xs sm:text-sm">
              A conscious growth ecosystem empowering people to become more aware, capable, and connected.
            </p>
          </div>

          {/* Platform */}
          <div class="space-y-4">
            <h4 class="font-semibold text-foreground text-sm">Platform</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">MyPulse</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MyCheck-In</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Learn</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">MyGuide</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div class="space-y-4">
            <h4 class="font-semibold text-foreground text-sm">Solutions</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">For Individuals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Organisations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SOLV</a></li>
            </ul>
          </div>

          {/* Company */}
          <div class="space-y-4">
            <h4 class="font-semibold text-foreground text-sm">Company</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div class="space-y-4">
            <h4 class="font-semibold text-foreground text-sm">Legal</h4>
            <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <Separator class="mb-8" />

        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs sm:text-sm">
          <p class="text-center md:text-left">© 2024 HappiMynd. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="LinkedIn">
              <Linkedin class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Instagram">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Facebook">
              <Facebook class="w-4 h-4" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="YouTube">
              <Youtube class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;