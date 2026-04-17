import { motion } from "framer-motion"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { SectionHeading } from "./SectionHeading"

type Role = {
  title: string
  company: string
  period: string
  bullets: string[]
}

const ROLES: Role[] = [
  {
    title: "Salesforce Developer",
    company: "Accenture",
    period: "2021 — Present",
    bullets: [
      "Developing custom user interfaces with Visualforce Pages and Lightning Web Components",
      "Writing unit tests and performing code reviews to ensure quality and stability",
      "Implementing complex business logic, triggers, batch processes and integrations with Apex",
      "Partnering with stakeholders to gather and translate business requirements into technical specifications"
    ]
  },
  {
    title: "Data Scientist — Internship",
    company: "Celfocus",
    period: "2020 — 2021",
    bullets: [
      "Collaborated with the QA team to integrate AI models into existing toolsets",
      "Built a plugin to automate the identification and classification of vulnerabilities in authentication cookies"
    ]
  }
]

function BulletArrow() {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className="mt-[6px] h-3 w-3 flex-shrink-0">
      <path
        d="M3 1l5 5-5 5"
        stroke="url(#arrow-grad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="arrow-grad" x1="0" y1="0" x2="12" y2="12">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--accent-2))" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Experience() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-14">
      <SectionHeading number="02" eyebrow="Experience" title="Where I've been building" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-5"
      >
        {ROLES.map((role) => (
          <motion.article
            key={role.title}
            variants={fadeUp}
            className="group rounded-xl border border-border bg-bg-elevated p-6 transition hover:border-border-hover hover:shadow-glow-sm md:p-8"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl font-semibold text-fg">{role.title}</h3>
                <p className="text-sm font-medium text-fg-muted">{role.company}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                {role.period}
              </span>
            </div>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-fg-muted">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <BulletArrow />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
