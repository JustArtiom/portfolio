import MouseScroll from "./mouse";
import SocialBox from "./socialsBox";

const LandingMain = () => {
    return (
        <section
            id="home"
            className="max-w-[1000px] w-full min-h-screen mx-auto py-[10vh]"
        >
            <p
                className="w-full text-center text-[40px] font-medium"
                style={{ marginTop: "calc(max(5vh, 100px))" }}
            >
                Hi 👋, I'm Artiom
            </p>
            <p className="w-full text-center text-[20px] font-light resp:text-[18px]">
                Coding, building web apps, exploring AI, contributing to
                open-source.
            </p>
            <SocialBox />
            <div className="flex-1 flex justify-center items-end">
                <MouseScroll />
            </div>
        </section>
    );
};

export default LandingMain;
