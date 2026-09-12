import { V2Link } from "@/v2/lib/router";
import { ArrowLeft, Clock, Image as ImageIcon } from "lucide-react";
import { DashboardShell, TopHeaderBar } from "@/v2/components/dashboard-shell";
import { Button } from "@/v2/components/ui/button";
import { ARTICLES } from "@/v2/data/articles";

export default ArticlesIndex;
function ArticlesIndex() {
  return (
    <DashboardShell
      header={
        <TopHeaderBar
          title="Articles & Insights 📚"
          emoji=""
          subtitle="Expert perspectives to help you understand yourself and grow."
        />
      }
    >
      <div className="space-y-6">
        {/* Back to Resources */}
        <div>
          <Button
            asChild
            variant="ghost"
            className="rounded-full text-sm font-semibold text-primary hover:bg-white/60 hover:text-primary"
          >
            <V2Link to="/resources" className="inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back to Resources
            </V2Link>
          </Button>
        </div>

        {/* Header */}
        <header className="rounded-3xl bg-gradient-to-br from-lavender/60 via-white to-aqua/40 p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Growth Library
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Articles &amp; Insights
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Expert-written ideas and practical perspectives designed to support everyday growth -
            read at your own pace.
          </p>
        </header>

        {/* Vertical list: one below another */}
        <section>
          <div className="flex flex-col gap-5">
            {ARTICLES.map((a) => (
              <article
                key={a.slug}
                className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white/95 shadow-soft border border-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                <V2Link
                  to={`/articles/${a.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={a.title}
                />
                <div className="relative aspect-[16/9] md:aspect-auto md:w-72 md:shrink-0 overflow-hidden bg-gradient-mint flex items-center justify-center">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-[50%_38%] transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-primary/40" strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-lavender/50 px-2.5 py-1 font-semibold text-primary">
                        {a.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> {a.time}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg md:text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {a.cardTitle || a.title}
                    </h2>
                    {a.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {a.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-muted/20 md:border-0 md:pt-0">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Read Article &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
