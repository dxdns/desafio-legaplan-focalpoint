import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react"
import styles from "./styles.module.scss"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren & {}

export default forwardRef<HTMLButtonElement, Props>(({ children, ...rest }, ref) => {
    return (
        <button {...rest} ref={ref} className={`${styles.button} ${rest.className || ""}`}>
            {children}
        </button>
    )
})