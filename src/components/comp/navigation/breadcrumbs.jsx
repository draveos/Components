"use client"
import "./breadcrumb.css"

export function Breadcrumbs({ items = [], className = "" }) {
    return (
        <nav className={`cosmic-breadcrumbs ${className}`} aria-label="breadcrumb">
            <ol className="cosmic-breadcrumbs__list">
                {items.map((item, index) => (
                    <li key={index} className="cosmic-breadcrumbs__item">
                        {index < items.length - 1 ? (
                            <a href={item.href || "#"} className="cosmic-breadcrumbs__link">
                                {item.text}
                            </a>
                        ) : (
                            <span className="cosmic-breadcrumbs__current" aria-current="page">
                {item.text}
              </span>
                        )}
                        {index < items.length - 1 && <span className="cosmic-breadcrumbs__separator">›</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
