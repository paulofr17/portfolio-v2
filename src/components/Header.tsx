import { useSectionScroll } from "@hooks/useSectionScroll"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { ThemeToggle } from "./ThemeToggle"

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
] as const

export function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { sections, scrollToSection } = useSectionScroll()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)

      let maxVisibleSection: string | null = null
      let maxVisibleArea = 0

      sections.current.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect()
        const visibleArea = Math.min(window.innerHeight, bottom) - Math.max(0, top)
        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea
          maxVisibleSection = section.id
        }
      })

      setActiveSection(maxVisibleSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSidebarLinkClick = useCallback(
    (section: string) => () => {
      setSideBarOpen(false)
      scrollToSection(section)()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled
            ? "h-16 border-b border-border bg-bg-elevated/70 backdrop-blur-xl"
            : "h-20 border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1920px] items-center justify-between px-4 sm:px-10 lg:px-20">
          <button
            type="button"
            onClick={scrollToSection("about")}
            className="group flex items-center gap-2 font-display text-base font-semibold tracking-tight"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-brand-gradient shadow-glow-sm" />
            <span>Paulo Ribeiro</span>
          </button>
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={scrollToSection(item.id)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-border bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              )
            })}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setSideBarOpen((prev) => !prev)}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg sm:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {sideBarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSideBarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-bg-elevated/95 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setSideBarOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted hover:text-fg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="flex flex-col px-4 pt-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={handleSidebarLinkClick(item.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 font-display text-lg transition ${
                          isActive
                            ? "bg-surface text-fg"
                            : "text-fg-muted hover:bg-surface/60 hover:text-fg"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
