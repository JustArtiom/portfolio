import { ReactNode } from "react";

const Box = ({
    width,
    height,
    className,
    children,
}: {
    width?: string;
    height?: string;
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            style={{ width, height }}
            className={
                "rounded-xl shadow-mainShadow shadow-Primary " + className
            }
        >
            {children}
        </div>
    );
};

export default Box;
