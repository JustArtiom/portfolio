import React from "react";
import Header from "components/header";
import MouseShadow from "components/mouseShadow";
import Box from "components/box";

import svg_github from "styles/github.svg"
import svg_instagram from "styles/instagram.svg"
import svg_discord from "styles/discord.svg"
import svg_tiktok from "styles/tiktok.svg"
import svg_mouse from "styles/mouse.svg"

import svg_js from "styles/js.svg"
import svg_ts from "styles/ts.svg"
import svg_py from "styles/py.svg"
import svg_c from "styles/c.svg"
import svg_react from "styles/react.svg"
import svg_tailwind from "styles/tailwind.svg"
import svg_tensorflow from "styles/tensorflow.svg"
import svg_git from "styles/git.svg"    

import svg_lock from "styles/lock.svg"
import svg_chain from "styles/chain.svg"

const projects = [
    {
        name: "ArtiomsHosting Bot",
        description: "An advanced discord bot that cooperates together with pterodactyl panel to allow discord users create and control docker containers",
        productionurl: "https://discord.artiom.host",
        sourceurl: "https://github.com/JustArtiom/ArtiomsHosting-Bot",
        bannerurl: "cdn/projects/ah-bot.png",
        languages: [[svg_ts, "typescript"]]
    }, 
    {
        name: "Time Trekker",
        description: "Keep track of your screen time at the PC, an daily average power usage, the apps you had open and the AFK time with just an exe file running the background",
        productionurl: null,
        sourceurl: "https://github.com/JustArtiom/timetrekker",
        bannerurl: "cdn/projects/timetrekker.png",
        languages: [[svg_ts, "typescript"]]
    }, 
    {
        name: "Text Classifier AI",
        description: "A TensorFlow project that lets you train a model to classify text and use it, provided with a pre-trained model and training data example",
        productionurl: null,
        sourceurl: "https://github.com/JustArtiom/text-classifier-ai",
        bannerurl: "cdn/projects/textclassifier.png",
        languages: [[svg_py, "python"]]
    }, 
    {
        name: "Production Express Template",
        description: "Streamline Express API development with file-based routing, advanced error handling, Prisma integration, and TypeScript support. Build scalable and maintainable applications with ease.",
        productionurl: null,
        sourceurl: "https://github.com/JustArtiom/backend-express-template",
        bannerurl: "cdn/projects/expresstemplate.png",
        languages: [[svg_ts, "typescript"]]
    }, 
    {
        name: "Support Site Back-End",
        description: "A Ticketing backend system developed and designed to support the customers of DanBot Hosting made in typescript and python to handle ticket automation (chat bot AI)",
        productionurl: "https://support.danbot.host",
        sourceurl: null,
        bannerurl: "cdn/projects/supportsite.png",
        languages: [[svg_py, "python"], [svg_ts, "typescript"]]
    }
]

function App() {
    return (
        <MouseShadow>
            <Header />
            <div className="w-full max-w-[1000px] m-auto">
                <section id="home" className="w-full h-[100vh] pt-[25vh] flex flex-col">
                    <p className="w-full text-center text-[40px]">Hi 👋, I'm Artiom</p>
                    <p className="w-full text-center text-[20px] font-thin">Coding, building web apps, exploring AI, contributing to open-source.</p>
                    <div className="flex w-[60%] h-[65px] m-auto my-7 rounded-2xl px-10 bg-primaryDarker shadow-mainShadow shadow-primary items-center justify-around">  
                        {
                            [{
                                i: svg_github,
                                url: "https://github.com/JustArtiom",
                                alt: "github"
                            }, {
                                i: svg_instagram,
                                url: "https://instagram.com/im_artiom",
                                alt: "instagram"
                            }, {
                                i: svg_discord,
                                url: "https://instagram.com/im_artiom",
                                alt: "discord"
                            }, {
                                i: svg_tiktok,
                                url: "https://instagram.com/im_artiom",
                                alt: "tiktok"
                            }].map(x => <a key={x.alt} href={x.url}><img src={x.i} width={35} height={35} alt={x.alt} /></a>)
                        }
                    </div>
                    <div style={{zIndex: -1}} className="flex-1 flex justify-end items-center pb-20 flex-col">
                        <p className="text-gray-700 mb-5">Scroll to see more</p>
                        <img className="mouseScrollAnimation" src={svg_mouse} alt="mouse" width={50} height={64} />
                    </div>
                </section>

                {/* This section needs to be redesigned */}
                <section id="aboutme" className="w-full pt-[30vh]">
                    <p className="text-4xl w-full text-center mb-7">About me</p>
                    <Box width={"70%"} className="p-5 flex flex-col m-auto">
                        <p className="text-center">Passionate and dedicated software developer with a keen interest in crafting innovative solutions to real-world problems. With some years of experience, I've had the opportunity to work on a variety of projects across different domains, honing my skills and embracing new technologies along the way.</p>
                        <div className="flex pt-5 gap-5 justify-center">
                            {[
                                [svg_js, "javascript"], 
                                [svg_ts, "typescript"],
                                [svg_py, "python"],
                                [svg_c, "Clang"],
                                [svg_react, "React"],
                                [svg_tailwind, "tailwind"],
                                [svg_tensorflow, "tensorflow"],
                                [svg_git, "git"]
                            ].map(svg => <img key={svg[1]} src={svg[0]} alt={svg[1]} width={45} height={45}/>)}
                        </div>
                    </Box>
                </section>

                <section id="projects" className="w-full min-h-[100vh] pt-[20vh] mb-[20vh]">
                    <p className="text-4xl w-full text-center mb-7">Projects</p>
                    <div className="flex flex-wrap justify-center gap-10">
                        {projects.map((project, index) => (
                            <Box key={index} className="w-1/3 min-w-[400px] flex flex-col">
                                <div className="mb-4 relative">
                                    <div className="absolute flex w-full h-full justify-end items-end p-2">
                                        {project.languages.map(([svg, name]) => (
                                            <div key={name} className="m-2">
                                                <img src={svg} alt={name} width={38} height={38} className="shadow-2xl" />
                                            </div>
                                        ))}
                                    </div>
                                    <img src={project.bannerurl} alt={project.name} className="w-full h-auto rounded-t-xl border-b-[2px] border-primaryHover" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center mx-5 text-textPrimary">
                                        <span className="mr-2">{project.name}</span>
                                        {project.sourceurl ? 
                                            <a href={project.sourceurl}><img src={svg_chain} alt="chain" className="ml-1 w-5 h-5" /></a>
                                            :
                                            <img src={svg_lock} alt="chain" className="ml-1 w-5 h-5" />
                                        }
                                    </h3>
                                    <p className="text-sm mb-4 mx-5 text-gray-500">{project.description}</p>
                                </div>
                            </Box>
                        ))}
                    </div>
                </section>

                <section id="contactme" className="w-full h-[100vh]">form/contact me section</section>
            </div>
        </MouseShadow>
    );
}

export default App;
