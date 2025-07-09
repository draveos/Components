"use client"
import { useEffect, useState } from "react"
import "./SlideIn.css"

export function SlideIn({ children, direction = "left", duration = 1, delay = 0, className = "" }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [delay])

    return (
        <div
            className={`cosmic-slide-in cosmic-slide-in--${direction} ${isVisible ? "visible" : ""} ${className}`}
            style={{ transitionDuration: `${duration}s` }}
        >
            {children}
        </div>
    )
}
