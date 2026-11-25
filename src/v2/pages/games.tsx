import { V2Link } from "@/v2/lib/router";
import { ArrowLeft, ArrowUpRight, Brain, Leaf, Play, Smile, Timer, Sparkles, BookOpen, CircleHelp, LayoutDashboard } from "lucide-react";
import { DashboardShell, TopHeaderBar } from "@/v2/components/dashboard-shell";
import { Button } from "@/v2/components/ui/button";
import gamesHeroImg from "@/v2/assets/games-mascot.png";
import { useEffect, useState } from "react";

// Words that flash in and vanish one after another before the wordmark lands.
const INTRO_WORDS = ["Joy", "Games", "Fun", "Play", "Smile", "Relax", "Calm"];
const INTRO_WORD_MS = 650;

function HappiPauseIntro() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= INTRO_WORDS.length) return;
    const timer = setTimeout(() => setIndex((i) => i + 1), INTRO_WORD_MS);
    return () => clearTimeout(timer);
  }, [index]);

  if (index >= INTRO_WORDS.length) return <HappiPauseWordmark />;

  const word = INTRO_WORDS[index];
  return (
    <span aria-label="HappiPAUSE" className="inline-flex text-lavender-deep">
      <span
        key={word}
        aria-hidden="true"
        className="inline-flex animate-word-flash"
        style={{ animationDuration: `${INTRO_WORD_MS}ms` }}
      >
        {word.split("").map((letter, i) => (
          <span key={i} className="inline-block animate-letter-drop" style={{ animationDelay: `${i * 40}ms` }}>
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
}

// Letters drop in one by one, then take turns hopping in a wave.
function HappiPauseWordmark() {
  return (
    <span aria-label="HappiPAUSE" className="inline-flex text-lavender-deep">
      {"HappiPAUSE".split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block animate-letter-drop"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <span
            className="inline-block animate-letter-hop origin-bottom"
            style={{ animationDelay: `${700 + i * 80}ms` }}
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  );
}

export default GamesPage;

const HAPPIPAUSE_URL = "https://happipause.happimynd.com/";

const benefits = [
  {
    title: "Calm in Minutes",
    desc: "Short, soothing activities that help you slow down and breathe easier.",
    icon: Leaf,
    bg: "bg-gradient-mint",
  },
  {
    title: "Sharpen Your Focus",
    desc: "Gentle challenges that bring your attention back to the present moment.",
    icon: Brain,
    bg: "bg-gradient-lavender",
  },
  {
    title: "Zero Pressure",
    desc: "No timers to beat or scores to stress over. Play at your own pace.",
    icon: Smile,
    bg: "bg-gradient-peach",
  },
  {
    title: "Anytime, Anywhere",
    desc: "Works right in your browser, between meetings, classes, or before bed.",
    icon: Timer,
    bg: "bg-gradient-aqua",
  },
];

const steps = [
  {
    title: "Open HappiPAUSE",
    desc: "Tap Play Now to launch HappiPAUSE in a new tab.",
  },
  {
    title: "Pick a Game",
    desc: "Choose whatever matches your mood right now.",
  },
  {
    title: "Return Refreshed",
    desc: "A few minutes of play, then back to your day with a clearer mind.",
  },
];

const pageOptions = [
  {
    title: "Dashboard",
    desc: "Main Hub",
    to: "/",
    icon: LayoutDashboard,
    bg: "bg-gradient-lavender",
  },
  {
    title: "Services",
    desc: "Our Offerings",
    to: "/services",
    icon: Sparkles,
    bg: "bg-gradient-peach",
  },
  {
    title: "Resources",
    desc: "Articles & Audio",
    to: "/resources",
    icon: BookOpen,
    bg: "bg-gradient-mint",
  },
];

function GamesPage() {
  return (
    <DashboardShell
      header={
        <TopHeaderBar
          title={<HappiPauseIntro />}
          emoji=""
          subtitle="Playful experiences designed to help you recharge and refocus."
        />
      }
    >
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-6 shadow-card sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-lavender/40 blur-3xl" />

        {/* Mascot sitting cleanly on bottom-right edge */}
        <img
          src={gamesHeroImg}
          alt="HappiMynd HappiPAUSE Mascot"
          className="pointer-events-none absolute bottom-0 right-6 hidden h-auto w-[170px] max-h-[92%] object-contain object-bottom md:block xl:right-12 xl:w-[210px]"
        />

        <div className="relative flex flex-col items-start gap-5 text-left md:max-w-[65%]">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Now Live
          </span>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pause. Play. Feel Lighter.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base md:text-lg">
              HappiPAUSE is here: a collection of playful, calming mind games that help you relax,
              reset, and return to your day with a clearer mind. No scores to chase, no pressure,
              just a few mindful minutes for you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-brand px-8 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
            >
              <a href={HAPPIPAUSE_URL} target="_blank" rel="noopener noreferrer">
                <Play className="mr-1.5 h-4 w-4 fill-current" /> Play Now
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white bg-white/80 px-6 text-sm font-semibold text-foreground/80 shadow-soft hover:bg-white"
            >
              <V2Link to="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </V2Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="rounded-3xl bg-white/95 p-6 shadow-soft border border-white/80 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className={`grid h-11 w-11 place-items-center rounded-full ${b.bg}`}>
                <Icon className="h-5 w-5 text-foreground/80" strokeWidth={2} />
              </div>
              <div className="mt-4 text-base font-bold text-foreground">{b.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </div>
          );
        })}
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden rounded-[2rem] bg-white/95 p-6 shadow-soft border border-white/80 sm:p-8 md:p-12">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-lavender/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-aqua/25 blur-3xl" />

        <div className="relative text-center">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Your Pause in 3 Steps</h3>
          <p className="mt-2 text-sm text-foreground/70 sm:text-base">
            Whenever your mind feels busy, a reset is just a tap away.
          </p>
        </div>

        <ol className="relative mt-8 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col items-center rounded-3xl bg-white/80 p-6 text-center border border-lavender/30"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white shadow-glow">
                {i + 1}
              </div>
              <div className="mt-4 text-base font-bold text-foreground">{s.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="relative mt-8 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-gradient-brand px-8 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
          >
            <a href={HAPPIPAUSE_URL} target="_blank" rel="noopener noreferrer">
              Start Your Pause <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Navigation Options Bar */}
      <section className="mt-4 rounded-[2rem] bg-white/95 p-6 shadow-soft border border-white/80 md:p-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Explore Other Sections</h3>
          </div>
          <V2Link
            to="/support"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lavender-deep hover:underline"
          >
            <CircleHelp className="h-3.5 w-3.5" /> Need Support?
          </V2Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {pageOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <V2Link
                key={opt.title}
                to={opt.to}
                className="group flex flex-col items-center justify-center rounded-2xl bg-white/80 p-4 text-center border border-lavender/30 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-card"
              >
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl ${opt.bg} shadow-soft transition-transform group-hover:scale-105`}
                >
                  <Icon className="h-5 w-5 text-foreground/80" strokeWidth={2} />
                </div>
                <div className="mt-3 text-sm sm:text-base font-bold text-foreground">
                  {opt.title}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  {opt.desc}
                </div>
              </V2Link>
            );
          })}
        </div>
      </section>
    </DashboardShell>
  );
}
