"use client"

import { useState, useEffect } from "react"
import "./TypeWriter.css"

export function TypeWriter({
                               texts = ["Hello World!", "Welcome to the future!", "This is amazing!"],
                               speed = 100,
                               deleteSpeed = 50,
                               pauseTime = 2000,
                               loop = true,
                               cursor = true,
                               cursorChar = "|",
                               className = "",
                           }) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const currentFullText = texts[currentTextIndex]

        const timeout = setTimeout(
            () => {
                if (isPaused) {
                    setIsPaused(false)
                    setIsDeleting(true)
                    return
                }

                if (isDeleting) {
                    // Deleting characters
                    if (currentText.length > 0) {
                        setCurrentText(currentFullText.substring(0, currentText.length - 1))
                    } else {
                        // Move to next text
                        setIsDeleting(false)
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
                    }
                } else {
                    // Adding characters
                    if (currentText.length < currentFullText.length) {
                        setCurrentText(currentFullText.substring(0, currentText.length + 1))
                    } else {
                        // Pause before deleting (if looping)
                        if (loop) {
                            setIsPaused(true)
                        }
                    }
                }
            },
            isPaused ? pauseTime : isDeleting ? deleteSpeed : speed,
        )

        return () => clearTimeout(timeout)
    }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseTime, loop])

    return (
        <div className={`typewriter ${className}`}>
      <span className="typewriter-text">
        {currentText}
          {cursor && <span className="typewriter-cursor">{cursorChar}</span>}
      </span>
        </div>
    )
}
