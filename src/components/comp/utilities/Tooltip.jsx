"use client"
import { useState } from "react"
import "./Tooltip.css"

export function Tooltip({ children, content, position = "top", className = "" }) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className={`cosmic-tooltip-wrapper ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`cosmic-tooltip cosmic-tooltip--${position}`}>
                    {content}
                    <div className="cosmic-tooltip__arrow"></div>
                </div>
            )}
        </div>
    )
}
