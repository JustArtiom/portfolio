import React from "react";
import Header from "components/header";
import MouseShadow from "components/mouseShadow";

import svg_github from "styles/github.svg"
import svg_instagram from "styles/instagram.svg"
import svg_discord from "styles/discord.svg"
import svg_tiktok from "styles/tiktok.svg"
import svg_mouse from "styles/mouse.svg"

function App() {
    return (
        <MouseShadow>
            <Header />
            <div className="w-full max-w-[1000px] m-auto">
                <section id="home" className="w-full h-[100vh] pt-[25vh] flex flex-col">
                    <p className="w-full text-center text-[40px]">Hi 👋, I'm Artiom</p>
                    <p className="w-full text-center text-[20px] font-thin">Coding, building web apps, exploring AI, contributing to open-source.</p>
                    <div className="flex w-[60%] h-[65px] m-auto my-7 rounded-2xl px-10 bg-primary items-center justify-around">  
                        {
                            [{
                                i: svg_github,
                                url: "https://github.com/JustArtiom"
                            }, {
                                i: svg_instagram,
                                url: "https://instagram.com/im_artiom"
                            }, {
                                i: svg_discord,
                                url: "https://instagram.com/im_artiom"
                            }, {
                                i: svg_tiktok,
                                url: "https://instagram.com/im_artiom"
                            }].map(x => <a key={x.url} href={x.url}><img src={x.i} width={35} height={35} /></a>)
                        }
                    </div>
                    <div className="flex-1 flex justify-end items-center pb-20 flex-col">
                        <p className="text-gray-700 mb-5">Scroll to see more</p>
                        <img className="mouseScrollAnimation" src={svg_mouse} alt="mouse" width={50} height={64} />
                    </div>
                </section>

                <section id="aboutme" className="w-full h-[50vh]">about me section</section>
                <section id="projects" className="w-full h-[100vh]"> projects section</section>
                <section id="contactme" className="w-full h-[100vh]">form/contact me section</section>
            </div>
        </MouseShadow>
    );
}

export default App;
