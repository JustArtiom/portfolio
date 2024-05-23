const subscribeAnimator = () => {
    const observer = new IntersectionObserver((entries) => {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("canim-default");
            } else {
                entry.target.classList.remove("canim-default");
            }
        }
    });

    const toObserve = document.querySelectorAll(".canim-hidden-btt, .canim-hidden-ttb, .canim-hidden-rtl, .canim-hidden-ltr")
    toObserve.forEach((el) => observer.observe(el));
}

export default subscribeAnimator;
