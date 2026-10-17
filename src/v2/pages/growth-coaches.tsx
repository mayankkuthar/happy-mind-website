import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Search,
  ShieldCheck,
  BadgeCheck,
  Award,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { DashboardShell, TopHeaderBar } from "@/v2/components/dashboard-shell";
import { Button } from "@/v2/components/ui/button";
import { Input } from "@/v2/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/v2/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/v2/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/v2/components/ui/dialog";
import { cn } from "@/v2/lib/utils";
import {
  GROWTH_COACHES,
  COACHING_LEVELS,
  COACH_CITIES,
  COACHING_EXPERTISE,
  type GrowthCoach,
} from "@/v2/data/growth-coaches";
import { toast } from "sonner";
import { PaymentBreakdownModal } from "@/v2/components/payment-breakdown-modal";
import { payForHappiGuide, availFreeService } from "@/v2/lib/website-api";
import { auth, useAuth } from "@/v2/lib/auth";
import { checkAuthOrRedirect } from "@/v2/lib/auth-guard";
import { useV2Navigate } from "@/v2/lib/router";

export default GrowthCoachesPage;

// Growth coaching is billed through the HappiGUIDE / SOLV payment endpoint.
const GROWTH_COACH_PLAN_ID = 22;
// Coach the visitor tried to book before being sent to login; resumed on return.
const PENDING_COACH_KEY = "hm_pending_growth_coach";
// Placeholder time sent to the payment API, which requires one.
const GROWTH_COACH_TIME = "To be scheduled";

const TRUST = [
  { icon: ShieldCheck, label: "ICF Certified Coaches Available" },
  { icon: BadgeCheck, label: "Verified Growth & Leadership Coaches" },
  { icon: Award, label: "ACC / PCC Credentialed" },
];

const SORT_OPTIONS = [
  "Default",
  "Price: Low to High",
  "Price: High to Low",
];

const inr = (n: unknown) => {
  const num = typeof n === "number" ? n : typeof n === "string" ? Number(n) : 0;
  return `\u20b9${(isNaN(num) ? 0 : num).toLocaleString("en-IN")}`;
};

function initials(name: unknown) {
  const str = typeof name === "string" ? name : "";
  return str
    .replace(/^(Colonel|Dr\.?)\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase() || "?";
}

function GrowthCoachesPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<string>("All");
  const [city, setCity] = useState<string>("All");
  const [expertiseFilter, setExpertiseFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Default");

  // Booking & Payment State
  const [bookingCoach, setBookingCoach] = useState<GrowthCoach | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const navigate = useV2Navigate();
  const { authed, hydrated } = useAuth();

  // Resume the booking the visitor started before logging in
  useEffect(() => {
    if (!hydrated || !authed) return;
    let pendingId: string | null = null;
    try {
      pendingId = sessionStorage.getItem(PENDING_COACH_KEY);
      sessionStorage.removeItem(PENDING_COACH_KEY);
    } catch {
      /* storage unavailable */
    }
    const coach = pendingId ? GROWTH_COACHES.find((c) => c.id === pendingId) : undefined;
    if (coach) openBooking(coach);
  }, [hydrated, authed]);

  const filtered = useMemo(() => {
    let list = GROWTH_COACHES.filter((c) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.designation.toLowerCase().includes(q) ||
        c.expertise.some((e) => e.toLowerCase().includes(q)) ||
        c.bio.toLowerCase().includes(q);
      const matchesLevel =
        level === "All" || c.coachingLevel === level;
      const matchesCity =
        city === "All" ||
        c.city.toLowerCase().includes(city.toLowerCase());
      const matchesExpertise =
        expertiseFilter === "All" ||
        c.expertise.some((e) =>
          e.toLowerCase().includes(expertiseFilter.toLowerCase()),
        );
      return matchesQuery && matchesLevel && matchesCity && matchesExpertise;
    });

    if (sortBy === "Price: Low to High") {
      list = list.slice().sort((a, b) => a.feesForHM - b.feesForHM);
    } else if (sortBy === "Price: High to Low") {
      list = list.slice().sort((a, b) => b.feesForHM - a.feesForHM);
    }

    return list;
  }, [query, level, city, expertiseFilter, sortBy]);

  const reset = () => {
    setQuery("");
    setLevel("All");
    setCity("All");
    setExpertiseFilter("All");
    setSortBy("Default");
  };

  function openBooking(coach: GrowthCoach) {
    setBookingCoach(coach);
  }

  // Visitors must log in before booking; remember the coach so the dialog reopens after login.
  const handleBookClick = (coach: GrowthCoach) => {
    if (!auth.get()?.token) {
      try {
        sessionStorage.setItem(PENDING_COACH_KEY, coach.id);
      } catch {
        /* storage unavailable */
      }
      checkAuthOrRedirect(navigate, "/growth-coaches", "Please login");
      return;
    }
    openBooking(coach);
  };

  const handleProceedToPayment = () => {
    setBreakdownOpen(true);
  };

  const handleConfirmPayment = async (
    couponId?: number,
    discountedSubtotal?: number,
    discountPercent?: number,
  ) => {
    if (!bookingCoach) return;
    const token = auth.get()?.token;
    if (!token) {
      checkAuthOrRedirect(navigate, "/growth-coaches", "Please login");
      return;
    }

    const effectiveAmount =
      discountPercent && discountPercent > 0 && typeof discountedSubtotal === "number"
        ? discountedSubtotal
        : bookingCoach.feesForHM;
    // No slot is picked for growth coaching; the team schedules the session after payment.
    const dateStr = format(new Date(), "yyyy-MM-dd");

    setIsProcessing(true);
    try {
      if (discountPercent === 100) {
        const freeRes = await availFreeService(
          { plan_id: GROWTH_COACH_PLAN_ID, coupen_id: couponId ?? undefined },
          token,
        );
        if (freeRes.status !== "success") {
          throw new Error(freeRes.message || "Failed to process free booking.");
        }
        setBreakdownOpen(false);
        setBookingCoach(null);
        navigate({
          to: "/checkout/success",
          search: {
            status: "success",
            purchased: `Growth Coaching Session with ${bookingCoach.name}`,
            plan: "Growth Coaching",
            date: dateStr,
          },
        });
        return;
      }

      const res = await payForHappiGuide(
        {
          plan_id: GROWTH_COACH_PLAN_ID,
          amount: effectiveAmount,
          date: dateStr,
          time: GROWTH_COACH_TIME,
          coupen_id: couponId ?? 0,
        },
        token,
      );

      if (!res?.link) {
        throw new Error(res?.message || "Could not start payment. Please try again.");
      }
      toast.success("Redirecting to secure payment gateway…");
      window.location.href = res.link;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment failed. Please try again.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardShell
      header={
        <TopHeaderBar
          title="Growth Coaches"
          subtitle="Book your coaching session"
          emoji=""
        />
      }
    >
      {/* SECTION 1 — Hero */}
      <section className="rounded-[1.75rem] bg-white p-5 shadow-card sm:rounded-[2rem] sm:p-8 lg:p-10">
        <h1 className="text-xl font-bold tracking-tight sm:whitespace-nowrap sm:text-3xl lg:text-4xl xl:text-5xl">
          Find Your Growth Coach
        </h1>
        <p className="mt-3 max-w-2xl text-xs text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
          Browse our panel of ICF-certified growth coaches and filter by coaching level,
          city, or area of expertise to find the coach that best fits your leadership journey.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-lavender/60 bg-white px-3 py-1 text-[11px] font-medium text-foreground/75 shadow-soft sm:px-3.5 sm:py-1.5 sm:text-xs"
              >
                <Icon
                  className="h-3.5 w-3.5 text-lavender-deep shrink-0"
                  strokeWidth={2.2}
                />
                <span>{t.label}</span>
              </span>
            );
          })}
        </div>
      </section>

      {/* SECTION 2 — Search & Filters */}
      <section className="rounded-[1.75rem] bg-white p-4 shadow-soft sm:rounded-[2rem] sm:p-6 lg:p-7">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-5 sm:h-5 sm:w-5" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by coach name, expertise..."
            className="h-12 rounded-2xl border-border/70 bg-background/60 pl-11 text-xs shadow-none focus-visible:ring-lavender-deep/40 sm:h-14 sm:pl-14 sm:text-sm lg:text-base"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:mt-5">
          <FilterSelect
            label="Coaching Level"
            value={level}
            onChange={setLevel}
            options={["All", ...COACHING_LEVELS.filter((l) => l !== "All")]}
          />
          <FilterSelect
            label="Area of Expertise"
            value={expertiseFilter}
            onChange={setExpertiseFilter}
            options={["All", ...COACHING_EXPERTISE]}
          />
          <FilterSelect
            label="City"
            value={city}
            onChange={setCity}
            options={["All", ...COACH_CITIES]}
          />
          <FilterSelect
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={SORT_OPTIONS}
          />
        </div>
      </section>

      {/* Microcopy */}
      <section className="rounded-2xl border border-lavender/50 bg-lavender/15 p-4 sm:rounded-3xl sm:p-5 sm:px-7">
        <div className="text-xs font-semibold sm:text-sm">
          Not sure who to choose?
        </div>
        <p className="mt-1 max-w-3xl text-xs text-muted-foreground leading-relaxed sm:text-sm">
          Use the filters to narrow your options, or simply browse our panel.&nbsp; Every
          growth coach on HappiMynd is carefully vetted and credentialed to ensure quality coaching.
        </p>
      </section>

      {/* SECTION 3 — Coach Cards */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
              Our Panel of Growth Coaches
            </h2>
            <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
              {filtered.length} coach{filtered.length === 1 ? "" : "es"} matching
              your preferences
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground shrink-0 hidden sm:inline">
              Sort By:
            </span>
            <div className="w-48 sm:w-56">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 rounded-xl border-border/70 bg-white text-xs font-medium shadow-none focus:ring-lavender-deep/40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/60 bg-white shadow-card">
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-xs">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-[1.75rem] bg-white p-6 text-center shadow-soft sm:rounded-[2rem] sm:p-10">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-lavender/40 text-lavender-deep sm:h-12 sm:w-12">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
            </div>
            <div className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg">
              No exact matches found for your filter criteria.
            </div>
            <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground sm:mt-2 sm:text-sm">
              Try adjusting your search filters or explore our full panel of growth coaches.
            </p>
            <Button
              onClick={reset}
              className="mt-5 rounded-full bg-gradient-brand text-xs text-white hover:opacity-95 sm:mt-6 sm:text-sm"
            >
              Reset Filters & View All Coaches
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {filtered.map((c) => (
              <CoachCard 
                key={c.id} 
                coach={c} 
                onBook={() => handleBookClick(c)}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 4 — FAQ */}
      <section className="rounded-[1.75rem] bg-white p-5 shadow-soft sm:rounded-[2rem] sm:p-8">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is">
            <AccordionTrigger className="text-left text-xs font-semibold sm:text-sm lg:text-base">
              What is growth coaching?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Growth coaching is a structured, goal-oriented process where a certified coach
              partners with you to unlock potential, develop leadership capabilities, navigate
              career transitions, and achieve personal and professional growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="icf">
            <AccordionTrigger className="text-left text-xs font-semibold sm:text-sm lg:text-base">
              What does ICF certification mean?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              ICF (International Coaching Federation) is the world's leading coaching
              credentialing body. ACC (Associate Certified Coach) and PCC (Professional
              Certified Coach) credentials indicate rigorous training, coaching hours, and
              adherence to ethical standards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="choose">
            <AccordionTrigger className="text-left text-xs font-semibold sm:text-sm lg:text-base">
              How do I choose the right growth coach?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Consider your specific goals (leadership development, career transition,
              executive presence), the coach's areas of expertise, their coaching level
              (ACC/PCC), and their experience summary. You can also filter by city or area
              of expertise.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sessions" className="border-b-0">
            <AccordionTrigger className="text-left text-xs font-semibold sm:text-sm lg:text-base">
              How are coaching sessions conducted?
            </AccordionTrigger>
            <AccordionContent className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Sessions are conducted online via secure video calls. Each session typically
              lasts 45–60 minutes. Your coach will work with you to set goals, track
              progress, and ensure meaningful outcomes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Booking & Payment Dialog */}
      <Dialog 
        open={!!bookingCoach} 
        onOpenChange={(open) => {
          if (!open && !isProcessing) {
            setBookingCoach(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md max-h-[92vh] overflow-y-auto rounded-[2rem] p-0 border-0 shadow-2xl">
            <div className="bg-white">
              <div className="p-6 pb-5 border-b border-border/50 bg-background/30">
                <DialogTitle className="text-xl font-bold text-foreground">Complete Your Booking</DialogTitle>
                <DialogDescription className="mt-1.5 text-xs sm:text-sm">
                  Review your session details and proceed to secure payment.
                </DialogDescription>
              </div>
              <div className="p-6 space-y-5">
                 {/* Details */}
                 <div className="flex justify-between items-center pb-5 border-b border-border/50">
                   <div className="min-w-0 pr-4">
                     <div className="font-bold text-foreground truncate">{bookingCoach?.name}</div>
                     <div className="text-xs text-muted-foreground mt-0.5">Growth Coaching Session (60 min)</div>
                   </div>
                   <div className="font-extrabold text-xl whitespace-nowrap text-foreground">
                     {inr(bookingCoach?.feesForHM)}
                   </div>
                 </div>

                 <div className="rounded-xl bg-amber-50/80 p-3 border border-amber-100">
                   <div className="text-[11px] text-amber-800/80 leading-relaxed text-center font-medium">
                     By proceeding, you agree to our booking terms and conditions.
                   </div>
                 </div>
                 
                 <Button 
                   className="w-full h-12 rounded-full bg-gradient-brand text-white font-bold text-base mt-2 shadow-glow transition-all duration-300 hover:brightness-110"
                   onClick={handleProceedToPayment}
                   disabled={isProcessing}
                 >
                   {isProcessing ? (
                     <span className="flex items-center gap-2">
                       <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Connecting to Razorpay...
                     </span>
                   ) : (
                     "Proceed to Payment"
                   )}
                 </Button>
                 
                 <div className="flex justify-center items-center gap-1.5 opacity-60">
                   <ShieldCheck className="h-3.5 w-3.5 text-foreground" />
                   <span className="text-[10px] font-semibold tracking-wide uppercase text-foreground">100% Secure Payment</span>
                 </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>

      {bookingCoach && (
        <PaymentBreakdownModal
          open={breakdownOpen}
          onOpenChange={setBreakdownOpen}
          itemName={`Growth Coaching - Session with ${bookingCoach.name}`}
          itemDescription="Growth Coaching Session (60 min)"
          basePrice={bookingCoach.feesForHM}
          planId={GROWTH_COACH_PLAN_ID}
          onConfirmPayment={handleConfirmPayment}
          isLoading={isProcessing}
        />
      )}
    </DashboardShell>
  );
}

/* ────────────────── Filter Select ────────────────── */
function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[] | string[];
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:mb-1.5 sm:text-[11px]">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 w-full rounded-xl border-border/70 bg-background/60 text-xs sm:h-12 sm:rounded-2xl sm:text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-60 rounded-xl bg-white shadow-card sm:max-h-72 sm:rounded-2xl">
          {options.map((o) => (
            <SelectItem key={o} value={o} className="text-xs sm:text-sm">
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/* ────────────────── Coach Card ────────────────── */
function CoachCard({ coach: c, onBook }: { coach: GrowthCoach; onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const top = open ? c.expertise : c.expertise.slice(0, 4);
  const more = c.expertise.length - 4;

  return (
    <article className="group rounded-[1.5rem] border border-border/50 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-lavender/70 hover:shadow-card sm:rounded-[2rem] sm:p-6 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,12rem)] sm:gap-6">
        {/* LEFT — Profile */}
        <div className="flex items-start gap-3.5 sm:gap-4 lg:flex-col lg:gap-4 min-w-0 max-w-full overflow-hidden">
          <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-brand text-lg font-bold text-white shadow-glow sm:h-20 sm:w-20 sm:rounded-3xl sm:text-xl lg:h-24 lg:w-24 lg:text-2xl">
            {c.photo ? (
              <img
                src={c.photo}
                alt={c.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              initials(c.name)
            )}
          </div>
          <div className="min-w-0 flex-1 max-w-full overflow-hidden">
            <h3 className="text-base font-bold leading-tight text-foreground sm:text-lg">
              {c.name}
            </h3>
            <div className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm break-words">
              {c.designation}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2">
              {c.icfCertified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-lavender/35 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-lavender-deep sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
                  <BadgeCheck
                    className="h-3 w-3 shrink-0"
                    strokeWidth={2.4}
                  />
                  ICF Certified
                </span>
              )}
              {c.coachingLevel && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-800 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
                  <Award className="h-3 w-3 shrink-0" strokeWidth={2.4} />
                  {c.coachingLevel}
                </span>
              )}
            </div>
            <dl className="mt-2.5 space-y-1.5 text-xs text-muted-foreground sm:mt-3 sm:space-y-2 min-w-0 w-full">
              {c.city && (
                <div className="flex items-start gap-1.5 min-w-0 max-w-full overflow-hidden">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lavender-deep"
                    strokeWidth={2.2}
                  />
                  <span className="min-w-0 flex-1 break-words [overflow-wrap:anywhere] [word-break:break-word] text-xs text-muted-foreground sm:text-sm leading-snug">
                    {c.city}
                  </span>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* CENTER — Tags & Bio */}
        <div className="min-w-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {top.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border/70 bg-background/50 px-2.5 py-0.5 text-[11px] font-medium text-foreground/75 sm:px-3 sm:py-1 sm:text-xs"
              >
                {s}
              </span>
            ))}
            {more > 0 && !open && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full bg-lavender/25 px-2.5 py-0.5 text-[11px] font-semibold text-lavender-deep transition-colors hover:bg-lavender/40 cursor-pointer sm:px-3 sm:py-1 sm:text-xs"
              >
                +{more} More
              </button>
            )}
          </div>

          <p
            className={cn(
              "mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm transition-all",
              open ? "whitespace-pre-line" : "line-clamp-3",
            )}
          >
            {c.bio}
          </p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-lavender-deep transition-opacity hover:opacity-80 cursor-pointer sm:mt-4 sm:gap-1.5 sm:text-sm"
          >
            {open ? "Show Less" : "Read Full Profile"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300",
                open && "rotate-180",
              )}
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* RIGHT — Pricing Box */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-lavender/15 p-4 text-center sm:rounded-3xl sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-[11px]">
              Starting From
            </div>
            <div className="mt-0.5 text-2xl font-bold tracking-tight sm:mt-1 sm:text-3xl text-foreground">
              {inr(c.feesForHM)}
            </div>
            <div className="text-[11px] text-muted-foreground sm:text-xs">
              Per Session
            </div>
            <Button
              onClick={onBook}
              className="mt-3 w-full rounded-full bg-gradient-brand text-xs font-bold text-white shadow-glow transition-all duration-300 hover:brightness-110 cursor-pointer sm:mt-4 sm:text-sm"
            >
              Book Now
            </Button>
            <div className="mt-2.5 flex items-center justify-center gap-1 text-[10px] text-muted-foreground sm:mt-3 sm:gap-1.5">
              <ShieldCheck
                className="h-3 w-3 shrink-0"
                strokeWidth={2.2}
              />
              <span className="truncate">100% Confidential</span>
            </div>
          </div>
        </div>
      </div>

    </article>
  );
}
