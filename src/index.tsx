import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "pages/landing";

import "styles/variables.css";
import "styles/global.css";
import "styles/scroll-bar.css";
import "styles/global-animations.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <div className="w-full min-h-screen text-TextPrimary dark:text-DarkTextPrimary">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="*" element={<>404</>} />
            </Routes>
        </BrowserRouter>
    </div>
);
