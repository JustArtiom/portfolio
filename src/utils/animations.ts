const subscribeAnimator = () => {
    const handleScroll = () => {
        const elements = document.querySelectorAll(".custanim-btt, .custanim-ttb, .custanim-rtl, .custanim-ltr");

        elements.forEach((element, index) => {
            const elemTop = element.getBoundingClientRect().top + element.getBoundingClientRect().height /2;
            const windowHeight = window.innerHeight;

            const threshold = windowHeight+200;

            if (elemTop < threshold && elemTop > -200) {
                element.classList.add("custanim-default");
            } else {
                element.classList.remove("custanim-default")
            }
        });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
};

export default subscribeAnimator;