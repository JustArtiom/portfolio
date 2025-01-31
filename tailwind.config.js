/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            textColor: {
                primary: "var(--text-primary)",
            },
            backgroundColor: {
                primary: "var(--background-color)",
                secondary: "var(--background-primary)",
            },
            boxShadow: {
                main: "0 0px 10px 0px rgba(0, 0, 0, 0.3)",
            },
            screens: {
                resp: { max: "900px" },
            },
        },
    },
    plugins: [],
};
