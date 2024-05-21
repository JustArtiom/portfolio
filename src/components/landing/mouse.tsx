import MouseSVG from "assets/svgs/icons/mouse.svg";

const MouseScroll = () => {
    return (
        <div>
            <p className="text-gray-700 mb-5">Scroll to see more</p>
            <img className="BounceAnimation w-9" src={MouseSVG} alt="mouse" />
        </div>
    );
};

export default MouseScroll;
