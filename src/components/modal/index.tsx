import { HTMLAttributes, forwardRef } from "react"
import styles from "./styles.module.scss"

type ModalProps = HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean
    onClose: () => void
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ isOpen, onClose, children, ...rest }, ref) => {
    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                {...rest}
                ref={ref}
                className={`${styles.modal} ${rest.className || ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
})

export default Modal
