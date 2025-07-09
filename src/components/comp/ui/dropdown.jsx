"use client"

import { useState, useRef, useEffect } from "react"

export function Dropdown({ trigger, items = [], onSelect, className = "" }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className={`dropdown ${className}`} ref={dropdownRef}>
            <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                {trigger}
                <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                onSelect?.(item)
                                setIsOpen(false)
                            }}
                        >
                            {item.icon && <span className="dropdown-icon">{item.icon}</span>}
                            <span>{item.label || item}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
