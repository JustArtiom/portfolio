import { useEffect, useState } from "react";
import MoonSvg from "assets/svgs/icons/moon.svg";
import SunSvg from "assets/svgs/icons/sun.svg";

const ThemeTogglerButton = () => {
    const [darkMode, setDarkMode] = useState(
        window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    const handleToggle = () => {
        setDarkMode((a) => !a);
    };

    return (
        <div onClick={handleToggle} className="relative w-5 h-5">
            <img
                src={MoonSvg}
                alt="moon"
                style={
                    darkMode
                        ? { opacity: 1, display: "block" }
                        : { display: "none" }
                }
            />
            <img
                src={SunSvg}
                alt="sun"
                style={
                    darkMode
                        ? { opacity: 0, display: "none" }
                        : { opacity: 1, display: "block" }
                }
            />
        </div>
    );
};

export default ThemeTogglerButton;
