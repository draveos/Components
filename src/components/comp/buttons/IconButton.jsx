"use client"
import "./IconButton.css"

export function IconButton({ icon, children, onClick, className = "", ...props }) {
    return (
        <button className={`cosmic-icon-btn ${className}`} onClick={onClick} {...props}>
            <span className="cosmic-icon-btn__icon">{icon}</span>
            {children && <span className="cosmic-icon-btn__text">{children}</span>}
            <div className="cosmic-icon-btn__glow"></div>
        </button>
    )
}
