import Header from "@/components/Header";
import AboutMe from "./components/AboutMe";

export default function App() {
  return (
    <>
      <Header />
      <main className="px-6 mx-auto max-w-[1000px]">
        <section id="about" className="w-full min-h-[80vh] py-25 flex-center">
          <AboutMe />
        </section>
      </main>
    </>
  );
}
