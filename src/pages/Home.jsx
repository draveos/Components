"use client"

import { useState } from "react"
import { PreviewModal } from "../components/PreviewModal"
import { CodeModal } from "../components/CodeModal"
import "./Home.css"

const componentData = {
    buttons: [
        {
            name: "Primary Button",
            description: "Main action button with hover effects",
            tags: ["button", "primary"],
        },
        { name: "Icon Button", description: "Button with icon and text", tags: ["button", "icon"] },
        {
            name: "Loading Button",
            description: "Button with loading state animation",
            tags: ["button", "loading"],
        },
        {
            name: "Gradient Button",
            description: "Stylish gradient button with animations",
            tags: ["button", "gradient"],
        },
    ],
    forms: [
        {
            name: "Contact Form",
            description: "Complete contact form with validation",
            tags: ["form", "validation"],
        },
        { name: "Login Form", description: "User authentication form", tags: ["form", "auth"] },
        {
            name: "Multi-step Form",
            description: "Wizard-style form with progress",
            tags: ["form", "wizard"],
        },
        {
            name: "Search Input",
            description: "Enhanced search input with suggestions",
            tags: ["input", "search"],
        },
    ],
    navigation: [
        {
            name: "Responsive Navbar",
            description: "Mobile-friendly navigation bar",
            tags: ["nav", "responsive"],
        },
        {
            name: "Sidebar Menu",
            description: "Collapsible sidebar navigation",
            tags: ["nav", "sidebar"],
        },
        {
            name: "Breadcrumbs",
            description: "Navigation breadcrumb component",
            tags: ["nav", "breadcrumb"],
        },
        { name: "Tab Navigation", description: "Tabbed interface component", tags: ["nav", "tabs"] },
    ],
    layout: [
        {
            name: "Grid System",
            description: "Responsive grid layout component",
            tags: ["layout", "grid"],
        },
        { name: "Card Layout", description: "Flexible card container", tags: ["layout", "card"] },
        {
            name: "Masonry Grid",
            description: "Pinterest-style masonry layout",
            tags: ["layout", "masonry"],
        },
        {
            name: "Flex Container",
            description: "Flexible box layout wrapper",
            tags: ["layout", "flex"],
        },
    ],
    cards: [
        {
            name: "Product Card",
            description: "E-commerce product display card",
            tags: ["card", "product"],
        },
        {
            name: "Profile Card",
            description: "User profile information card",
            tags: ["card", "profile"],
        },
        { name: "Article Card", description: "Blog post preview card", tags: ["card", "article"] },
        {
            name: "Pricing Card",
            description: "Subscription pricing display",
            tags: ["card", "pricing"],
        },
    ],
    modals: [
        {
            name: "Confirmation Modal",
            description: "User confirmation dialog",
            tags: ["modal", "confirm"],
        },
        {
            name: "Image Gallery Modal",
            description: "Lightbox image viewer",
            tags: ["modal", "gallery"],
        },
        { name: "Form Modal", description: "Modal with embedded form", tags: ["modal", "form"] },
        {
            name: "Video Modal",
            description: "Video player in modal overlay",
            tags: ["modal", "video"],
        },
    ],
}

export function Home({ selectedCategory }) {
    const [hoveredComponent, setHoveredComponent] = useState(null)
    const [previewModal, setPreviewModal] = useState({ isOpen: false, component: null })
    const [codeModal, setCodeModal] = useState({ isOpen: false, component: null })

    const getComponents = () => {
        if (selectedCategory === "all") {
            return Object.values(componentData).flat()
        }
        return componentData[selectedCategory] || []
    }

    const components = getComponents()

    const openPreviewModal = (component) => {
        setPreviewModal({ isOpen: true, component })
        // Dispatch custom event to notify App component
        window.dispatchEvent(new CustomEvent("modalOpen"))
    }

    const openCodeModal = (component) => {
        setCodeModal({ isOpen: true, component })
        // Dispatch custom event to notify App component
        window.dispatchEvent(new CustomEvent("modalOpen"))
    }

    const closePreviewModal = () => {
        setPreviewModal({ isOpen: false, component: null })
        // Dispatch custom event to notify App component
        window.dispatchEvent(new CustomEvent("modalClose"))
    }

    const closeCodeModal = () => {
        setCodeModal({ isOpen: false, component: null })
        // Dispatch custom event to notify App component
        window.dispatchEvent(new CustomEvent("modalClose"))
    }

    return (
        <div className="home">
            <div className="home-container">
                <div className="home-header">
                    <h2 className="home-title glow-text">Components!</h2>
                    <p className="home-subtitle">Explore my collection of reusable React components</p>
                </div>

                <div className="components-grid">
                    {components.map((component, index) => (
                        <div
                            key={`${selectedCategory}-${component.name}`}
                            className="component-card celestial-border hover-glow"
                            onMouseEnter={() => setHoveredComponent(component.name)}
                            onMouseLeave={() => setHoveredComponent(null)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-decoration">
                                <div className="decoration-dot primary"></div>
                                <div className="decoration-dot secondary"></div>
                                <div className="decoration-dot tertiary"></div>
                            </div>

                            <div className="card-content">
                                <div className="card-header">
                                    <h3 className="card-title">{component.name}</h3>
                                </div>

                                <p className="card-description">{component.description}</p>

                                <div className="card-tags">
                                    {component.tags.map((tag) => (
                                        <span key={tag} className="tag">
                      #{tag}
                    </span>
                                    ))}
                                </div>

                                <div className="card-actions">
                                    <button className="action-btn primary" onClick={() => openPreviewModal(component)}>
                                        <span className="btn-icon">👁️</span>
                                        <span>Preview</span>
                                    </button>
                                    <button className="action-btn secondary" onClick={() => openCodeModal(component)}>
                                        <span className="btn-icon">📋</span>
                                        <span>Code</span>
                                    </button>
                                    <button className="action-btn tertiary">
                                        <span className="btn-icon">🔗</span>
                                    </button>
                                </div>
                            </div>

                            {hoveredComponent === component.name && <div className="card-overlay"></div>}
                        </div>
                    ))}
                </div>

                {components.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">🌌</div>
                        <h3 className="empty-title">No Components Found</h3>
                        <p className="empty-description">This category is still being populated with amazing components...</p>
                    </div>
                )}
            </div>

            <PreviewModal isOpen={previewModal.isOpen} component={previewModal.component} onClose={closePreviewModal} />

            <CodeModal isOpen={codeModal.isOpen} component={codeModal.component} onClose={closeCodeModal} />
        </div>
    )
}
