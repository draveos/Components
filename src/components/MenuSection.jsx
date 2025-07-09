"use client"

import "./MenuSection.css"

export function MenuSection({ title, children, className = "" }) {
    return (
        <section className={`menu-section ${className}`}>
            {title && <h2 className="menu-section__title">{title}</h2>}
            <div className="menu-section__content">{children}</div>
        </section>
    )
}
