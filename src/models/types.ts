const projectImages = import.meta.glob<string>("../assets/projects/*/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  import: "default"
})

function imagesForProject(slug: string): string[] {
  return Object.entries(projectImages)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src)
}

export type Project = {
  slug: string
  name: string
  description: string
  technologies: string[]
  github: string
  liveView: string
  images: string[]
}

export const projectsPortfolio: Project[] = [
  {
    slug: "fcar222",
    name: "FCAR 222",
    description: `FCAR222 is a professional automotive platform that combines a public catalog with a back-office 
      for real-time inventory management. Built for speed and SEO, the entire ecosystem features 
      a responsive design that ensures a premium user experience across all devices.`,
    technologies: ["React", "Tailwind", "Supabase"],
    github: "",
    liveView: "https://fcar222.pt/",
    images: imagesForProject("fcar222")
  },
  {
    slug: "task_manager",
    name: "Task Manager",
    description: `Task Manager is an app designed to help users organize, prioritize, and accomplish their
      tasks efficiently. With its intuitive interface and comprehensive suite of features, it
      simplifies task management, boost productivity, and empower users to achieve their goals
      effectively.`,
    technologies: ["Next", "React", "Tailwind", "Prisma", "MongoDB"],
    github: "https://github.com/paulofr17/task-manager/",
    liveView: "https://task--manager.vercel.app/",
    images: imagesForProject("task_manager")
  },
  {
    slug: "sneakers_store",
    name: "Sneakers Store",
    description: `Sneakers Store is an ecommerce website that showcases a collection of sneakers from leading brands. It offers the functionality and feel of a
      real ecommerce platform, with features such as authentication, product filtering, and cart/orders management. It also has an admin dashboard
      where administrators can manage products and orders.`,
    technologies: ["Next", "React", "Tailwind", "Prisma", "NodeJS", "PostgreSQL"],
    github: "https://github.com/paulofr17/task-manager/",
    liveView: "https://sneakers--store.vercel.app/",
    images: imagesForProject("sneakers_store")
  },
  {
    slug: "spickles",
    name: "Spickles",
    description: `Spickles is a website created in the context of an university project, aimed at simplifying the dilemma of choosing what movie to
       watch with friends. We developed a mobile application that allows users to create a room, invite friends, and vote on the movie they want to watch.
       This website is a complement to the mobile application, where users can see how the application works and have the links to download it.`,
    technologies: ["React", "AntDesign"],
    github: "",
    liveView: "https://spickles.vercel.app/",
    images: imagesForProject("spickles")
  }
]
