import MellstroyAmAm from "assets/gifs/mellstroy-am-am.gif";
import SkibidiToiler from "assets/pngs/skibidi-toiler.png";
import ManLaughingInDarkness from "assets/gifs/man-laughing-in-darkness.gif";
import Tsukasa from "assets/pngs/Tsukasa.png";
import NotSafeToWorth from "assets/pngs/notsafetowork.png";
import YosugaNoSora from "assets/pngs/yosuga_no_sora.png";
import Dima from "assets/pngs/dima.png";

const BackgroundDetails = () => {
    return (
        <div className="absolute w-full h-full -z-0 opacity-50 overflow-hidden dark:opacity-20 select-none">
            <div
                className="absolute left-[30%] resp:left-[40%] text-center custanim-btt transform-gpu"
                style={{ top: "calc(max(15%, 100px))" }}
            >
                <p className="-rotate-12 -translate-x-[50%] w-[300px] resp:text-sm resp:w-[200px]">
                    These background images were chosen by my followers on
                    instagram
                </p>
            </div>

            <div className="absolute left-[65%] top-[7vh] rotate-12 custanim-btt transform-gpu">
                <img
                    src={MellstroyAmAm}
                    alt="Mellstroy am am am"
                    className="h-50 rotate-12 resp:h-30"
                    draggable={false}
                />
                <div className="text-sm mt-[-35px] rotate-12">@umz.47</div>
            </div>

            <div className="absolute left-[200px] top-[20%] rotate-90 custanim-ltr transform-gpu">
                <div className="absolute left-[-220px]">
                    <img
                        src={SkibidiToiler}
                        alt="Skibidytoiler"
                        className="rotate-90 w-[100px] resp:w-[60px]"
                        draggable={false}
                    />
                    <div className="rotate-90 text-sm absolute top-[160px] resp:top-[125px] left-[-15px]">
                        @syko.logicall
                    </div>
                </div>
            </div>

            <div className="absolute left-[10%] top-[70vh] -rotate-12 custanim-btt transform-gpu">
                <img
                    src={ManLaughingInDarkness}
                    alt="Man Laughing in darkness"
                    className="h-[200px]"
                    draggable={false}
                />
                <div className="dark:hidden">@oni._.kys</div>
            </div>

            <div className="absolute right-[200px] top-[70vh] -rotate-45 custanim-rtl transform-gpu">
                <div className="absolute right-[-270px] -rotate-45">
                    <p className="absolute -rotate-45 top-[10px] right-[-45px] text-sm resp:right-[45px] resp:left-[65px]">
                        @itsyourpinartt
                    </p>
                    <img
                        src={Tsukasa}
                        alt="Tsukasa"
                        className="h-[200px] resp:h-[150px]"
                        draggable={false}
                    />
                </div>
            </div>

            <div
                className="absolute left-[50%] custanim-ttb resp:mt-[20px] transform-gpu"
                style={{ top: "calc(max(50vh, 240px))" }}
            >
                <img
                    src={YosugaNoSora}
                    alt="YosugaNoSora"
                    className="h-[100px] rotate-180"
                    draggable={false}
                />
                <div className="">@ceyaa_kingston</div>
            </div>

            <div className="absolute right-[200px] top-[30vh] -rotate-90 custanim-rtl transform-gpu">
                <div className="absolute right-[-250px]">
                    <p className="absolute resp:left-[20px] left-[70px] text-sm -top-[50px] -rotate-90">
                        @negevosu
                    </p>
                    <img
                        src={NotSafeToWorth}
                        alt="NotSafeToWorth"
                        className="h-[140px] -rotate-90 resp:h-[100px]"
                        draggable={false}
                    />
                </div>
            </div>

            <div className="absolute left-[-50px] bottom-[-50px] rotate-45 custanim-btt transform-gpu">
                <div>
                    <div className="ml-[70px] absolute rotate-90 left-[-50px]">
                        @_lorra1ne
                    </div>
                    <img
                        src={Dima}
                        alt="Dima"
                        className="h-[250px] rotate-45"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default BackgroundDetails;
