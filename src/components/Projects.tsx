import { Project } from "@components/Project"
import { projectsPortfolio } from "@models/types"
import { SectionHeading } from "./SectionHeading"

export function Projects() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
      <SectionHeading number="03" eyebrow="Projects" title="Selected work" />
      <div className="flex flex-col gap-20 md:gap-28">
        {projectsPortfolio.map((project, index) => (
          <Project key={project.name} index={index} project={project} />
        ))}
      </div>
    </div>
  )
}
