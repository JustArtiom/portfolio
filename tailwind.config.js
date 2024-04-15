/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#131419",
                primary: "#C47D7E",
                primaryHover: "#7C5757",
                secondary: "#1F2027",
                thirdary: "#C47D7E"
            },
            boxShadow: {
                mainShadow: '0 0px 10px 0px rgba(0, 0, 0, 0.3)',
            }
        },
    },
    plugins: [],
};
