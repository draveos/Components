"use client"
import { useState } from "react"
import "./Navbar.css"

export function Navbar({ brand = "Brand", links = [], className = "" }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className={`cosmic-navbar ${className}`}>
            <div className="cosmic-navbar__header">
                <div className="cosmic-navbar__brand">
                    <span className="cosmic-navbar__brand-icon">⟡</span>
                    <span className="cosmic-navbar__brand-text">{brand}</span>
                </div>
                <button className="cosmic-navbar__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            <div className={`cosmic-navbar__links ${isOpen ? "open" : ""}`}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href || "#"}
                        className={`cosmic-navbar__link ${link.active ? "active" : ""}`}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.text}
                    </a>
                ))}
            </div>
        </nav>
    )
}
