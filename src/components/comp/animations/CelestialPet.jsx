"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import "./CelestialPet.css"

export function CelestialPet() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [petPos, setPetPos] = useState({ x: 200, y: 200 })
    const [mood, setMood] = useState("curious") // curious, happy, sleepy, excited, eating, playful, loving
    const [isBeingPetted, setIsBeingPetted] = useState(false)
    const [treats, setTreats] = useState([])
    const [hearts, setHearts] = useState([])
    const [sparkles, setSparkles] = useState([])
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
    const [blinkState, setBlinkState] = useState(false)
    const [happiness, setHappiness] = useState(50)
    const [energy, setEnergy] = useState(80)
    const [petCount, setPetCount] = useState(0)
    const [lastInteraction, setLastInteraction] = useState(Date.now())
    const [isJumping, setIsJumping] = useState(false)
    const [sleepiness, setSleepiness] = useState(0)
    const [stars, setStars] = useState([])
    const [petName, setPetName] = useState("Stardust")
    const [showNameInput, setShowNameInput] = useState(false)
    const petRef = useRef(null)
    const containerRef = useRef(null)

    // Initialize background stars
    useEffect(() => {
        const newStars = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 0.5 + 0.5,
            delay: Math.random() * 3,
        }))
        setStars(newStars)
    }, [])

    // Blinking animation
    useEffect(() => {
        const blinkInterval = setInterval(
            () => {
                if (mood !== "sleepy") {
                    // Only blink if not sleepy
                    setBlinkState(true)
                    setTimeout(() => setBlinkState(false), 150)
                }
            },
            2000 + Math.random() * 3000,
        )
        return () => clearInterval(blinkInterval)
    }, [mood])

    // Mood and energy management
    useEffect(() => {
        const moodInterval = setInterval(() => {
            const timeSinceInteraction = Date.now() - lastInteraction
            // Decrease energy over time
            setEnergy((prev) => Math.max(0, prev - 0.5))
            // Increase sleepiness over time
            setSleepiness((prev) => Math.min(100, prev + 0.3))
            // Decrease happiness slowly if not interacted with
            if (timeSinceInteraction > 10000) {
                setHappiness((prev) => Math.max(0, prev - 0.2))
            }

            // Auto mood changes based on stats
            if (sleepiness > 80) {
                setMood("sleepy")
            } else if (happiness > 80) {
                setMood("happy")
            } else if (energy > 70) {
                setMood("playful")
            } else if (happiness < 30) {
                setMood("curious")
            }
        }, 1000)

        return () => clearInterval(moodInterval)
    }, [lastInteraction, sleepiness, happiness, energy])

    // Auto sparkle generation
    useEffect(() => {
        const sparkleInterval = setInterval(() => {
            if (mood === "happy" || mood === "playful") {
                const newSparkles = Array.from({ length: 3 }, (_, i) => ({
                    id: Date.now() + i,
                    x: petPos.x + Math.random() * 100,
                    y: petPos.y + Math.random() * 80,
                    delay: i * 0.1,
                    color: Math.random() > 0.5 ? "gold" : "silver",
                }))
                setSparkles((prev) => [...prev, ...newSparkles])
                setTimeout(() => {
                    setSparkles((prev) => prev.filter((sparkle) => !newSparkles.includes(sparkle)))
                }, 2000)
            }
        }, 3000)

        return () => clearInterval(sparkleInterval)
    }, [mood, petPos])

    // Track mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener("mousemove", handleMouseMove)
            return () => container.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    // Calculate eye direction based on mouse position
    useEffect(() => {
        const petCenter = {
            x: petPos.x + 50,
            y: petPos.y + 40,
        }

        const dx = mousePos.x - petCenter.x
        const dy = mousePos.y - petCenter.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0) {
            const maxOffset = 3
            setEyeOffset({
                x: Math.max(-maxOffset, Math.min(maxOffset, (dx / distance) * maxOffset)),
                y: Math.max(-maxOffset, Math.min(maxOffset, (dy / distance) * maxOffset)),
            })
        }
    }, [mousePos, petPos])

    // Enhanced pet movement towards treats
    useEffect(() => {
        if (treats.length > 0 && mood !== "eating" && mood !== "sleepy") {
            const nearestTreat = treats[0]
            const dx = nearestTreat.x - (petPos.x + 50)
            const dy = nearestTreat.y - (petPos.y + 40)
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance > 40) {
                const speed = energy > 50 ? 2.5 : 1.5
                setPetPos((prev) => ({
                    x: Math.max(0, Math.min(320, prev.x + (dx / distance) * speed)),
                    y: Math.max(0, Math.min(280, prev.y + (dy / distance) * speed)),
                }))
                setMood("excited")
                setIsJumping(true)
                setTimeout(() => setIsJumping(false), 200)
            } else {
                // Eat the treat with enhanced effects
                setTreats((prev) => prev.slice(1))
                setMood("eating")
                setHappiness((prev) => Math.min(100, prev + 15))
                setEnergy((prev) => Math.min(100, prev + 10))
                setSleepiness((prev) => Math.max(0, prev - 10))
                setLastInteraction(Date.now())

                // Create eating sparkles
                const eatingSparkles = Array.from({ length: 8 }, (_, i) => ({
                    id: Date.now() + i,
                    x: petPos.x + Math.random() * 100,
                    y: petPos.y + Math.random() * 80,
                    delay: i * 0.05,
                    color: "gold",
                }))
                setSparkles((prev) => [...prev, ...eatingSparkles])

                setTimeout(() => {
                    setMood("happy")
                    setSparkles((prev) => prev.filter((sparkle) => !eatingSparkles.includes(sparkle)))
                }, 2000)
            }
        }
    }, [treats, petPos, mood, energy])

    // Handle clicking on pet (petting)
    const handlePetClick = useCallback(() => {
        setIsBeingPetted(true)
        setPetCount((prev) => prev + 1)
        setLastInteraction(Date.now())

        const newHappiness = Math.min(100, happiness + 8)
        setHappiness(newHappiness)
        setSleepiness((prev) => Math.max(0, prev - 5))

        if (newHappiness > 90) {
            setMood("loving")
        } else {
            setMood("happy")
        }

        // Create enhanced heart particles
        const heartCount = Math.min(8, Math.floor(petCount / 3) + 3)
        const newHearts = Array.from({ length: heartCount }, (_, i) => ({
            id: Date.now() + i,
            x: petPos.x + Math.random() * 100,
            y: petPos.y + Math.random() * 80,
            delay: i * 0.1,
            size: Math.random() * 0.5 + 0.8,
            color: petCount > 10 ? "rainbow" : "pink",
        }))
        setHearts((prev) => [...prev, ...newHearts])

        // Create sparkles
        const newSparkles = Array.from({ length: 6 }, (_, i) => ({
            id: Date.now() + i + 1000,
            x: petPos.x + Math.random() * 100,
            y: petPos.y + Math.random() * 80,
            delay: i * 0.15,
            color: "gold",
        }))
        setSparkles((prev) => [...prev, ...newSparkles])

        setTimeout(() => {
            setIsBeingPetted(false)
            setMood("curious")
        }, 1500)

        // Remove effects after animation
        setTimeout(() => {
            setHearts((prev) => prev.filter((heart) => !newHearts.includes(heart)))
            setSparkles((prev) => prev.filter((sparkle) => !newSparkles.includes(sparkle)))
        }, 3000)
    }, [petPos, happiness, petCount])

    // Handle right-click to throw treat
    const handleContextMenu = useCallback((e) => {
        e.preventDefault()
        const rect = containerRef.current.getBoundingClientRect()
        const newTreat = {
            id: Date.now(),
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            type: Math.random() > 0.5 ? "bone" : "star",
        }
        setTreats((prev) => [...prev, newTreat])
        setLastInteraction(Date.now())
    }, [])

    // Handle double-click for special interaction
    const handleDoubleClick = useCallback(() => {
        if (mood !== "sleepy") {
            setMood("playful")
            setIsJumping(true)
            setEnergy((prev) => Math.max(0, prev - 10))
            setHappiness((prev) => Math.min(100, prev + 5))
            setLastInteraction(Date.now())

            setTimeout(() => {
                setIsJumping(false)
                setMood("happy")
            }, 1000)
        }
    }, [mood])

    // Sleep/wake cycle
    const handleSleepToggle = useCallback(() => {
        if (mood === "sleepy") {
            setMood("curious")
            setEnergy(100)
            setSleepiness(0)
            setHappiness((prev) => Math.min(100, prev + 20))
        } else {
            setMood("sleepy")
            setSleepiness(100)
        }
        setLastInteraction(Date.now())
    }, [mood])

    const getMoodEmoji = (currentMood) => {
        const emojis = {
            happy: "😊",
            curious: "🤔",
            excited: "🤩",
            eating: "😋",
            sleepy: "😴",
            playful: "🥳",
            loving: "🥰",
        }
        return emojis[currentMood] || "😊"
    }

    const getStatClass = (value) => {
        if (value > 70) return "high"
        if (value > 40) return "medium"
        return "low"
    }

    return (
        <div className="celestial-pet-container">
            <div ref={containerRef} className="pet-world" onContextMenu={handleContextMenu}>
                {/* Background stars */}
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="background-star"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            fontSize: `${star.size}rem`,
                            animationDelay: `${star.delay}s`,
                        }}
                    >
                        ✩
                    </div>
                ))}

                {/* Instructions */}
                <div className="pet-instructions"> Left-click to pet • Right-click for treats • Double-click to play</div>

                {/* Pet stats */}
                <div className="pet-stats">
                    <div className="stat-row">
                        <span>💖</span>
                        <div className="stat-bar">
                            <div className={`stat-fill ${getStatClass(happiness)}`} style={{ width: `${happiness}%` }} />
                        </div>
                    </div>
                    <div className="stat-row">
                        <span>⚡</span>
                        <div className="stat-bar">
                            <div className={`stat-fill ${getStatClass(energy)}`} style={{ width: `${energy}%` }} />
                        </div>
                    </div>
                </div>

                {/* Pet name display */}
                <div className="pet-name">
                    {showNameInput ? (
                        <input
                            type="text"
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            onBlur={() => setShowNameInput(false)}
                            onKeyPress={(e) => e.key === "Enter" && setShowNameInput(false)}
                            className="pet-name-input"
                            autoFocus
                        />
                    ) : (
                        <div className="pet-name-display" onClick={() => setShowNameInput(true)}>
                            {petName}
                        </div>
                    )}
                </div>

                {/* Pet Character */}
                <div
                    ref={petRef}
                    className={`celestial-pet ${isJumping ? "jumping" : ""} ${isBeingPetted ? "being-petted" : ""}`}
                    style={{
                        left: `${petPos.x}px`,
                        top: `${petPos.y}px`,
                    }}
                    onClick={handlePetClick}
                    onDoubleClick={handleDoubleClick}
                >
                    {/* Pet Body */}
                    <div className={`pet-body mood-${mood}`}>
                        {/* Cosmic pattern */}
                        <div className="cosmic-pattern" />


                        {/* Eyes */}
                        <div className="pet-eyes">
                            <div className={`pet-eye ${blinkState ? "blinking" : ""} ${mood === "sleepy" ? "closed-for-sleep" : ""}`}>
                                {mood !== "sleepy" && !blinkState && (
                                    <div
                                        className="pet-pupil"
                                        style={{
                                            transform: `translate(calc(-50% + ${eyeOffset.x}px), calc(-50% + ${eyeOffset.y}px))`,
                                        }}
                                    />
                                )}
                            </div>
                            <div className={`pet-eye ${blinkState ? "blinking" : ""} ${mood === "sleepy" ? "closed-for-sleep" : ""}`}>
                                {mood !== "sleepy" && !blinkState && (
                                    <div
                                        className="pet-pupil"
                                        style={{
                                            transform: `translate(calc(-50% + ${eyeOffset.x}px), calc(-50% + ${eyeOffset.y}px))`,
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Nose */}
                        <div className="pet-nose" />

                        {/* Mouth */}
                        <div
                            className={`pet-mouth mood-${mood === "happy" || mood === "loving" ? "happy" : mood === "excited" || mood === "playful" ? "excited" : mood === "sleepy" ? "sleepy" : "default"}`}
                        />

                        {/* Ears */}
                        <div className="pet-ears">
                            <div className={`pet-ear1 ${mood === "excited" || mood === "playful" ? "excited" : ""}`} />
                            <div className={`pet-ear2 ${mood === "excited" || mood === "playful" ? "playful" : ""}`} />
                        </div>

                        {/* Tail */}
                        <div className={`pet-tail mood-${mood}`} />

                        {/* Cheeks (when happy) */}
                        {(mood === "happy" || mood === "loving") && (
                            <div className="pet-cheeks">
                                <div className="pet-cheek" />
                                <div className="pet-cheek" />
                            </div>
                        )}
                    </div>

                    {/* Mood indicator */}
                    <div className="mood-indicator">{getMoodEmoji(mood)}</div>

                    {/* Sleep indicator */}
                    {mood === "sleepy" && <div className="sleep-indicator">💤</div>}
                </div>

                {/* Treats */}
                {treats.map((treat) => (
                    <div
                        key={treat.id}
                        className="treat"
                        style={{
                            left: `${treat.x}px`,
                            top: `${treat.y}px`,
                        }}
                    >
                        {treat.type === "bone" ? "🦴" : "⭐"}
                    </div>
                ))}

                {/* Heart particles */}
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className={`heart-particle ${heart.color === "rainbow" ? "rainbow" : ""}`}
                        style={{
                            left: `${heart.x}px`,
                            top: `${heart.y}px`,
                            animationDelay: `${heart.delay}s`,
                            fontSize: `${heart.size}rem`,
                        }}
                    >
                        {heart.color === "rainbow" ? "💖" : "💕"}
                    </div>
                ))}


                {/* Sleep button */}
                <button onClick={handleSleepToggle} className="sleep-button">
                    {mood === "sleepy" ? "🌅 Wake Up" : "🌙 Sleep"}
                </button>
            </div>

            {/* Pet care tips */}
            <div className="pet-care-tips">
                <p>
                    💡 <strong>Tip:</strong> {petName} gets happier when you pet them, and more energetic when you play! Try
                    different interactions to discover all their moods.
                </p>
            </div>
        </div>
    )
}
