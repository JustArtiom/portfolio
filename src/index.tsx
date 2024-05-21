import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "pages/landing";

import "styles/variables.css";
import "styles/global.css";
import "styles/scroll-bar.css";
import "styles/global-animations.css";
import subscribeAnimator from "utils/animations";

const MainApp = () => {
    useEffect(() => {
        subscribeAnimator();
    });

    return (
        <div className="w-full min-h-screen text-TextPrimary dark:text-DarkTextPrimary">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<>404</>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <MainApp />
);
