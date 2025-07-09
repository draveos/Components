"use client"

import { useState, useMemo } from "react"
import { componentCategories, getComponentsByCategory, searchComponents } from "../component-registry"
import { ComponentPreview } from "../components/ComponentPreview"
import { CodeModal } from "../components/CodeModal"
import { PreviewModal } from "../components/PreviewModal"
import "./Home.css"

export function Home({ selectedCategory }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedComponent, setSelectedComponent] = useState(null)
    const [showCodeModal, setShowCodeModal] = useState(false)
    const [showPreviewModal, setShowPreviewModal] = useState(false)

    const componentsToDisplay = useMemo(() => {
        if (searchQuery) {
            return searchComponents(searchQuery)
        }
        return getComponentsByCategory(selectedCategory)
    }, [selectedCategory, searchQuery])

    const handleViewCode = (component) => {
        setSelectedComponent(component)
        setShowCodeModal(true)
    }

    const handlePreview = (component) => {
        setSelectedComponent(component)
        setShowPreviewModal(true)
    }

    return (
        <div className="home">
            <div className="home__hero">
                <h1 className="home__title">
                    <span className="home__title-word">Component</span>
                    <span className="home__title-word">Library</span>
                </h1>
                <p className="home__subtitle">Celestial UI/UX components..to be used later!</p>

                <div className="home__search">
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="home__search-input"
                    />
                    <div className="home__search-icon">🔍</div>
                </div>
            </div>

            <div className="home__content">
                {searchQuery ? (
                    <div className="home__search-results">
                        <h2 className="home__section-title">
                            Search Results for "{searchQuery}" : {componentsToDisplay.length} results
                        </h2>
                        <div className="home__components-grid">
                            {componentsToDisplay.map((component, index) => (
                                <ComponentCard
                                    key={`${component.name}-${index}`}
                                    component={component}
                                    onViewCode={() => handleViewCode(component)}
                                    onPreview={() => handlePreview(component)}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    componentCategories.map((category) => {
                        const categoryComponents = getComponentsByCategory(category.id)
                        if (selectedCategory !== "all" && selectedCategory !== category.id) {
                            return null // Only render the selected category or all
                        }
                        return (
                            <section key={category.id} className="home__category">
                                <div className="home__category-header">
                                    <div className="home__category-icon">{category.icon}</div>
                                    <div>
                                        <h2 className="home__category-title">{category.name}</h2>
                                        <p className="home__category-description">{category.description}</p>
                                    </div>
                                </div>

                                <div className="home__components-grid">
                                    {categoryComponents.map((component, index) => (
                                        <ComponentCard
                                            key={`${component.name}-${index}`}
                                            component={component}
                                            onViewCode={() => handleViewCode(component)}
                                            onPreview={() => handlePreview(component)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )
                    })
                )}
            </div>

            {/* Modals */}
            <CodeModal isOpen={showCodeModal} component={selectedComponent} onClose={() => setShowCodeModal(false)} />

            <PreviewModal
                isOpen={showPreviewModal}
                component={selectedComponent}
                onClose={() => setShowPreviewModal(false)}
            />
        </div>
    )
}

function ComponentCard({ component, onViewCode, onPreview }) {
    // Add safety check for tags
    const safeTags = component.tags || []

    return (
        <div className="component-card">
            <div className="component-card__preview">
                <ComponentPreview component={component} />
            </div>

            <div className="component-card__info">
                <h3 className="component-card__name">{component.name}</h3>
                <p className="component-card__description">{component.description}</p>

                <div className="component-card__tags">
                    {safeTags.slice(0, 3).map((tag) => (
                        <span key={tag} className="component-card__tag">
              #{tag}
            </span>
                    ))}
                </div>

                <div className="component-card__actions">
                    <button className="component-card__button component-card__button--preview" onClick={onPreview}>
                        Preview
                    </button>
                    <button className="component-card__button component-card__button--code" onClick={onViewCode}>
                        View Code
                    </button>
                </div>
            </div>
        </div>
    )
}
