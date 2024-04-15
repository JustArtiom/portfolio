import React from "react";
import Header from "components/header";

function App() {
    return (
        <div>
            <Header />
            <div id="home" className="w-full h-[100vh]"></div>
            <div id="aboutme" className="w-full h-[100vh]"></div>
            <div id="projects" className="w-full h-[100vh]"></div>
            <div id="contactme" className="w-full h-[100vh]"></div>
        </div>
    );
}

export default App;
