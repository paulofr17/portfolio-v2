import { motion } from "framer-motion"
import type { Project } from "@models/types"
import { AiFillGithub } from "react-icons/ai"
import { FaExternalLinkAlt } from "react-icons/fa"
import { fadeUp, viewportOnce } from "@/lib/motion"

export function Project({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`flex flex-col-reverse items-center gap-8 md:gap-12 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="group relative w-full flex-1">
        <div className="absolute -inset-0.5 rounded-2xl bg-brand-gradient opacity-0 blur-md transition duration-500 group-hover:opacity-40" />
        <div className="ring-gradient relative overflow-hidden rounded-2xl">
          <img
            alt={project.name}
            src={project.image}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col gap-5 text-center md:max-w-md md:text-left">
        <span className="font-mono text-xs uppercase tracking-widest text-fg-subtle md:order-none">
          Project 0{index + 1}
        </span>
        <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">{project.name}</h3>
        <p className="text-sm leading-relaxed text-fg-muted md:text-base">{project.description}</p>
        <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {project.github && (
            <a
              target="_blank"
              href={project.github}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-4 py-2 text-sm font-semibold text-fg transition hover:border-border-hover"
            >
              <AiFillGithub size={18} />
              <span>Code</span>
            </a>
          )}
          <a
            target="_blank"
            href={project.liveView}
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow"
          >
            <span>Live View</span>
            <FaExternalLinkAlt size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
