"use client"
import "./Badge.css"

export function Badge({ children, variant = "default", className = "" }) {
    return <span className={`cosmic-badge cosmic-badge--${variant} ${className}`}>{children}</span>
}
