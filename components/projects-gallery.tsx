'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { ArrowUpRight, Code2, Users } from 'lucide-react'
import {
  apiFetcher,
  FALLBACK_PROJECTS,
  type Project,
  type ProjectCategory,
} from '@/lib/api'
import { SectionHeading } from '@/components/section-heading'
import { LoadingCard } from '@/components/status'
import { cn } from '@/lib/utils'

type Filter = 'all' | ProjectCategory

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'development', label: 'Development' },
  { value: 'community', label: 'Community' },
]

function ProjectCard({ project }: { project: Project }) {
  const isDev = project.category === 'development'
  const CategoryIcon = isDev ? Code2 : Users
  const accentText = isDev ? 'text-primary' : 'text-accent'
  const accentBorder = isDev
    ? 'hover:border-primary/50'
    : 'hover:border-accent/50'

  const Wrapper = project.url ? 'a' : 'div'
  const linkProps = project.url
    ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      {...linkProps}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1',
        accentBorder,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider',
            accentText,
          )}
        >
          <CategoryIcon className="size-3.5" />
          {project.category}
        </span>
        {project.url && (
          <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        )}
      </div>

      <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border bg-muted/50 px-2 py-1 font-mono text-[0.7rem] text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const { data, error, isLoading } = useSWR<Project[]>(
    '/projects',
    apiFetcher,
    { shouldRetryOnError: false },
  )

  const usingFallback = !!error || (!isLoading && (!data || data.length === 0))
  const projects = usingFallback ? FALLBACK_PROJECTS : (data ?? [])

  const visible =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          title="Projects Gallery"
          description="A selection of shipped work spanning backend engineering and community infrastructure."
        />

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                'rounded-md border px-4 py-2 font-mono text-sm transition-all',
                filter === f.value
                  ? 'border-primary/50 bg-primary/10 text-primary glow-primary'
                  : 'border-border bg-card/40 text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} className="h-56" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <p className="rounded-lg border border-border bg-card/40 p-10 text-center font-mono text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
