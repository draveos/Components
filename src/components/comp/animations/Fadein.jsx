"use client"
import { useEffect, useState } from "react"
import "./FadeIn.css"

export function FadeIn({ children, duration = 1, delay = 0, className = "" }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [delay])

    return (
        <div
            className={`cosmic-fade-in ${isVisible ? "visible" : ""} ${className}`}
            style={{ transitionDuration: `${duration}s` }}
        >
            {children}
        </div>
    )
}
