/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                Primary: "var(--primary-color)",

                BgColor: "var(--background-color)",
                TextPrimary: "var(--text-primary)",

                DarkBgColor: "var(--dark-background-color)",
                DarkTextPrimary: "var(--dark-text-primary)",
            },
            boxShadow: {
                mainShadow: "0 0px 10px 0px rgba(0, 0, 0, 0.3)",
            },
            screens: {
                resp: { max: "900px" },
            },
        },
    },
    plugins: [],
};
