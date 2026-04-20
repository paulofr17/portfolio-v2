import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ease } from "@/lib/motion"

type LightboxProps = {
  images: string[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
  projectName: string
}

const SWIPE_OFFSET = 100
const SWIPE_VELOCITY = 500

export function Lightbox({ images, initialIndex, isOpen, onClose, projectName }: LightboxProps) {
  const prefersReducedMotion = useReducedMotion()
  const [[index, direction], setPage] = useState<[number, number]>([initialIndex, 0])
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const total = images.length
  const hasMultiple = total > 1

  useEffect(() => {
    if (isOpen) setPage([initialIndex, 0])
  }, [isOpen, initialIndex])

  const paginate = useCallback(
    (step: number) => {
      setPage(([current]) => [(current + step + total) % total, step])
    },
    [total]
  )

  const next = useCallback(() => paginate(1), [paginate])
  const prev = useCallback(() => paginate(-1), [paginate])

  useEffect(() => {
    if (!isOpen) return

    const lastFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    const prevTouch = document.body.style.touchAction
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.touchAction = prevTouch
      window.clearTimeout(focusTimer)
      lastFocused?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      } else if (hasMultiple && e.key === "ArrowRight") {
        e.preventDefault()
        next()
      } else if (hasMultiple && e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, hasMultiple, next, prev, onClose])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!hasMultiple) return
    if (info.offset.x < -SWIPE_OFFSET || info.velocity.x < -SWIPE_VELOCITY) next()
    else if (info.offset.x > SWIPE_OFFSET || info.velocity.x > SWIPE_VELOCITY) prev()
  }

  const reduced = Boolean(prefersReducedMotion)

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reduced ? 0.15 : 0.3, ease } },
    exit: { opacity: 0, transition: { duration: reduced ? 0.15 : 0.25, ease } }
  }

  const frameVariants = {
    hidden: { opacity: 0, scale: reduced ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: reduced ? 0.15 : 0.4, ease } },
    exit: {
      opacity: 0,
      scale: reduced ? 1 : 0.97,
      transition: { duration: reduced ? 0.15 : 0.25, ease }
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: reduced ? 0 : dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: reduced ? 0.15 : 0.35, ease } },
    exit: (dir: number) => ({
      x: reduced ? 0 : dir > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: reduced ? 0.15 : 0.25, ease }
    })
  }

  const navButtonClasses =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated/70 text-fg-muted backdrop-blur-md transition duration-200 hover:scale-[1.08] hover:border-border-hover hover:text-fg hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} gallery`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={backdropVariants}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
            aria-hidden="true"
          />

          <motion.div
            variants={frameVariants}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full max-w-[1920px] flex-col items-center justify-center gap-5"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated/70 text-fg-muted backdrop-blur-md transition duration-200 hover:scale-[1.08] hover:border-border-hover hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:right-4 sm:top-4"
            >
              <X size={18} />
            </button>

            {hasMultiple && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className={`${navButtonClasses} absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 lg:inline-flex`}
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
              <AnimatePresence custom={direction} mode="wait" initial={false}>
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={`${projectName} screenshot ${index + 1} of ${total}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={hasMultiple ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[78vh] max-w-full cursor-grab touch-pan-y select-none rounded-xl object-contain shadow-2xl active:cursor-grabbing"
                />
              </AnimatePresence>
            </div>

            {hasMultiple && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className={`${navButtonClasses} absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:inline-flex`}
              >
                <ChevronRight size={20} />
              </button>
            )}

            {hasMultiple && (
              <div className="flex items-center gap-4 lg:gap-0">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className={`${navButtonClasses} lg:hidden`}
                >
                  <ChevronLeft size={20} />
                </button>

                <div
                  role="tablist"
                  aria-label="Gallery progress"
                  className="flex items-center gap-2 lg:mx-0"
                >
                  {images.map((_, i) => {
                    const active = i === index
                    return (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => setPage([i, i > index ? 1 : -1])}
                        className={`h-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                          active
                            ? "w-10 bg-brand-gradient shadow-glow-sm"
                            : "w-6 bg-border hover:bg-border-hover"
                        }`}
                      />
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className={`${navButtonClasses} lg:hidden`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            <span aria-live="polite" className="sr-only">
              {`Image ${index + 1} of ${total}`}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === "undefined") return null
  return createPortal(modal, document.body)
}
