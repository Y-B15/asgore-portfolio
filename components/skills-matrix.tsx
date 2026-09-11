'use client'

import useSWR from 'swr'
import { Cpu, Users } from 'lucide-react'
import {
  apiFetcher,
  FALLBACK_SKILLS,
  type Skill,
  type SkillCategory,
} from '@/lib/api'
import { SectionHeading } from '@/components/section-heading'
import { LoadingCard } from '@/components/status'

function SkillBar({
  skill,
  accent,
}: {
  skill: Skill
  accent: 'primary' | 'accent'
}) {
  const barColor = accent === 'primary' ? 'bg-primary' : 'bg-accent'
  const textColor = accent === 'primary' ? 'text-primary' : 'text-accent'
  return (
    <li className="space-y-2">
      <div className="flex items-center justify-between font-mono text-sm">
        <span className="text-foreground">{skill.name}</span>
        <span className={textColor}>{skill.level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${barColor} transition-[width] duration-700`}
          style={{ width: `${Math.min(Math.max(skill.level, 0), 100)}%` }}
        />
      </div>
    </li>
  )
}

function CategoryCard({
  title,
  subtitle,
  icon,
  skills,
  accent,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  skills: Skill[]
  accent: 'primary' | 'accent'
}) {
  const ring = accent === 'primary' ? 'border-primary/30' : 'border-accent/30'
  const iconBg =
    accent === 'primary'
      ? 'bg-primary/10 text-primary border-primary/40'
      : 'bg-accent/10 text-accent border-accent/40'
  return (
    <div className={`rounded-xl border ${ring} bg-card/60 p-6 backdrop-blur`}>
      <div className="mb-6 flex items-center gap-3">
        <span
          className={`grid size-10 place-items-center rounded-md border ${iconBg}`}
        >
          {icon}
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{title}</h3>
          <p className="font-mono text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-4">
        {skills.map((skill) => (
          <SkillBar key={skill.id} skill={skill} accent={accent} />
        ))}
      </ul>
    </div>
  )
}

export function SkillsMatrix() {
  const { data, error, isLoading } = useSWR<Skill[]>('/skills', apiFetcher, {
    shouldRetryOnError: false,
  })

  // Use live data when available, otherwise fall back to bundled data.
  const usingFallback = !!error || (!isLoading && (!data || data.length === 0))
  const skills = usingFallback ? FALLBACK_SKILLS : (data ?? [])

  const engineering = skills.filter(
    (s) => s.category === ('engineering' as SkillCategory),
  )
  const community = skills.filter(
    (s) => s.category === ('community' as SkillCategory),
  )

  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="01"
          title="Skills Matrix"
          description="Two complementary skill trees — engineering the systems, and running the communities that live on top of them."
        />

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <LoadingCard className="h-80" />
            <LoadingCard className="h-80" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryCard
              title="IT & Software Engineering"
              subtitle="Building the systems"
              icon={<Cpu className="size-5" />}
              skills={engineering}
              accent="primary"
            />
            <CategoryCard
              title="Community & Discord Operations"
              subtitle="Running the communities"
              icon={<Users className="size-5" />}
              skills={community}
              accent="accent"
            />
          </div>
        )}
      </div>
    </section>
  )
}
