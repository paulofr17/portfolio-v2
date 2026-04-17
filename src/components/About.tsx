import AboutPhoto from "@assets/about_photo.png"
import { motion } from "framer-motion"
import { ArrowUpRight, Download } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { CursorBlinker } from "./CursorBlinker"
import { TextSwitchingAnimation } from "./TextSwitchingAnimation"

const SALESFORCE_SKILLS = [
  "Salesforce Administration",
  "Salesforce Integration",
  "Apex",
  "SOQL",
  "Visualforce",
  "Lightning Web Components",
  "Aura Components"
]

const FULLSTACK_SKILLS = [
  "Next.js",
  "React",
  "Tailwind",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "MySQL",
  "MongoDB"
]

function SkillChips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-fg-muted transition hover:border-border-hover hover:text-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function About() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto flex w-full max-w-5xl flex-col gap-20"
    >
      <div className="flex flex-col items-center gap-10 md:flex-row-reverse md:items-center md:justify-between md:gap-14">
        <motion.div variants={fadeUp} className="relative shrink-0">
          <div className="absolute -inset-3 rounded-full bg-brand-gradient opacity-30 blur-2xl" />
          <div className="ring-gradient relative rounded-full p-[2px]">
            <img
              alt="Paulo Ribeiro"
              src={AboutPhoto}
              className="h-56 w-56 rounded-full object-cover md:h-64 md:w-64 lg:h-72 lg:w-72"
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1 font-mono text-xs text-fg-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="text-fg">Paulo</span> <span className="text-gradient">Ribeiro</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="font-mono text-sm text-fg-muted md:text-base">
            <span className="text-accent-2">&gt;</span>{" "}
            <TextSwitchingAnimation
              texts={["Full Stack Developer", "Salesforce Developer"]}
              delay={1}
            />
            <CursorBlinker />
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-prose text-base leading-relaxed text-fg-muted"
          >
            Software developer based in Portugal, currently crafting solutions in the Salesforce
            ecosystem while exploring the full stack. I care about clean architecture, thoughtful
            interfaces, and shipping work that actually helps people.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href="/CV.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow"
            >
              Download CV
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="https://github.com/paulofr17/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-border-hover"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-bg-elevated p-6 transition hover:border-border-hover md:p-8">
          <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
            Education
          </span>
          <h3 className="font-display text-xl font-semibold text-fg">
            Bachelor&apos;s &amp; Master&apos;s in Computer Science
          </h3>
          <p className="text-sm leading-relaxed text-fg-muted">
            University of Minho. Built a solid foundation across programming languages, algorithms,
            data structures, software engineering, and computer architecture.
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-bg-elevated p-6 transition hover:border-border-hover md:p-8">
          <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle">Focus</span>
          <h3 className="font-display text-xl font-semibold text-fg">What I&apos;m working on</h3>
          <p className="text-sm leading-relaxed text-fg-muted">
            Shipping Salesforce solutions at Accenture by day; sharpening full-stack skills on the
            side — Next.js, React, Prisma and everything in between.
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col gap-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg-subtle">
          <span className="h-px w-8 bg-border" />
          Skills
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg-elevated p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-fg">Salesforce Development</h3>
            <SkillChips items={SALESFORCE_SKILLS} />
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-bg-elevated p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-fg">Full Stack Development</h3>
            <SkillChips items={FULLSTACK_SKILLS} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
