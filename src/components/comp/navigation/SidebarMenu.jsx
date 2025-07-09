"use client"

import { useState } from "react"

export function SidebarMenu({ title = "Menu", links = [], className = "" }) {
    const [activeLink, setActiveLink] = useState(0)

    return (
        <div className={`sidebar-demo ${className}`}>
            <div className="sidebar">
                <div className="sidebar-header">
                    <span className="sidebar-icon">⟡</span>
                    <span className="sidebar-title">{title}</span>
                </div>
                <nav className="sidebar-nav">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href || "#"}
                            className={`sidebar-link ${activeLink === index ? "active" : ""}`}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveLink(index)
                            }}
                        >
                            <span className="link-icon">{link.icon}</span>
                            <span className="link-text">{link.text}</span>
                        </a>
                    ))}
                </nav>
            </div>
            <div className="main-content">
                <h4>Main Content Area</h4>
                <p>Content for {links[activeLink]?.text || "Dashboard"} goes here...</p>
            </div>
        </div>
    )
}
