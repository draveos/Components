"use client"
import "./GradientButton.css"

export function GradientButton({ children, onClick, className = "", ...props }) {
    return (
        <button className={`cosmic-gradient-btn ${className}`} onClick={onClick} {...props}>
            <span className="cosmic-gradient-btn__text">{children}</span>
            <div className="cosmic-gradient-btn__overlay"></div>
        </button>
    )
}
