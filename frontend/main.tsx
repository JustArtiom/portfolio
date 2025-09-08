import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById(`root`)!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "d") {
    document.documentElement.classList.toggle("dark");
  }
});
