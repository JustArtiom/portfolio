const Box = ({
    placeholder,
    className,
    name,
    type,
}: {
    placeholder?: string;
    className?: string;
    type?: string;
    name?: string;
}) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={
                "shadow-mainShadow shadow-primary bg-background text-md rounded-md " +
                className
            }
        />
    );
};

export default Box;
