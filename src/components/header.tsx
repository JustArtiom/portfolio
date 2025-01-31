import { useEffect, useState } from "react";
import React from "react";

const navItems = [
    { name: "Home", href: "#", id: "main" },
    { name: "About Me", href: "#about", id: "about" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact Me", href: "#contact", id: "contact" },
];

export default function Header() {
    const [currentSection, setCurrentSection] = useState("main");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((link) =>
                document.getElementById(link.id)
            );

            sections.forEach((section) => {
                if (!section) return;
                if (window.scrollY >= section.offsetTop - 200) {
                    setCurrentSection(section.id);
                }
            });
        };

        const handleResize = () => {
            handleSetSubline();
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSetSubline = () => {
        const activeNav = document.getElementById(`nav_${currentSection}`);
        if (activeNav) {
            const { left, width } = activeNav.getBoundingClientRect();
            setIndicatorStyle({ left: left - 10, width: width + 20 });
        }
    };

    useEffect(() => {
        handleSetSubline();
    }, [currentSection, indicatorStyle]);

    return (
        <header className="fixed w-full text-primary bg-primary z-50 px-[50px]">
            <div className="flex w-full max-w-[1000px] h-[60px] mx-auto px-5 justify-between items-center">
                <div className="text-center text-2xl font-semibold select-none">
                    Artiom
                </div>

                <nav className="flex gap-x-6">
                    <div
                        className="absolute bottom-0 h-[3px] bg-[var(--primary-color)] transition-all duration-300 rounded-md"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`,
                        }}
                    ></div>
                    {navItems
                        .filter((nav) => nav.id !== "contact")
                        .map((nav, i) => (
                            <a
                                key={i}
                                id={`nav_${nav.id}`}
                                href={nav.href}
                                className="px-2 py-1.5 text-sm rounded-sm"
                            >
                                {nav.name}
                            </a>
                        ))}
                </nav>

                {navItems
                    .filter((nav) => nav.id === "contact")
                    .map((nav, i) => (
                        <a
                            key={i}
                            id={`nav_${nav.id}`}
                            href={nav.href}
                            className="text-sm font-semibold py-1.5 px-2 rounded-sm"
                        >
                            {nav.name}
                        </a>
                    ))}
            </div>
        </header>
    );
}
function setIndicatorStyle(arg0: { left: number; width: number }) {
    throw new Error("Function not implemented.");
}
