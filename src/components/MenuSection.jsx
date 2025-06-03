"use client"

export function MenuSection({ title, items, onItemClick }) {
    return (
        <div className="menu-section">
            <h3>{title}</h3>
            <div className="menu-items">
                {items.map((item) => (
                    <button key={item} className="menu-item" onClick={() => onItemClick(item)}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    )
}
