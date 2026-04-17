import { useCallback, useEffect, useState } from "react"

type Theme = "dark" | "light"

const STORAGE_KEY = "theme"

function readInitial(): Theme {
  if (typeof document === "undefined") return "dark"
  const attr = document.documentElement.getAttribute("data-theme")
  return attr === "light" ? "light" : "dark"
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  return { theme, toggle }
}
