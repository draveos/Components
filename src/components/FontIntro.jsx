"use client"

import { useEffect, useState } from "react"
import "./FontIntro.css"

export function FontIntro({ onFinish }) {
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 1000),
            setTimeout(() => setPhase(2), 2500),
            setTimeout(() => setPhase(3), 4000),
            setTimeout(() => onFinish(), 6000),
        ]

        return () => timers.forEach(clearTimeout)
    }, [onFinish])

    return (
        <div className="intro-container">
            <div className="cosmic-background">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="intro-content">
                {phase >= 0 && (
                    <div className={`intro-phase ${phase >= 1 ? "fade-out" : ""}`}>
                        <div className="celestial-orb">
                            <div className="orb-ring"></div>
                            <div className="orb-center">✦</div>
                        </div>
                    </div>
                )}

                {phase >= 1 && (
                    <div className={`intro-phase ${phase >= 2 ? "fade-out" : ""}`}>
                        <h1 className="main-title">Component Library</h1>
                        <div className="title-underline"></div>
                    </div>
                )}

                {phase >= 2 && (
                    <div className={`intro-phase ${phase >= 3 ? "fade-out" : ""}`}>
                        <p className="subtitle">✨ Your Cosmic Collection of React Components ✨</p>
                        <div className="symbol-row">
                            {["☽", "✦", "☾", "✧", "☽"].map((symbol, i) => (
                                <span key={i} className="floating-symbol" style={{ animationDelay: `${i * 0.2}s` }}>
                  {symbol}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {phase >= 3 && (
                    <div className="intro-phase">
                        <div className="loading-text">
                            <span>Initializing Component Universe</span>
                            <div className="loading-dots">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
