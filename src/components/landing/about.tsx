import React from "react";
import Box from "components/Box";

import JsSVG from "assets/svgs/skills/js.svg";
import TsSVG from "assets/svgs/skills/ts.svg";
import CSVG from "assets/svgs/skills/c.svg";
import PySVG from "assets/svgs/skills/py.svg";
import ReactSVG from "assets/svgs/skills/react.svg";
import TailwindSVG from "assets/svgs/skills/tailwind.svg";
import TensorflowSVG from "assets/svgs/skills/tensorflow.svg";
import GitSVG from "assets/svgs/skills/git.svg";

const headers = [
    {
        id: "aboutme",
        name: "About Me",
    },
    {
        id: "history",
        name: "History",
    },
    {
        id: "experience",
        name: "Experience",
    },
];

const LandingAboutMeSection = () => {
    return (
        <section
            id="about"
            className="flex flex-col max-w-[1000px] w-[90%] min-h-screen mx-auto"
            style={{ paddingBlock: "calc(max(5vh, 100px))" }}
        >
            <div className="text-4xl font-medium w-full text-center mb-7 custanim-btt">
                About me
            </div>
            <Box className="p-5 h-[60vh] flex custanim-btt">
                <div className="flex w-full overflow-x-hidden resp:flex-col-reverse">
                    <div className="flex-1 resp:flex-none flex flex-col">
                        <div className="flex-1 px-10 py-8 text-2xl resp:px-3 resp:py-2 resp:text-xl resp:hidden">
                            {headers.map((val, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="custanim-ltr, font-light text-gray-500 p-2"
                                        style={{
                                            transitionDelay: `${i * 50}ms`,
                                        }}
                                    >
                                        - {val.name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex p-5 gap-5 flex-wrap justify-center">
                            {[
                                JsSVG,
                                TsSVG,
                                CSVG,
                                PySVG,
                                ReactSVG,
                                TailwindSVG,
                                TensorflowSVG,
                                GitSVG,
                            ].map((el, i) => {
                                return (
                                    <img
                                        className="h-13 resp:h-10 custanim-ltr"
                                        style={{
                                            transitionDelay: `${i * 50}ms`,
                                        }}
                                        key={i}
                                        src={el}
                                        alt={i.toString()}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-scroll">
                        <div className="min-h-screen">text test</div>
                    </div>
                </div>
            </Box>
        </section>
    );
};

export default LandingAboutMeSection;
