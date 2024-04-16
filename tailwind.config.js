/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#131419",
                primary: "#FF9F9F",
                primaryDarker: "#D08485",
                textPrimary: "#FF9F9F",
                textSecondary: "#797979",
                secondary: "#1F2027",
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
