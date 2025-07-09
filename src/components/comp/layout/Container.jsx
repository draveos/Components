"use client"
import "./Container.css"

export function Container({ children, maxWidth = "lg", className = "" }) {
    const maxWidthClasses = {
        sm: "cosmic-container--sm",
        md: "cosmic-container--md",
        lg: "cosmic-container--lg",
        xl: "cosmic-container--xl",
        full: "cosmic-container--full",
    }

    return <div className={`cosmic-container ${maxWidthClasses[maxWidth]} ${className}`}>{children}</div>
}
