import { ReactNode, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BROCHURE_URL = "/happimynd-brochure.pdf";

const ctaClass = "rounded-full px-7 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl transition-all";

/** Opens the site-wide contact form (listened for by FloatingContactButton). */
export const ContactCta = ({ children, className }: { children: ReactNode; className?: string }) => (
  <Button
    size="lg"
    className={cn(ctaClass, "group", className)}
    onClick={() => window.dispatchEvent(new CustomEvent("open-contact-form"))}
  >
    {children}
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </Button>
);

export const BrochureCta = ({ className }: { className?: string }) => (
  <Button
    asChild
    size="lg"
    variant="outline"
    className={cn(ctaClass, "border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground", className)}
  >
    <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer">
      <Download className="w-4 h-4" />
      Download Brochure
    </a>
  </Button>
);

export const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "mb-12 md:mb-14",
      align === "center" ? "text-center mx-auto max-w-4xl" : "text-left max-w-4xl",
      className,
    )}
  >
    {eyebrow && (
      <p
        className={cn(
          "mb-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase",
          dark ? "text-lavender-medium" : "text-primary",
        )}
      >
        {eyebrow}
      </p>
    )}
    <h2
      className={cn(
        "font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight",
        dark ? "text-white" : "text-foreground",
      )}
    >
      {title}
    </h2>
    <span
      className={cn(
        "block h-1 w-16 rounded-full bg-gradient-brand mt-5",
        align === "center" && "mx-auto",
      )}
    />
    {intro && (
      <div
        className={cn(
          "mt-6 text-base md:text-lg leading-relaxed",
          dark ? "text-white/80" : "text-muted-foreground",
        )}
      >
        {intro}
      </div>
    )}
  </div>
);

export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Counts from 0 to `value` the first time it scrolls into view. */
export const CountUp = ({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
};

/** Shows the image when supplied, otherwise a labelled slot so the gap is obvious. */
export const MediaSlot = ({
  src,
  alt,
  label,
  className,
}: {
  src: string | null | undefined;
  alt: string;
  label: string;
  className?: string;
}) =>
  src ? (
    <img src={src} alt={alt} className={cn("object-cover", className)} />
  ) : (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary/30 bg-lavender-light/60 text-primary/70 text-center p-6",
        className,
      )}
    >
      <ImageIcon className="w-8 h-8" />
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
