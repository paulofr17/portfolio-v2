import { useSectionScroll } from "@hooks/useSectionScroll"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
] as const

export function Footer() {
  const { scrollToSection } = useSectionScroll()

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-display text-sm font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-gradient" />
            Paulo Ribeiro
          </div>
          <div className="flex items-center gap-2">
            <a
              href="mailto:paulofr17@gmail.com"
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition hover:border-border-hover hover:text-fg"
            >
              <MdOutlineEmail size={18} />
            </a>
            <a
              href="https://linkedin.com/in/paulo-ribeiro17/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition hover:border-border-hover hover:text-fg"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="https://github.com/paulofr17/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition hover:border-border-hover hover:text-fg"
            >
              <FaGithub size={16} />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={scrollToSection(link.id)}
              className="text-sm text-fg-muted transition hover:text-fg"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <p className="font-mono text-xs text-fg-subtle">
          © {new Date().getFullYear()} — Built with React &amp; Tailwind
        </p>
      </div>
    </footer>
  )
}
