import { About } from "@components/About"
import { Background } from "@components/Background"
import { Contact } from "@components/Contact"
import { Experience } from "@components/Experience"
import { Footer } from "@components/Footer"
import { Header } from "@components/Header"
import { Projects } from "@components/Projects"

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <Background />
      <div className="relative mx-auto w-full max-w-[1920px]">
        <Header />
        <main>
          <section id="about" className="scroll-mt-24 px-6 pt-16 sm:px-10 sm:pt-24 lg:px-20">
            <About />
          </section>
          <section id="experience" className="scroll-mt-24 px-6 py-28 sm:px-10 sm:py-36 lg:px-20">
            <Experience />
          </section>
          <section id="projects" className="scroll-mt-24 px-6 py-28 sm:px-10 sm:py-36 lg:px-20">
            <Projects />
          </section>
          <section id="contact" className="scroll-mt-24 px-6 py-28 sm:px-10 sm:py-36 lg:px-20">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
