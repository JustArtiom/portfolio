import React from "react";
import Header from "components/header";
import MouseShadow from "components/mouseShadow";
function App() {
    return (
        <MouseShadow>
            <Header />
            <section id="home" className="w-full h-[100vh]"></section>
            <section id="aboutme" className="w-full h-[100vh]">about me section</section>
            <section id="projects" className="w-full h-[100vh]"> projects section</section>
            <section id="contactme" className="w-full h-[100vh]">form/contact me section</section>
        </MouseShadow>
    );
}

export default App;
