"use client"
import { useState } from "react"
import "./LoadingButton.css"

export function LoadingButton({ children, onClick, loadingText = "Loading...", className = "", ...props }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async (e) => {
        if (isLoading) return

        setIsLoading(true)
        try {
            await onClick?.(e)
        } finally {
            // Simulate a minimum loading time for better UX
            setTimeout(() => setIsLoading(false), 1500)
        }
    }

    return (
        <button
            className={`cosmic-loading-btn ${isLoading ? "cosmic-loading-btn--loading" : ""} ${className}`}
            onClick={handleClick}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="cosmic-loading-btn__spinner"></div>
                    <span className="cosmic-loading-btn__text">{loadingText}</span>
                </>
            ) : (
                <span className="cosmic-loading-btn__text">{children}</span>
            )}
        </button>
    )
}
