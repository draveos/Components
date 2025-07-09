"use client"
import { useEffect } from "react"
import "./Modal.css"

export function Modal({
                          isOpen = false, // Default to false to prevent random appearance
                          onClose,
                          title,
                          children,
                          size = "medium",
                          className = "",
                      }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleEscapeKey = (e) => {
        if (e.key === "Escape") {
            onClose()
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            document.addEventListener("keydown", handleEscapeKey)
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
            document.removeEventListener("keydown", handleEscapeKey)
        }
    }, [isOpen, onClose])

    // Don't render anything if not open or if onClose is not provided
    if (!isOpen || typeof onClose !== "function") return null

    return (
        <div className="cosmic-modal-overlay" onClick={handleOverlayClick}>
            <div className={`cosmic-modal cosmic-modal--${size} ${className}`}>
                <div className="cosmic-modal__header">
                    <h3 className="cosmic-modal__title">{title || "Modal"}</h3>
                    <button className="cosmic-modal__close" onClick={onClose} aria-label="Close modal" type="button">
                        ✕
                    </button>
                </div>
                <div className="cosmic-modal__body">{children}</div>
            </div>
        </div>
    )
}
