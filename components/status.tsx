import { AlertTriangle, Loader2 } from 'lucide-react'

/** Skeleton block used while data loads. */
export function LoadingCard({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg border border-border bg-card/40 ${className ?? 'h-28'}`}
    />
  )
}

export function InlineLoader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin text-primary" />
      {label}
    </div>
  )
}

/** Non-blocking notice shown when the API failed and fallback data is used. */
export function FallbackNotice({ message }: { message: string }) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
