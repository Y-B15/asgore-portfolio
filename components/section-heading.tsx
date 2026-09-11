import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index: string
  title: string
  description?: string
  className?: string
}

/** Shared section header with a mono index tag for the technical aesthetic. */
export function SectionHeading({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 max-w-2xl', className)}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
        <span className="text-muted-foreground">{index}</span> // {title}
      </p>
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
