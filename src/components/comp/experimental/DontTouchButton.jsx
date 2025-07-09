"use client"
import { useState, useRef } from "react"
import "./DontTouchButton.css"

export function DontTouchButton({ className = "" }) {
    const [clickCount, setClickCount] = useState(0)
    const [isShaking, setIsShaking] = useState(false)
    const [warnings, setWarnings] = useState([])
    const [isDestroying, setIsDestroying] = useState(false)
    const buttonRef = useRef(null)
    const containerRef = useRef(null)

    const warningMessages = [
        "I warned you...",
        "This is your last chance!",
        "You really shouldn't have done that...",
        "Now look what you've done!",
        "The chaos has begun...",
        "There's no going back now!",
        "You've doomed us all!",
        "SYSTEM OVERLOAD IMMINENT!",
        "I told you not to touch it! 😠",
        "Seriously, STOP clicking! ⚠️",
        "You're making me angry... 😡",
        "FINAL WARNING! Do NOT click again! 🚨",
        "That's it! You've done it now! 💥",
    ]

    const handleClick = () => {
        const newCount = clickCount + 1
        setClickCount(newCount)

        // Add warning message
        if (newCount <= warningMessages.length) {
            const newWarning = {
                id: Date.now(),
                message: warningMessages[newCount - 1],
                intensity: newCount,
            }
            setWarnings((prev) => [...prev, newWarning])

            // Remove warning after delay
            setTimeout(() => {
                setWarnings((prev) => prev.filter((w) => w.id !== newWarning.id))
            }, 3000)
        }

        // Escalating effects
        if (newCount === 1) {
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 1000)
        } else if (newCount === 2) {
            // Make button run away
            if (buttonRef.current) {
                const button = buttonRef.current
                const container = containerRef.current
                const containerRect = container.getBoundingClientRect()
                const buttonRect = button.getBoundingClientRect()

                const maxX = containerRect.width - buttonRect.width
                const maxY = containerRect.height - buttonRect.height

                const newX = Math.random() * maxX
                const newY = Math.random() * maxY

                button.style.position = "absolute"
                button.style.left = `${newX}px`
                button.style.top = `${newY}px`
                button.style.transition = "all 0.5s ease"
            }
        } else if (newCount === 3) {
            // Button multiplies
            createFakeButtons()
        } else if (newCount === 4) {
            // Screen glitch effect
            document.body.classList.add("glitch-mode")
            setTimeout(() => {
                document.body.classList.remove("glitch-mode")
            }, 2000)
        } else if (newCount >= 5) {
            // CHAOS MODE
            setIsDestroying(true)
            activateChaosMode()
        }
    }

    const createFakeButtons = () => {
        const container = containerRef.current
        if (!container) return

        for (let i = 0; i < 5; i++) {
            const fakeButton = document.createElement("button")
            fakeButton.textContent = "DON'T TOUCH THIS!"
            fakeButton.className = "dont-touch-button fake-button"
            fakeButton.style.position = "absolute"
            fakeButton.style.left = `${Math.random() * 80}%`
            fakeButton.style.top = `${Math.random() * 80}%`
            fakeButton.style.animation = `fadeIn 0.5s ease ${i * 0.1}s forwards`

            fakeButton.onclick = () => {
                fakeButton.style.animation = "explode 0.5s ease forwards"
                setTimeout(() => fakeButton.remove(), 500)
            }

            container.appendChild(fakeButton)

            // Remove after 5 seconds
            setTimeout(() => {
                if (fakeButton.parentNode) {
                    fakeButton.remove()
                }
            }, 5000)
        }
    }

    const activateChaosMode = () => {
        // Add chaos styles to body
        document.body.classList.add("chaos-mode")

        // Create screen cracks
        createScreenCracks()

        // Invert colors randomly
        const invertInterval = setInterval(() => {
            document.body.style.filter = Math.random() > 0.5 ? "invert(1) hue-rotate(180deg)" : "none"
        }, 200)

        // Make everything shake
        const elements = document.querySelectorAll("*")
        elements.forEach((el) => {
            if (Math.random() > 0.7) {
                el.classList.add("chaos-shake")
            }
        })

        // Stop chaos after 10 seconds
        setTimeout(() => {
            document.body.classList.remove("chaos-mode")
            document.body.style.filter = "none"
            clearInterval(invertInterval)

            elements.forEach((el) => {
                el.classList.remove("chaos-shake")
            })

            // Remove screen cracks
            const cracks = document.querySelectorAll(".screen-crack")
            cracks.forEach((crack) => crack.remove())

            setIsDestroying(false)
            setClickCount(0)
            setWarnings([])
        }, 10000)
    }

    const createScreenCracks = () => {
        for (let i = 0; i < 10; i++) {
            const crack = document.createElement("div")
            crack.className = "screen-crack"
            crack.style.position = "fixed"
            crack.style.top = `${Math.random() * 100}%`
            crack.style.left = `${Math.random() * 100}%`
            crack.style.width = `${50 + Math.random() * 200}px`
            crack.style.height = "2px"
            crack.style.background = "#ff0000"
            crack.style.transform = `rotate(${Math.random() * 360}deg)`
            crack.style.zIndex = "99999"
            crack.style.animation = `crackGrow 0.5s ease ${i * 0.1}s forwards`

            document.body.appendChild(crack)
        }
    }

    return (
        <div className={`dont-touch-container ${className}`} ref={containerRef}>
            <div className="warning-header">
                <h3 className="warning-title">⚠️ DANGER ZONE ⚠️</h3>
                <p className="warning-subtitle">
                    Whatever you do, <strong>DO NOT</strong> press the button below!
                </p>
            </div>

            <div className="warning-display">
                {warnings.map((warning) => (
                    <div key={warning.id} className={`warning-message intensity-${warning.intensity}`}>
                        {warning.message}
                    </div>
                ))}
            </div>

            <div className="button-area">
                <button
                    ref={buttonRef}
                    onClick={handleClick}
                    className={`dont-touch-button ${isShaking ? "shaking" : ""} ${clickCount >= 2 ? "running" : ""}`}
                    style={{
                        left: `${clickCount >= 2 ? Math.random() * 80 + 10 : 50}%`,
                        top: `${clickCount >= 2 ? Math.random() * 80 + 10 : 50}%`,
                        background: clickCount >= 3 ? "#ff0000" : clickCount >= 1 ? "#ff6600" : "#8b5cf6",
                    }}
                >
                    {clickCount === 0 && "DON'T TOUCH"}
                    {clickCount === 1 && "SERIOUSLY DON'T"}
                    {clickCount === 2 && "STOP IT!"}
                    {clickCount === 3 && "YOU'RE IN TROUBLE!"}
                    {clickCount >= 4 && "CHAOS MODE!"}
                </button>

                {clickCount > 0 && (
                    <div className="click-counter">
                        Clicks: {clickCount} / 5
                        <div className="danger-meter">
                            <div className="danger-fill" style={{ width: `${(clickCount / 5) * 100}%` }} />
                        </div>
                    </div>
                )}
            </div>

            {isDestroying && (
                <div className="chaos-overlay">
                    <h1 className="chaos-title">YOU DID THIS!</h1>
                    <p className="chaos-subtitle">Hope you're happy now... 💀</p>
                </div>
            )}
        </div>
    )
}
