"use client"
import { useState } from "react"
import "./DynamicTypography.css"

export function DynamicTypography() {
    const [currentAnimation, setCurrentAnimation] = useState("wave")
    const [text, setText] = useState("COSMIC TYPOGRAPHY")

    const animations = [
        { id: "wave", name: "Wave Motion", description: "Text flows like cosmic waves" },
        { id: "building", name: "Text Building", description: "Letters stack like skyscrapers" },
        { id: "matrix", name: "Matrix Rain", description: "Digital rain effect" },
        { id: "explosion", name: "Big Bang", description: "Letters explode from center" },
        { id: "gravity", name: "Gravity Pull", description: "Text falls with physics" },
        { id: "spiral", name: "Galaxy Spiral", description: "Text spirals like a galaxy" },
    ]

    const renderWaveText = () => {
        return text.split("").map((char, index) => (
            <span key={index} className="wave-char" style={{ animationDelay: `${index * 0.1}s` }}>
        {char === " " ? "\u00A0" : char}
      </span>
        ))
    }

    const renderBuildingText = () => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                className="building-char"
                style={{
                    animationDelay: `${index * 0.2}s`,
                    left: `${index * 2}rem`,
                }}
            >
        {char === " " ? "\u00A0" : char}
      </span>
        ))
    }

    const renderMatrixText = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split("")
        return Array.from({ length: 20 }, (_, col) => (
            <div key={col} className="matrix-column" style={{ left: `${col * 5}%` }}>
                {Array.from({ length: 15 }, (_, row) => (
                    <span
                        key={row}
                        className="matrix-char"
                        style={{
                            animationDelay: `${(col + row) * 0.1}s`,
                            top: `${row * 2}rem`,
                        }}
                    >
            {chars[Math.floor(Math.random() * chars.length)]}
          </span>
                ))}
            </div>
        ))
    }

    const renderExplosionText = () => {
        return text.split("").map((char, index) => {
            const angle = (index / text.length) * 360
            const distance = 100 + Math.random() * 200
            return (
                <span
                    key={index}
                    className="explosion-char"
                    style={{
                        "--angle": `${angle}deg`,
                        "--distance": `${distance}px`,
                        animationDelay: `${index * 0.05}s`,
                    }}
                >
          {char === " " ? "\u00A0" : char}
        </span>
            )
        })
    }

    const renderGravityText = () => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                className="gravity-char"
                style={{
                    animationDelay: `${index * 0.1}s`,
                    left: `${index * 3}rem`,
                }}
            >
        {char === " " ? "\u00A0" : char}
      </span>
        ))
    }

    const renderSpiralText = () => {
        return text.split("").map((char, index) => {
            const progress = index / text.length
            const angle = progress * 720 // 2 full rotations
            const radius = progress * 150
            return (
                <span
                    key={index}
                    className="spiral-char"
                    style={{
                        "--angle": `${angle}deg`,
                        "--radius": `${radius}px`,
                        animationDelay: `${index * 0.1}s`,
                    }}
                >
          {char === " " ? "\u00A0" : char}
        </span>
            )
        })
    }

    const renderCurrentAnimation = () => {
        switch (currentAnimation) {
            case "wave":
                return renderWaveText()
            case "building":
                return renderBuildingText()
            case "matrix":
                return renderMatrixText()
            case "explosion":
                return renderExplosionText()
            case "gravity":
                return renderGravityText()
            case "spiral":
                return renderSpiralText()
            default:
                return renderWaveText()
        }
    }

    return (
        <div className="dynamic-typography">
            <div className="typography-controls">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value.toUpperCase())}
                    className="text-input"
                    placeholder="Enter your text..."
                />
                <div className="animation-buttons">
                    {animations.map((anim) => (
                        <button
                            key={anim.id}
                            onClick={() => setCurrentAnimation(anim.id)}
                            className={`anim-button ${currentAnimation === anim.id ? "active" : ""}`}
                            title={anim.description}
                        >
                            {anim.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`typography-display ${currentAnimation}`}>{renderCurrentAnimation()}</div>
        </div>
    )
}
