import { GitBranch, MessageCircle, Terminal } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="grid size-7 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary">
            <Terminal className="size-3.5" />
          </span>
          <span className="text-muted-foreground">
            <span className="text-primary">dev</span>
            <span>/</span>
            <span className="text-accent">guild</span>
          </span>
        </div>

        <p className="text-center font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Built with Next.js · Deployed on Vercel
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Y-B15/asgore-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source code"
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <GitBranch className="size-4" />
          </a>
          <a
            href="#contact"
            aria-label="Discord / contact"
            className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <MessageCircle className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
