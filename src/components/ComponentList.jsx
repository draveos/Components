"use client"

import "./ComponentList.css"

export function ComponentList({ title, items = [], className = "" }) {
    return (
        <div className={`component-list ${className}`}>
            <h2 className="component-list__title">{title}</h2>
            <ul className="component-list__items">
                {items.map((item, index) => (
                    <li key={index} className="component-list__item">
                        {typeof item === "string" ? item : item.name || "Unnamed Item"}
                    </li>
                ))}
            </ul>
        </div>
    )
}
