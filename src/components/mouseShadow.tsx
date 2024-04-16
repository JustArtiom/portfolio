import React, { ReactNode, useEffect, useState } from "react";

function MouseShadow({ children }: { children: ReactNode }) {
    const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            {children}
            <div
                style={{
                    position: "fixed",
                    top: mousePosition.y + "px",
                    left: mousePosition.x + "px",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(500px at 50% 50%, rgba(29, 78, 216, 0.15), transparent 25%)",
                    pointerEvents: "none",
                    zIndex: -1,
                }}
                className="flex items-center align-center"
            ></div>
        </>
    );
}

export default MouseShadow;
