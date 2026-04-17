import { useSectionScroll } from "@hooks/useSectionScroll"
import { fadeUp, stagger, viewportOnce } from "@/lib/motion"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"

const SITEMAP_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
] as const

const CONNECT_LINKS = [
  {
    label: "Email",
    href: "mailto:paulofr17@gmail.com",
    icon: MdOutlineEmail,
    external: false
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/paulo-ribeiro17/",
    icon: FaLinkedin,
    external: true
  },
  {
    label: "GitHub",
    href: "https://github.com/paulofr17/",
    icon: FaGithub,
    external: true
  }
] as const

const columnHeadingClass = "font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle"
const linkClass =
  "group inline-flex items-center gap-2 text-sm text-fg-muted transition hover:text-fg"

export function Footer() {
  const { scrollToSection } = useSectionScroll()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10 sm:py-16 lg:px-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_1fr]"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <h2 className="text-gradient font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s build something great together.
            </h2>
            <button
              type="button"
              onClick={scrollToSection("contact")}
              className="group inline-flex w-fit items-center gap-2 font-display text-sm font-medium text-fg transition hover:text-fg"
            >
              <span className="bg-brand-gradient bg-clip-text text-transparent">Get in touch</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h3 className={columnHeadingClass}>Sitemap</h3>
              <ul className="flex flex-col gap-3">
                {SITEMAP_LINKS.map((link) => (
                  <li key={link.id}>
                    <button type="button" onClick={scrollToSection(link.id)} className={linkClass}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h3 className={columnHeadingClass}>Connect</h3>
              <ul className="flex flex-col gap-3">
                {CONNECT_LINKS.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={linkClass}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      <Icon size={14} className="opacity-60 transition group-hover:opacity-100" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col-reverse items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-fg-subtle">
            © {new Date().getFullYear()} Paulo Ribeiro
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition hover:border-border-hover hover:text-fg"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
