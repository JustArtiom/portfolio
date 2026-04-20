import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const THEME_KEY = "portfolio-theme";
const stored = localStorage.getItem(THEME_KEY);
if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
