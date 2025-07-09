"use client"

import { useState } from "react"

export function Input({ type = "text", placeholder, value, onChange, label, error, icon, className = "", ...props }) {
    const [focused, setFocused] = useState(false)

    return (
        <div className={`input-group ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className={`input-wrapper ${focused ? "focused" : ""} ${error ? "error" : ""}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`input-field ${icon ? "with-icon" : ""}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}
