import { useState } from "react";
import navlink_style from "styles/navlink_style";
import ThemeTogglerButton from "./themeToggler";

const nav_links = [
    { id: "home", title: "Home" },
    { id: "about", title: "About Me" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
];

const Header = () => {
    const [currentSection, setCurrentSection] = useState("home");

    return (
        <div className="fixed w-full bg-BgColor dark:bg-DarkBgColor">
            <div className="flex w-full max-w-[1000px] h-[72px] mx-auto px-5">
                <div className="flex-1 grid items-center">
                    <p className="text-center text-2xl font-semibold shadow-neon">
                        Artiom
                    </p>
                </div>
                <div className="flex-1 flex items-center justify-center min-w-[450px] resp:hidden">
                    {nav_links.map((nav) => (
                        <a
                            key={nav.id}
                            href={`#${nav.id}`}
                            onClick={() => {
                                setCurrentSection(nav.id);
                            }}
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
