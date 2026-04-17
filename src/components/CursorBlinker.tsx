import { motion } from "framer-motion"

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1]
    }
  }
}

export function CursorBlinker() {
  return (
    <motion.span
      variants={cursorVariants}
      animate="blinking"
      className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent-2 align-middle"
    />
  )
}
