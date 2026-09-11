import { Check } from 'lucide-react'
import { PRICING_TIERS, DEV_PRICING_TIERS, type PricingTier } from '@/lib/api'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-xl border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1',
        tier.featured
          ? 'border-primary/50 glow-primary'
          : 'border-border hover:border-accent/50',
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-6 rounded-full border border-primary/50 bg-primary/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-primary">
          Most popular
        </span>
      )}

      <h3 className="text-lg font-semibold">{tier.name}</h3>
      <p className="mt-1 text-pretty text-sm text-muted-foreground">
        {tier.tagline}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-mono text-sm text-muted-foreground">$</span>
        <span
          className={cn(
            'text-4xl font-bold tracking-tight',
            tier.featured ? 'text-primary' : 'text-foreground',
          )}
        >
          {tier.price}
        </span>
        <span className="font-mono text-sm text-muted-foreground">/ project</span>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check
              className={cn(
                'mt-0.5 size-4 shrink-0',
                tier.featured ? 'text-primary' : 'text-accent',
              )}
            />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={cn(
          'mt-8 rounded-md border px-4 py-2.5 text-center font-mono text-sm font-medium transition-all',
          tier.featured
            ? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:glow-primary'
            : 'border-border bg-card/40 text-foreground hover:border-accent/50 hover:text-accent',
        )}
      >
        Start this tier
      </a>
    </div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          title="Services"
          description="Discord community operations and website development, priced per project. Every build draws on real experience running servers with 1,500+ combined members."
        />

        {/* Group A — Discord community services */}
        <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent">
          Discord &amp; Community
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Group B — Website creation / development services */}
        <h3 className="mb-6 mt-16 font-mono text-sm uppercase tracking-wider text-accent">
          Website Development
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {DEV_PRICING_TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          Custom scope? Reach out and we&apos;ll tailor a plan that fits your project.
        </p>
      </div>
    </section>
  )
}
