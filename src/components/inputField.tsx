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
                "mx-3 flex-1 shadow-mainShadow shadow-primary bg-background text-xl rounded-md py-4 px-6 " +
                className
            }
        />
    );
};

export default Box;
