import { useEffect, useState } from "react";
import navlink_style from "styles/navlink_style";
import ThemeTogglerButton from "./themeToggler";
import config from "config";

const Header = () => {
    const [currentSection, setCurrentSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = config.nav_links.map((link) =>
                document.getElementById(link.id)
            );

            sections.forEach((section) => {
                if (!section) return;
                if (window.scrollY >= section.offsetTop - 200) {
                    setCurrentSection(section.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed w-full backdrop-filter backdrop-blur-2xl z-50">
            <div className="flex w-full max-w-[1000px] h-[72px] mx-auto px-5">
                <div className="flex-1 grid items-center">
                    <a
                        href="#home"
                        className="text-center text-2xl font-semibold shadow-neon select-none cursor-pointer"
                    >
                        Artiom
                    </a>
                </div>
                <div className="flex-1 flex items-center justify-center min-w-[450px] resp:hidden">
                    {config.nav_links.map((nav) => (
                        <a
                            key={nav.id}
                            href={`#${nav.id}`}
                            className={navlink_style({
                                active: currentSection === nav.id,
                            })}
                        >
                            {nav.title}
                        </a>
                    ))}
                </div>
                <div className="flex-1 flex justify-center items-center resp:hidden">
                    <ThemeTogglerButton />
                </div>
            </div>
        </div>
    );
};

export default Header;
