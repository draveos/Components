"use client"

import { useState } from "react"
import "./Header.css"

const categories = [
    { id: "all", name: "All Components", icon: "⟡", description: "Complete component collection" },
    { id: "buttons", name: "Buttons", icon: "🔘", description: "Interactive button components" },
    { id: "forms", name: "Forms", icon: "📝", description: "Input and form components" },
    { id: "navigation", name: "Navigation", icon: "🧭", description: "Menu and navigation components" },
    { id: "layout", name: "Layout", icon: "📐", description: "Grid and layout components" },
    { id: "cards", name: "Cards", icon: "🃏", description: "Card and container components" },
    { id: "modals", name: "Modals", icon: "🪟", description: "Dialog and modal components" },
    { id: "tables", name: "Tables", icon: "📊", description: "Data table components" },
    { id: "charts", name: "Charts", icon: "📈", description: "Data visualization components" },
    { id: "animations", name: "Animations", icon: "✨", description: "Animation and transition effects" },
    { id: "utilities", name: "Utilities", icon: "🔧", description: "Helper and utility components" },
    { id: "experimental", name: "Experimental", icon: "🧪", description: "Cutting-edge components" },
]

export function Header({ selectedCategory, onCategoryChange, currentPage, onPageChange }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [hoveredCategory, setHoveredCategory] = useState(null)

    const visibleCategories = categories.slice(0, 6)
    const hiddenCategories = categories.slice(6)

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-main celestial-border hover-glow">
                    {/* Decorative corners */}
                    <div className="corner corner-tl"></div>
                    <div className="corner corner-tr"></div>
                    <div className="corner corner-bl"></div>
                    <div className="corner corner-br"></div>

                    <div className="header-content">
                        {/* Logo */}
                        <div className="logo-section clickable" onClick={() => onPageChange("home")}>
                            <div className="logo-orb">
                                <span className="logo-symbol">⟡</span>
                            </div>
                            <div className="logo-text">
                                <h1 className="logo-title glow-text">Component Library</h1>
                                <p className="logo-subtitle">React Component Collection</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="nav-section">
                            <div className="nav-categories">
                                {visibleCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => onCategoryChange(category.id)}
                                        onMouseEnter={() => setHoveredCategory(category.id)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                        className={`nav-button ${selectedCategory === category.id ? "active" : ""}`}
                                    >
                                        <span className="nav-icon">{category.icon}</span>
                                        <span className="nav-text">{category.name}</span>

                                        {hoveredCategory === category.id && (
                                            <div className="nav-tooltip">
                                                {category.description}
                                                <div className="tooltip-arrow"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={`expand-button ${isExpanded ? "expanded" : ""}`}
                            >
                                <span className="expand-icon">⋯</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Expanded menu */}
                {isExpanded && (
                    <div className="expanded-menu celestial-border">
                        <div className="expanded-grid">
                            {categories.map((category, index) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        onCategoryChange(category.id)
                                        setIsExpanded(false)
                                    }}
                                    className={`expanded-item ${selectedCategory === category.id ? "active" : ""}`}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="expanded-icon">{category.icon}</div>
                                    <div className="expanded-content">
                                        <span className="expanded-name">{category.name}</span>
                                        <span className="expanded-desc">{category.description}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
