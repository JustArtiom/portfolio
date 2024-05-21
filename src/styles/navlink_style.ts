import { tv } from "tailwind-variants";

const navlink_style = tv({
    base: "px-2 py-1.5 mx-3 text-sm rounded-md",
    variants: {
        active: {
            true: "bg-Primary text-TextPrimary hover:text-white dark:hover:text-black",
            false: "",
        },
    },
    defaultVariants: {
        active: true,
    },
});

export default navlink_style;
