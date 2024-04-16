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


function App() {
    return (
        <MouseShadow>
            <Header />
            <div className="w-full max-w-[1000px] m-auto">
                <section id="home" className="w-full h-[100vh] pt-[25vh] flex flex-col">
                    <p className="w-full text-center text-[40px]">Hi 👋, I'm Artiom</p>
                    <p className="w-full text-center text-[20px] font-thin">Coding, building web apps, exploring AI, contributing to open-source.</p>
                    <div className="flex w-[60%] h-[65px] m-auto my-7 rounded-2xl px-10 bg-primaryHover items-center justify-around">  
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
                <section id="aboutme" className="w-full h-[80vh] py-[30vh]">
                    <Box width={"70%"} className="p-5 flex flex-col">
                        <p className="text-center">Passionate and dedicated software developer with a keen interest in crafting innovative solutions to real-world problems. With some years of experience, I've had the opportunity to work on a variety of projects across different domains, honing my skills and embracing new technologies along the way.</p>
                        <div className="flex pt-5 gap-5 justify-center">
                            {
                            [
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

                <section id="projects" className="w-full h-[100vh]"> projects section</section>
                <section id="contactme" className="w-full h-[100vh]">form/contact me section</section>
            </div>
        </MouseShadow>
    );
}

export default App;
