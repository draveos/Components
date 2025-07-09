"use client"

import { useState, useEffect, useRef } from "react"
import "./BounceIn.css"

export function BounceIn({
                             children,
                             direction = "up",
                             duration = 0.8,
                             delay = 0,
                             threshold = 0.1,
                             triggerOnce = true,
                         }) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)
    const elementRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
                    setIsVisible(true)
                    if (triggerOnce) {
                        setHasTriggered(true)
                    }
                } else if (!triggerOnce && !entry.isIntersecting) {
                    setIsVisible(false)
                }
            },
            { threshold },
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [threshold, triggerOnce, hasTriggered])

    return (
        <div
            ref={elementRef}
            className={`bounce-in bounce-in--${direction} ${isVisible ? "bounce-in--visible" : ""}`}
            style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    )
}
