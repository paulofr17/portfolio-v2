import { motion } from "framer-motion"
import { fadeUp, viewportOnce } from "@/lib/motion"

type SectionHeadingProps = {
  number: string
  eyebrow: string
  title: string
  align?: "left" | "center"
}

export function SectionHeading({ number, eyebrow, title, align = "center" }: SectionHeadingProps) {
  const isCenter = align === "center"

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`flex flex-col gap-3 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg-subtle">
        <span className="text-gradient font-semibold">{number}</span>
        <span className="h-px w-8 bg-border" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <span className="h-px w-16 bg-brand-gradient" />
    </motion.div>
  )
}
