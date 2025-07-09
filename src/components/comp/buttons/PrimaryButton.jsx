"use client"

import { useState } from "react"
import "./PrimaryButton.css"

export function PrimaryButton({
                                  children,
                                  onClick,
                                  disabled = false,
                                  size = "medium",
                                  variant = "primary",
                                  className = "",
                                  ...props
                              }) {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = (e) => {
        if (disabled) return

        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 600)
        onClick?.(e)
    }

    return (
        <button
            className={`cosmic-btn cosmic-btn--${variant} cosmic-btn--${size} ${isClicked ? "cosmic-btn--clicked" : ""} ${className}`}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            <span className="cosmic-btn__text">{children}</span>
            <div className="cosmic-btn__ripple"></div>
            <div className="cosmic-btn__glow"></div>
        </button>
    )
}
