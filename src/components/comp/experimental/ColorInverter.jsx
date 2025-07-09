"use client"
import { useState, useEffect } from "react"
import "./ColorInverter.css"

export function ColorInverter() {
    const [currentFilter, setCurrentFilter] = useState("none")
    const [isActive, setIsActive] = useState(false)
    const [autoMode, setAutoMode] = useState(false)

    const filters = [
        { id: "none", name: "Normal", filter: "none", description: "Default appearance" },
        { id: "invert", name: "Invert", filter: "invert(1)", description: "Invert all colors" },
        { id: "sepia", name: "Sepia", filter: "sepia(1)", description: "Vintage sepia tone" },
        { id: "grayscale", name: "Grayscale", filter: "grayscale(1)", description: "Remove all colors" },
        { id: "hue-rotate", name: "Hue Shift", filter: "hue-rotate(180deg)", description: "Shift color spectrum" },
        { id: "saturate", name: "Hyper Saturate", filter: "saturate(3)", description: "Boost color intensity" },
        { id: "contrast", name: "High Contrast", filter: "contrast(2)", description: "Increase contrast" },
        { id: "brightness", name: "Bright Mode", filter: "brightness(1.5)", description: "Increase brightness" },
        { id: "blur", name: "Blur Vision", filter: "blur(2px)", description: "Blur everything" },
        {
            id: "psychedelic",
            name: "Psychedelic",
            filter: "hue-rotate(90deg) saturate(2) contrast(1.5)",
            description: "Trippy colors",
        },
        {
            id: "matrix",
            name: "Matrix Mode",
            filter: "hue-rotate(120deg) contrast(1.5) brightness(0.8)",
            description: "Green matrix effect",
        },
        {
            id: "nightmare",
            name: "Nightmare",
            filter: "invert(1) hue-rotate(180deg) saturate(2) contrast(1.5)",
            description: "Scary mode",
        },
    ]

    useEffect(() => {
        if (isActive) {
            document.body.style.filter = filters.find((f) => f.id === currentFilter)?.filter || "none"
            document.body.style.transition = "filter 0.5s ease"
        } else {
            document.body.style.filter = "none"
        }

        return () => {
            document.body.style.filter = "none"
            document.body.style.transition = ""
        }
    }, [currentFilter, isActive])

    useEffect(() => {
        let interval
        if (autoMode && isActive) {
            interval = setInterval(() => {
                const randomFilter = filters[Math.floor(Math.random() * filters.length)]
                setCurrentFilter(randomFilter.id)
            }, 2000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [autoMode, isActive])

    const handleFilterChange = (filterId) => {
        setCurrentFilter(filterId)
        setIsActive(true)
        setAutoMode(false)
    }

    const toggleActive = () => {
        setIsActive(!isActive)
        if (isActive) {
            setAutoMode(false)
        }
    }

    const startAutoMode = () => {
        setAutoMode(true)
        setIsActive(true)
    }

    const currentFilterObj = filters.find((f) => f.id === currentFilter)

    return (
        <div className="color-inverter">
            <div className="inverter-header">
                <h3 className="inverter-title">🎨 Reality Distortion Field</h3>
                <p className="inverter-subtitle">Transform your visual experience</p>
            </div>

            <div className="inverter-controls">
                <div className="main-controls">
                    <button onClick={toggleActive} className={`control-button ${isActive ? "active" : ""}`}>
                        {isActive ? "🔴 Disable Effects" : "🟢 Enable Effects"}
                    </button>

                    <button
                        onClick={startAutoMode}
                        className={`control-button auto-button ${autoMode ? "active" : ""}`}
                        disabled={!isActive}
                    >
                        {autoMode ? "⏹️ Stop Auto" : "🎲 Auto Mode"}
                    </button>
                </div>

                {isActive && (
                    <div className="current-filter">
                        <span className="filter-label">Current: </span>
                        <span className="filter-name">{currentFilterObj?.name}</span>
                        <span className="filter-desc">- {currentFilterObj?.description}</span>
                    </div>
                )}
            </div>

            <div className="filter-grid">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => handleFilterChange(filter.id)}
                        className={`filter-button ${currentFilter === filter.id && isActive ? "active" : ""}`}
                        disabled={!isActive && filter.id !== "none"}
                        title={filter.description}
                    >
                        <div className="filter-preview" style={{ filter: filter.filter }}>
                            <div className="preview-content">
                                <div className="preview-circle" />
                                <div className="preview-square" />
                                <div className="preview-triangle" />
                            </div>
                        </div>
                        <span className="filter-name">{filter.name}</span>
                    </button>
                ))}
            </div>

            {autoMode && (
                <div className="auto-mode-indicator">
                    <div className="indicator-pulse" />
                    <span>Auto Mode Active - Filters changing every 2 seconds</span>
                </div>
            )}

            <div className="warning-notice">⚠️ Warning: Some effects may cause visual discomfort. Use responsibly!</div>
        </div>
    )
}
