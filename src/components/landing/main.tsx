import MouseScroll from "./mouse";
import SocialBox from "./socialsBox";

const LandingMainSection = () => {
    return (
        <section
            id="home"
            className="flex flex-col max-w-[1000px] w-full min-h-screen mx-auto"
            style={{ paddingBlock: "calc(max(5vh, 100px))" }}
        >
            <div className="flex-1 flex flex-col justify-center custanim-ttb">
                <p className="w-full text-center text-[40px] font-medium resp:text-[28px]">
                    Hi 👋, I'm Artiom
                </p>
                <p className="w-full text-center text-[20px] font-light resp:text-[16px]">
                    Coding, building web apps, exploring AI, contributing to
                    open-source.
                </p>
                <div className="w-full pb-[100px] resp:pb-0">
                    <SocialBox />
                </div>
            </div>
            <div className="flex-2/1 flex flex-col items-center justify-end">
                <MouseScroll />
            </div>
        </section>
    );
};

export default LandingMainSection;
