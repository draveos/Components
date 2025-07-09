"use client"
import { useState } from "react"
import "./Experimental.css"

export function ExperimentalFeature({ title, description, className = "" }) {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className={`cosmic-experimental-feature ${className}`}>
            <div className="cosmic-experimental-feature__header">
                <span className="cosmic-experimental-feature__icon">🧪</span>
                <h3 className="cosmic-experimental-feature__title">{title}</h3>
                <button
                    className={`cosmic-experimental-feature__toggle ${isActive ? "active" : ""}`}
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? "Deactivate" : "Activate"}
                </button>
            </div>
            <p className="cosmic-experimental-feature__description">{description}</p>
            {isActive && (
                <div className="cosmic-experimental-feature__content">
                    <p>
                        This feature is currently active! Expect unpredictable, yet potentially groundbreaking, results. Proceed
                        with caution.
                    </p>
                    <div className="cosmic-experimental-feature__visual">
                        <div className="cosmic-experimental-feature__particle"></div>
                        <div className="cosmic-experimental-feature__particle particle--2"></div>
                        <div className="cosmic-experimental-feature__particle particle--3"></div>
                    </div>
                </div>
            )}
        </div>
    )
}
