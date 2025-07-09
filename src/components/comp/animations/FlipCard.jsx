"use client"

import React, { useState } from "react"
import "./FlipCard.css"

export function FlipCard({
                             frontContent,
                             backContent,
                             width = "300px",
                             height = "200px",
                             flipDirection = "horizontal",
                             autoFlip = false,
                             autoFlipInterval = 3000,
                         }) {
    const [isFlipped, setIsFlipped] = useState(false)

    React.useEffect(() => {
        if (autoFlip) {
            const interval = setInterval(() => {
                setIsFlipped((prev) => !prev)
            }, autoFlipInterval)

            return () => clearInterval(interval)
        }
    }, [autoFlip, autoFlipInterval])

    return (
        <div
            className={`flip-card ${flipDirection} ${isFlipped ? "flipped" : ""}`}
            style={{ width, height }}
            onClick={() => !autoFlip && setIsFlipped(!isFlipped)}
        >
            <div className="flip-card-inner">
                <div className="flip-card-front">{frontContent}</div>
                <div className="flip-card-back">{backContent}</div>
            </div>
        </div>
    )
}
