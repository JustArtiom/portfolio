import React from "react";
import BackgroundLayout from "layout/Background";
import Main from "pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/Header";

const Router: React.FC = () => {
    return (
        <div className="relative w-full min-h-screen">
            <BackgroundLayout />
            <Header />
            <div className="relative z-1">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="*" element={<>404</>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default Router;
