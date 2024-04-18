import React, { useState, useEffect } from "react";
import svg_burger from "styles/burger.svg";

const nav_links = [
    { t: "Home", h: "#home" },
    { t: "About Me", h: "#aboutme" },
    { t: "Projects", h: "#projects" },
];

function Header() {
    const [currentSection, setCurrentSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (
                    window.scrollY + window.innerHeight / 3 >= sectionTop &&
                    window.scrollY + window.innerHeight / 3 <
                        sectionTop + sectionHeight
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div
            className="fixed w-full h-[72px] flex bg-background"
            style={{ zIndex: 999 }}
        >
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
                <div className="flex-1 flex items-center justify-center min-w-[450px] resp:hidden">
                    {nav_links.map((l) => (
                        <a
                            key={l.h}
                            href={l.h}
                            className={
                                "px-2 py-1.5 mx-3 text-sm rounded-md " +
                                (currentSection === l.h.substring(1)
                                    ? "bg-primary text-black hover:bg-primaryDarker hover:text-white"
                                    : "hover:bg-secondary")
                            }
                        >
                            {l.t}
                        </a>
                    ))}
                </div>
                <div className="flex-1 flex justify-center items-center resp:hidden">
                    <a
                        href="#contactme"
                        className="p-2 py-1.5 bg-white text-black rounded-md text-sm shadow-mainShadow shadow-primary hover:bg-gray-400"
                    >
                        Contact me
                    </a>
                </div>
                <div className="hidden flex-1 items-center justify-end resp:flex">
                    <button onClick={toggleMenu}>
                        <img
                            src={svg_burger}
                            width={30}
                            height={30}
                            alt="menu"
                            className="bg-red mr-10"
                        />
                    </button>
                </div>
            </div>
            <div
                style={{
                    height: isMenuOpen ? "auto" : "0",
                }}
                className="absolute top-[72px] w-full bg-background overflow-hidden"
            >
                <div className="flex flex-col items-center py-5">
                    {nav_links.map((x) => (
                        <a key={x.h} href={x.h} className="my-2">
                            {x.t}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;
