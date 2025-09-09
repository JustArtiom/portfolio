import Header from "@/components/Header";
import AboutMe from "./components/AboutMe";
import RoadMap from "./components/RoadMap";

export default function App() {
  return (
    <div className="overflow-hidden">
      <Header />
      <main className="px-6 mx-auto max-w-[1000px]">
        <section id="about" className="w-full min-h-screen py-25 flex-center">
          <AboutMe />
        </section>
        <section id="roadmap" className="w-full">
          <RoadMap />
        </section>
        <section id="projects" className="h-screen"></section>
        <section id="contact" className="h-screen"></section>
      </main>
    </div>
  );
}
