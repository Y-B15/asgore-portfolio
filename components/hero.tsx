import { ArrowRight, Code2, Users } from 'lucide-react'

/** Landing hero highlighting the dual C# dev + Discord operations expertise. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      {/* Grid backdrop + soft accent glows (decorative). */}
      <div aria-hidden className="cyber-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -left-24 top-24 size-72 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-24 bottom-16 size-72 rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          IT Student @ ESTSB · Community &amp; Discord Manager
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Building software with{' '}
          <span className="text-primary text-glow-primary">C#</span> &amp;
          architecting{' '}
          <span className="text-accent text-glow-accent">
            thriving communities
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          I engineer backends with ASP.NET Core and SQL by day, and design
          resilient Discord guild architectures with bots, events and
          moderation systems by night. Two disciplines, one systems mindset.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:glow-primary"
          >
            View Projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-6 py-3 font-mono text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-accent/50 hover:text-accent"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-16 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card/50 p-5 backdrop-blur">
            <Code2 className="size-6 text-primary" />
            <h3 className="mt-3 font-semibold">Software Development</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              C# · ASP.NET Core · SQL · Git
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/50 p-5 backdrop-blur">
            <Users className="size-6 text-accent" />
            <h3 className="mt-3 font-semibold">Community Operations</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Guild Architecture · Bots · Events
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
