import React, { useState } from "react";
import Header from "components/header";
import MouseShadow from "components/mouseShadow";
import Box from "components/box";
import BackgroundElements from "components/background";
import InputField from "components/inputField";

import svg_github from "styles/github.svg";
import svg_instagram from "styles/instagram.svg";
import svg_discord from "styles/discord.svg";
import svg_tiktok from "styles/tiktok.svg";
import svg_mouse from "styles/mouse.svg";

import svg_js from "styles/js.svg";
import svg_ts from "styles/ts.svg";
import svg_py from "styles/py.svg";
import svg_c from "styles/c.svg";
import svg_react from "styles/react.svg";
import svg_tailwind from "styles/tailwind.svg";
import svg_tensorflow from "styles/tensorflow.svg";
import svg_git from "styles/git.svg";
import svg_code from "styles/code.svg";

import svg_lock from "styles/lock.svg";
import svg_chain from "styles/chain.svg";

const projects = [
    {
        name: "ArtiomsHosting Bot",
        description:
            "An advanced discord bot that cooperates together with pterodactyl panel to allow discord users create and control docker containers",
        productionurl: "https://discord.artiom.host",
        sourceurl: "https://github.com/JustArtiom/ArtiomsHosting-Bot",
        bannerurl: "cdn/projects/ah-bot.png",
        languages: [[svg_ts, "typescript"]],
    },
    {
        name: "Time Trekker",
        description:
            "Keep track of your screen time at the PC, an daily average power usage, the apps you had open and the AFK time with just an exe file running the background",
        productionurl: null,
        sourceurl: "https://github.com/JustArtiom/timetrekker",
        bannerurl: "cdn/projects/timetrekker.png",
        languages: [[svg_ts, "typescript"]],
    },
    {
        name: "Text Classifier AI",
        description:
            "A TensorFlow project that lets you train a model to classify text and use it, provided with a pre-trained model and training data example",
        productionurl: null,
        sourceurl: "https://github.com/JustArtiom/text-classifier-ai",
        bannerurl: "cdn/projects/textclassifier.png",
        languages: [[svg_py, "python"]],
    },
    {
        name: "Production Express Template",
        description:
            "Streamline Express API development with file-based routing, advanced error handling, Prisma integration, and TypeScript support. Build scalable and maintainable applications with ease.",
        productionurl: null,
        sourceurl: "https://github.com/JustArtiom/backend-express-template",
        bannerurl: "cdn/projects/expresstemplate.png",
        languages: [[svg_ts, "typescript"]],
    },
    {
        name: "Support Site Back-End",
        description:
            "A Ticketing backend system developed and designed to support the customers of DanBot Hosting made in typescript and python to handle ticket automation (chat bot AI)",
        productionurl: "https://support.danbot.host",
        sourceurl: null,
        bannerurl: "cdn/projects/supportsite.png",
        languages: [
            [svg_py, "python"],
            [svg_ts, "typescript"],
        ],
    },
];

function App() {
    const [formErrors] = useState<
        { type: "error" | "success"; message?: string }[]
    >([
        {
            type: "error",
            message:
                "This feature is not ready yet but it will be, i promise. For now you can convtact me via social media",
        },
    ]);

    const [activeSection, setActiveSection] = useState<string>("whoami");

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const aboutMeDiv = e.currentTarget; // Get the aboutme div that is being scrolled
        const sections = aboutMeDiv.getElementsByTagName("section");
        const scrollPosition =
            aboutMeDiv.scrollTop + aboutMeDiv.offsetHeight / 2;

        let activeSectionId = "";
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop - aboutMeDiv.offsetTop; // Adjust for the offset of the aboutme div
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                activeSectionId = section.id;
                break;
            }
        }

        setActiveSection(activeSectionId);
    };

    const handleFormSubmit = (
        e: React.MouseEvent<HTMLFormElement, MouseEvent>
    ) => {
        e.preventDefault();
    };

    return (
        <>
            <MouseShadow>
                <BackgroundElements />
                <Header />
                <div id="landingpage" className="w-full max-w-[1000px] m-auto">
                    <section
                        id="home"
                        className="w-full h-[100vh] pt-[25vh] flex flex-col"
                    >
                        <p className="w-full text-center text-[40px] resp:text-[30px]">
                            Hi 👋, I'm Artiom
                        </p>
                        <p className="w-full text-center text-[20px] font-thin resp:text-[18px]">
                            Coding, building web apps, exploring AI,
                            contributing to open-source.
                        </p>
                        <div className="flex w-[60%] h-[65px] m-auto my-7 rounded-2xl px-10 resp:px-4 resp:w-[80%] bg-primaryDarker shadow-mainShadow shadow-primary items-center justify-around">
                            {[
                                {
                                    i: svg_github,
                                    url: "https://github.com/JustArtiom",
                                    alt: "github",
                                },
                                {
                                    i: svg_instagram,
                                    url: "https://instagram.com/im_artiom",
                                    alt: "instagram",
                                },
                                {
                                    i: svg_discord,
                                    url: "https://discord.com/users/526191240962768910",
                                    alt: "discord",
                                },
                                {
                                    i: svg_tiktok,
                                    url: "https://www.tiktok.com/@justartiom",
                                    alt: "tiktok",
                                },
                            ].map((x) => (
                                <a key={x.alt} href={x.url}>
                                    <img
                                        src={x.i}
                                        alt={x.alt}
                                        className="w-[35px] h-[35px] resp:w-[30px] resp:h-[30px]"
                                    />
                                </a>
                            ))}
                        </div>
                        <div
                            style={{ zIndex: -1 }}
                            className="flex-1 flex justify-end items-center pb-20 flex-col"
                        >
                            <p className="text-gray-700 mb-5">
                                Scroll to see more
                            </p>
                            <img
                                className="mouseScrollAnimation"
                                src={svg_mouse}
                                alt="mouse"
                                width={50}
                                height={64}
                            />
                        </div>
                    </section>

                    <section id="aboutme" className="w-full pt-[30vh]">
                        <p className="text-4xl w-full text-center mb-7">
                            About me
                        </p>
                        <Box className="w-[95%] max-w-[1000px] h-[400px] p-5 flex flex-row m-auto resp:flex-col resp:h-[500px]">
                            <div className="flex flex-1 flex-col resp:mb-2">
                                <div className="flex-1 px-10 py-8 text-2xl resp:px-3 resp:py-2 resp:text-xl ">
                                    {[
                                        { id: "whoami", message: "Who am I" },
                                        { id: "history", message: "History" },
                                        { id: "exp", message: "Experience" },
                                    ].map((x) => (
                                        <p
                                            key={x.id}
                                            style={
                                                activeSection === x.id
                                                    ? {
                                                          color: "white",
                                                          marginLeft: "20px",
                                                          fontWeight: 300,
                                                      }
                                                    : {
                                                          color: "gray",
                                                      }
                                            }
                                            className="duration-300 transition-all font-thin mb-3"
                                        >
                                            - {x.message}
                                        </p>
                                    ))}
                                </div>
                                <div className="flex flex-1 gap-x-5 flex-wrap justify-center px-10 resp:px-5 resp:gap-2">
                                    {[
                                        [svg_js, "javascript"],
                                        [svg_ts, "typescript"],
                                        [svg_py, "python"],
                                        [svg_c, "Clang"],
                                        [svg_react, "React"],
                                        [svg_tailwind, "tailwind"],
                                        [svg_tensorflow, "tensorflow"],
                                        [svg_git, "git"],
                                    ].map((svg, index) => (
                                        <img
                                            key={index}
                                            src={svg[0]}
                                            alt={svg[1]}
                                            className="w-[40px] h-[40px] resp:w-[35] resp:h-[35px]"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div
                                id={"aboutmescroll"}
                                className="flex-1 p-4 overflow-y-auto resp:p-2"
                                onScroll={handleScroll}
                            >
                                <section id="whoami" className="pb-5">
                                    <p className="text-xl font-semibold mb-2">
                                        Who am I?
                                    </p>
                                    <p className="text-[15px] font-light mb-2">
                                        My name is Artiom, and I'm a passionate
                                        and dedicated software developer with a
                                        keen interest in crafting innovative
                                        solutions to real-world problems. Since
                                        my childhood, I've been fascinated by
                                        technology, computers, and the endless
                                        possibilities they offer. As I grew
                                        older, my curiosity led me to explore
                                        the world of coding and development.
                                    </p>
                                    <p className="text-[15px] font-light">
                                        Coding isn't just a hobby for me; it's a
                                        way of life. I find joy in solving
                                        complex problems and creating elegant
                                        solutions. Whether it's developing a web
                                        application, designing algorithms, or
                                        optimizing code for performance, I
                                        thrive on the challenges that
                                        programming presents.
                                    </p>
                                </section>
                                <section id="history" className="pb-5">
                                    <p className="text-xl font-semibold mb-2">
                                        History
                                    </p>
                                    <p className="text-[15px] font-light mb-2">
                                        My journey into the world of programming
                                        began at a young age when I started
                                        experimenting with basic scripts and
                                        tinkering with APIs. Over time, my
                                        skills evolved, and I delved deeper into
                                        languages like JavaScript, TypeScript,
                                        and Python. One of my pivotal moments
                                        was when I created my first Discord bot,
                                        which ignited my passion for software
                                        development.
                                    </p>
                                    <p className="text-[15px] font-light">
                                        As I honed my skills, I ventured into
                                        the realm of open-source development,
                                        contributing to various projects and
                                        collaborating with like-minded
                                        individuals. This journey not only
                                        expanded my knowledge but also instilled
                                        in me a sense of community and
                                        camaraderie.
                                    </p>
                                </section>
                                <section id="exp" className="pb-5">
                                    <p className="text-xl font-semibold mb-2">
                                        My Experience
                                    </p>
                                    <p className="text-[15px] font-light mb-2">
                                        Throughout my career, I've had the
                                        privilege of working on a diverse range
                                        of projects spanning web development,
                                        server management, and cloud computing.
                                        My experience includes developing robust
                                        web applications using modern frameworks
                                        like React.js and Express.js, as well as
                                        building scalable backend systems with
                                        technologies like Node.js and SQL.
                                    </p>
                                    <p className="text-[15px] font-light">
                                        Currently, I am proud to serve as a
                                        staff and developer at{" "}
                                        <a
                                            href="https://danbot.host"
                                            className="underline"
                                        >
                                            DanBot Hosting
                                        </a>
                                        , a forward-thinking company that
                                        provides free hosting services for
                                        aspiring programmers. In this role, I
                                        contribute to the development of
                                        innovative solutions and play a key role
                                        in helping users bring their projects to
                                        life.
                                    </p>
                                </section>
                            </div>
                        </Box>
                    </section>

                    <section
                        id="projects"
                        className="w-full min-h-[100vh] pt-[20vh]"
                    >
                        <p className="text-4xl w-full text-center mb-7">
                            Projects
                        </p>
                        <div className="flex flex-wrap justify-center gap-10">
                            {projects.map((project, index) => (
                                <Box
                                    key={index}
                                    className="w-1/3 min-w-[400px] flex flex-col resp:min-w-[90%]"
                                >
                                    <div className="mb-4 relative">
                                        <div className="absolute flex w-full h-full justify-end items-end p-2">
                                            {project.languages.map(
                                                ([svg, name]) => (
                                                    <div
                                                        key={name}
                                                        className="m-2"
                                                    >
                                                        <img
                                                            src={svg}
                                                            alt={name}
                                                            width={38}
                                                            height={38}
                                                            className="shadow-2xl"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <img
                                            src={project.bannerurl}
                                            alt={project.name}
                                            className="w-full h-auto rounded-t-xl border-b-[2px] border-primaryDarker"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-semibold mb-2 flex items-center mx-5 text-textPrimary">
                                            <span className="mr-2">
                                                {project.name}
                                            </span>
                                            {project.sourceurl ? (
                                                <a href={project.sourceurl}>
                                                    <img
                                                        src={svg_code}
                                                        width={30}
                                                        height={30}
                                                        alt="src"
                                                    />
                                                </a>
                                            ) : (
                                                <img
                                                    src={svg_lock}
                                                    alt="chain"
                                                    className="ml-1 w-5 h-5"
                                                />
                                            )}
                                            {project.productionurl && (
                                                <a href={project.productionurl}>
                                                    <img
                                                        width={20}
                                                        height={20}
                                                        src={svg_chain}
                                                        alt="code"
                                                        className="ml-2"
                                                    />
                                                </a>
                                            )}
                                        </h3>
                                        <p className="text-sm mb-4 mx-5 text-gray-500">
                                            {project.description}
                                        </p>
                                    </div>
                                </Box>
                            ))}
                        </div>
                    </section>

                    <section
                        id="contactme"
                        className="w-[95%] max-w-[750px] mx-auto py-[20vh]"
                    >
                        <p className="text-4xl w-full text-center mb-2">
                            Contact me
                        </p>
                        <p className="w-full text-center text-[20px] font-thin resp:text-[18px] mb-4">
                            Lets stay in touch ;)
                        </p>

                        <div className="mb-6">
                            {formErrors.map((err, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            err.type === "error"
                                                ? "#bf1717"
                                                : "green",
                                    }}
                                    className="rounded-md text-[14px] font-extralight p-2 px-4 m-2"
                                >
                                    {err.message}
                                </div>
                            ))}
                        </div>

                        <form
                            onSubmit={handleFormSubmit}
                            className="flex flex-col gap-5"
                        >
                            <div className="flex justify-between gap-5 resp:flex-col">
                                <InputField
                                    placeholder="Your Name"
                                    className="flex-1 py-4 px-6 ml-2 resp:mr-2"
                                />
                                <InputField
                                    placeholder="Email"
                                    className="flex-1 py-4 px-6 mr-2 resp:ml-2"
                                />
                            </div>
                            <InputField
                                placeholder="Subject"
                                className="flex-1 py-4 px-6 mx-2"
                            />
                            <textarea
                                placeholder="Description"
                                className="shadow-mainShadow shadow-primary bg-background text-md rounded-md h-[200px] mx-2 px-6 py-4"
                            ></textarea>

                            <input
                                type="submit"
                                value="Submit"
                                className="p-4 py-3 w-[100px] mx-auto bg-white text-black rounded-md text-md shadow-mainShadow shadow-primary hover:bg-gray-400"
                            />
                        </form>
                    </section>
                </div>
            </MouseShadow>
        </>
    );
}

export default App;
