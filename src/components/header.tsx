import React, { useState, useEffect } from "react";

function Header() {
    const [currentSection, setCurrentSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (
                    window.scrollY + window.innerHeight/3 >= sectionTop &&
                    window.scrollY + window.innerHeight/3 < sectionTop + sectionHeight
                ) {
                    current = section.id;
                }
            });

            setCurrentSection(current);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed w-full h-[72px] flex bg-background z-1">
            <div className="flex max-w-[1500px] h-full w-full m-auto">
                <div className="flex-1 grid items-center">
                    <p
                        style={{
                            textShadow: "0 0 10px #FF9F9F",
                        }}
                        className="text-center text-2xl font-semibold shadow-neon"
                    >
                        Artiom
                    </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    {[
                        { t: "Home", h: "#home" },
                        { t: "About Me", h: "#aboutme" },
                        { t: "Projects", h: "#projects" },
                        { t: "Get In Touch", h: "#contactme" },
                    ].map((l) => (
                        <a
                            key={l.h}
                            href={l.h}
                            className={
                                "px-2 py-1.5 mx-3 text-sm rounded-md " +
                                (currentSection === l.h.substring(1) ? "bg-primary text-black hover:bg-primaryHover hover:text-white" : "hover:bg-secondary")
                            }
                        >
                            {l.t}
                        </a>
                    ))}
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <button className="p-2 py-1.5 bg-white text-black rounded-md text-sm shadow-mainShadow shadow-primary hover:bg-gray-400">Contact me</button>
                </div>
            </div>
        </div>

    );
}

export default Header;
