import SneakersStore from "@assets/sneakers_store.png"
import Spickles from "@assets/spickles.png"
import TaskManager from "@assets/task_manager.png"

export type Project = {
  name: string
  description: string
  technologies: string[]
  image: string
  github: string
  liveView: string
}

export const projectsPortfolio: Project[] = [
  {
    name: "Task Manager",
    description: `Task Manager is an app designed to help users organize, prioritize, and accomplish their
      tasks efficiently. With its intuitive interface and comprehensive suite of features, it
      simplifies task management, boost productivity, and empower users to achieve their goals
      effectively.`,
    technologies: ["Next", "React", "Tailwind", "Prisma", "MongoDB"],
    image: TaskManager,
    github: "https://github.com/paulofr17/task-manager/",
    liveView: "https://task--manager.vercel.app/"
  },
  {
    name: "Sneakers Store",
    description: `Sneakers Store is an ecommerce website that showcases a collection of sneakers from leading brands. It offers the functionality and feel of a 
      real ecommerce platform, with features such as authentication, product filtering, and cart/orders management. It also has an admin dashboard 
      where administrators can manage products and orders.`,
    technologies: ["Next", "React", "Tailwind", "Prisma", "NodeJS", "PostgreSQL"],
    image: SneakersStore,
    github: "https://github.com/paulofr17/task-manager/",
    liveView: "https://sneakers--store.vercel.app/"
  },
  {
    name: "Spickles",
    description: `Spickles is a website created in the context of an university project, aimed at simplifying the dilemma of choosing what movie to 
       watch with friends. We developed a mobile application that allows users to create a room, invite friends, and vote on the movie they want to watch.
       This website is a complement to the mobile application, where users can see how the application works and have the links to download it.`,
    technologies: ["React", "AntDesign"],
    image: Spickles,
    github: "",
    liveView: "https://spickles.vercel.app/"
  }
]
