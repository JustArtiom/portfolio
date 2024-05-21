import Header from "components/header";
import LandingAboutMeSection from "components/landing/about";
import LandingMainSection from "components/landing/main";
import LandingProjectsSection from "components/landing/projects";

const LandingPage = () => {
    return (
        <div>
            <Header />
            <LandingMainSection />
            <LandingAboutMeSection />
            <LandingProjectsSection />
        </div>
    );
};

export default LandingPage;
