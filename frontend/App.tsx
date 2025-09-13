import Header from "@/components/Header";
import AboutMe from "./components/AboutMe";
import RoadMap from "./components/RoadMap";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div className="overflow-hidden">
      <Header />
      <main className="px-6 mx-auto max-w-[1200px]">
        <section
          id="about"
          className="w-full min-h-screen py-35 flex-center max-w-[900px] mx-auto"
        >
          <AboutMe />
        </section>
        <section id="roadmap" className="w-full">
          <RoadMap />
        </section>
        <section id="projects" className="min-h-screen">
          <Projects />
        </section>
        <section id="contact" className="h-screen"></section>
      </main>
    </div>
  );
}
