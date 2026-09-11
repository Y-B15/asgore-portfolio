import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { SkillsMatrix } from '@/components/skills-matrix'
import { ProjectsGallery } from '@/components/projects-gallery'
import { PricingSection } from '@/components/pricing-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <SkillsMatrix />
        <ProjectsGallery />
        <PricingSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
