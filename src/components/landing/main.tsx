import config from "config";
import { useEffect, useState } from "react";
import calculateAge from "utils/calculateAge";

const LandingMain = () => {
    const [age, setAge] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setAge(calculateAge(config.dob).toFixed(10));
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="max-w-[1000px] w-full min-h-screen mx-auto py-[10vh]"
        >
            <p className="w-full text-center text-[40px] font-medium pt-[10vh]">
                Hi 👋, I'm Artiom
            </p>
            <p className="w-full text-center text-[20px] font-light resp:text-[18px]">
                I'm just a <span className="font-mono">{age}</span> year old
                developer
            </p>
        </section>
    );
};

export default LandingMain;
