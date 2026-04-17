import { motion } from "framer-motion"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { useState } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { SectionHeading } from "./SectionHeading"

const EMAIL = "paulofr17@gmail.com"

type ContactCardProps = {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  action?: React.ReactNode
  external?: boolean
}

function ContactCard({ icon, label, value, href, action, external }: ContactCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-4 rounded-xl border border-border bg-bg-elevated p-6 transition hover:-translate-y-1 hover:border-border-hover hover:shadow-glow-sm md:p-7"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-2/20 text-fg">
          {icon}
        </div>
        {action ? (
          <div className="relative z-10">{action}</div>
        ) : (
          <ArrowUpRight className="h-5 w-5 text-fg-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle">{label}</span>
        <span className="break-all text-sm font-medium text-fg md:text-base">{value}</span>
      </div>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-label={`${label}: ${value}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
    </motion.div>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14">
      <SectionHeading number="04" eyebrow="Contact" title="Let's get in touch" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ContactCard
          icon={<MdOutlineEmail size={22} />}
          label="Email"
          value={EMAIL}
          href={`mailto:${EMAIL}`}
          action={
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy email to clipboard"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted transition hover:border-border-hover hover:text-fg"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          }
        />
        <ContactCard
          icon={<FaLinkedin size={22} />}
          label="LinkedIn"
          value="linkedin.com/in/paulo-ribeiro17"
          href="https://linkedin.com/in/paulo-ribeiro17/"
          external
        />
        <ContactCard
          icon={<FaGithub size={22} />}
          label="GitHub"
          value="github.com/paulofr17"
          href="https://github.com/paulofr17/"
          external
        />
      </motion.div>
    </div>
  )
}
