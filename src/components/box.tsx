import { ReactNode } from "react"

const Box = ({width, height, className, children} : {width?: string, height?: string, className?: string, children?: ReactNode}) => {
    return <div style={{width, height}} className={"bg-background m-auto rounded-xl shadow-mainShadow shadow-primary "+className}>{children}</div>
}

export default Box