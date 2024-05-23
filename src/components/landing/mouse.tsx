import MouseSVG from "assets/svgs/icons/mouse.svg";

const MouseScroll = () => {
    return (
        <>
            <p className="text-gray-700 mb-7 text-center w-full">
                Scroll to see more
            </p>
            <img className="BounceAnimation w-9" src={MouseSVG} alt="mouse" />
        </>
    );
};

export default MouseScroll;
