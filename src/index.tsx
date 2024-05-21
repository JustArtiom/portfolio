import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "pages/landing";

import "styles/variables.css";
import "styles/global.css";
import "styles/scroll-bar.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Suspense fallback={<>Loading...</>}>
        <div className="w-full min-h-screen bg-BgColor dark:bg-DarkBgColor text-TextPrimary dark:text-DarkTextPrimary">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<>404</>} />
                </Routes>
            </BrowserRouter>
        </div>
    </Suspense>
);
