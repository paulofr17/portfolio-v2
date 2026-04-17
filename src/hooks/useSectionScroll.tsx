import { useCallback, useEffect, useRef } from "react"

export function useSectionScroll() {
  const sections = useRef<HTMLElement[]>([])

  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll("section")) as HTMLElement[]
  }, [])

  const scrollToSection = useCallback(
    (sectionName: string) => () => {
      const section = sections.current.find((section) => section.id === sectionName)
      if (section) {
        window.scrollTo({
          top: section.getBoundingClientRect().top + window.scrollY - 72,
          behavior: "smooth"
        })
      }
    },
    []
  )

  return { sections, scrollToSection }
}
