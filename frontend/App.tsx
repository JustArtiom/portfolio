import Header from "@/components/Header";
import AboutMe from "./components/AboutMe";

export default function App() {
  return (
    <>
      <Header />
      <main className="px-6 mx-auto max-w-[1000px]">
        <section id="about" className="w-full min-h-screen py-25 flex-center">
          <AboutMe />
        </section>
        <section id="roadmap" className="h-screen"></section>
        <section id="projects" className="h-screen"></section>
        <section id="contact" className="h-screen"></section>
      </main>
    </>
  );
}
