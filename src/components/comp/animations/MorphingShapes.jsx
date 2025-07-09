"use client"

import { useState, useEffect } from "react"
import "./MorphingShapes.css"

export function MorphingShapes({
                                   shapes = ["circle", "square", "triangle", "star"],
                                   autoMorph = true,
                                   morphSpeed = 2000,
                                   size = 100,
                                   colors = ["#fbbf24", "#a855f7", "#06b6d4", "#f59e0b"],
                               }) {
    const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // Auto morphing
    useEffect(() => {
        if (autoMorph) {
            const interval = setInterval(() => {
                morphToNext()
            }, morphSpeed)

            return () => clearInterval(interval)
        }
    }, [autoMorph, morphSpeed, currentShapeIndex])

    const morphToNext = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentShapeIndex((prev) => (prev + 1) % shapes.length)
            setIsAnimating(false)
        }, 300)
    }

    const morphToShape = (index) => {
        if (!autoMorph && index !== currentShapeIndex) {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentShapeIndex(index)
                setIsAnimating(false)
            }, 300)
        }
    }

    const getShapePath = (shape) => {
        const center = size / 2
        const radius = size * 0.4

        switch (shape) {
            case "circle":
                return `M ${center - radius} ${center} A ${radius} ${radius} 0 1 1 ${center + radius} ${center} A ${radius} ${radius} 0 1 1 ${center - radius} ${center}`

            case "square":
                const side = radius * 1.4
                return `M ${center - side} ${center - side} L ${center + side} ${center - side} L ${center + side} ${center + side} L ${center - side} ${center + side} Z`

            case "triangle":
                return `M ${center} ${center - radius} L ${center + radius * 0.866} ${center + radius * 0.5} L ${center - radius * 0.866} ${center + radius * 0.5} Z`

            case "star":
                let starPath = ""
                for (let i = 0; i < 10; i++) {
                    const angle = (i * Math.PI) / 5
                    const r = i % 2 === 0 ? radius : radius * 0.5
                    const x = center + r * Math.cos(angle - Math.PI / 2)
                    const y = center + r * Math.sin(angle - Math.PI / 2)
                    starPath += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
                }
                return starPath + " Z"

            default:
                return getShapePath("circle")
        }
    }

    const currentColor = colors[currentShapeIndex % colors.length]

    return (
        <div className="morphing-shapes-container">
            <div className="shape-display">
                <svg width={size} height={size} className={`morphing-svg ${isAnimating ? "animating" : ""}`}>
                    <defs>
                        <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={currentColor} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={currentColor} stopOpacity="0.4" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <path
                        d={getShapePath(shapes[currentShapeIndex])}
                        fill="url(#shapeGradient)"
                        stroke={currentColor}
                        strokeWidth="2"
                        filter="url(#glow)"
                        className="morphing-path"
                    />
                </svg>

                <div className="shape-info">
                    <h3 className="shape-name">{shapes[currentShapeIndex]}</h3>
                    <div className="shape-progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: autoMorph ? "100%" : `${((currentShapeIndex + 1) / shapes.length) * 100}%`,
                                backgroundColor: currentColor,
                                animationDuration: autoMorph ? `${morphSpeed}ms` : "none",
                            }}
                        />
                    </div>
                </div>
            </div>

            {!autoMorph && (
                <div className="shape-controls">
                    {shapes.map((shape, index) => (
                        <button
                            key={shape}
                            onClick={() => morphToShape(index)}
                            className={`shape-button ${index === currentShapeIndex ? "active" : ""}`}
                            style={{ borderColor: colors[index % colors.length] }}
                        >
                            {shape}
                        </button>
                    ))}
                </div>
            )}

            <div className="morph-status">
                {autoMorph ? <p>🔄 Auto-morphing every {morphSpeed / 1000}s</p> : <p>🎯 Click shapes to morph manually</p>}
            </div>
        </div>
    )
}
