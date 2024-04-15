import React, { useState, useEffect } from "react";

function Header() {
    const [currentSection, setCurrentSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    current = section.id;
                }
            });

            console.log(current);
            setCurrentSection(current);
        };

        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed w-full h-[72px] bg-background flex">
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
                            "px-2 py-1.5 mx-2 text-sm rounded-lg bg-primary " +
                            (false ? "bg-primary text-black" : "") // True if the user is in the right section
                        }
                    >
                        {l.t}
                    </a>
                ))}
            </div>
            <div className="flex-1">Contact me</div>
        </div>
    );
}

export default Header;
