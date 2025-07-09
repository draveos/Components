"use client"
import "./Grid.css"

export function Grid({ children, columns = 3, gap = "1rem", className = "" }) {
    const gridStyle = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
    }

    return (
        <div className={`cosmic-grid ${className}`} style={gridStyle}>
            {children}
        </div>
    )
}
