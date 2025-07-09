"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import "./ParticleSystem.css"

const DEFAULT_COLORS = ["#fbbf24", "#c991fb",
    "#08f1f1", "#9ca0ef", "#ffffff"]

export function ParticleSystem({
                                   particleCount = 50,
                                   particleType  = "circle",           // "circle" | "star" | "heart" | "diamond" | "sparkle"
                                   interactive   = true,
                                   colors        = DEFAULT_COLORS,     // 배열이면 자유롭게 변경
                                   speed         = 1,                  // 초기 속도 스케일
                                   size          = { min: 1, max: 7 }, // 파티클 직경(px)
                               }) {
    /* ─────────────────────────── refs & state ─────────────────────────── */
    const containerRef = useRef(null)
    const animationRef = useRef(null)
    const mousePosRef  = useRef({ x: -9999, y: -9999 })          // 시작은 화면 밖
    const [particles, setParticles] = useState([])

    /* ─────────────────────── 1) 의존성 안정화를 위한 키 ─────────────────────── */
    const colorsKey = useMemo(() => colors.join("|"), [colors])
    const sizeKey   = `${size.min}-${size.max}`

    /* ─────────────────────── 2) 파티클 초기화 ─────────────────────── */
    useEffect(() => {
        if (!containerRef.current) return

        const { offsetWidth: W, offsetHeight: H } = containerRef.current
        const newParticles = Array.from({ length: particleCount }, (_, id) => ({
            id,
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 1.5) * speed,
            vy: (Math.random() - 1.5) * speed,
            size: Math.random() * (size.max - size.min) + size.min,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: particleType,
            trail: [],
        }))
        setParticles(newParticles)
    }, [particleCount, particleType, speed, colorsKey, sizeKey])

    /* ─────────────────────── 3) 마우스 좌표 추적 ─────────────────────── */
    useEffect(() => {
        if (!interactive) return
        const handleMove = (e) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }
        window.addEventListener("mousemove", handleMove)
        return () => window.removeEventListener("mousemove", handleMove)
    }, [interactive])

    /* ─────────────────────── 4) 애니메이션 루프 ─────────────────────── */
    const animate = useCallback(() => {
        if (!containerRef.current) return
        const W = containerRef.current.offsetWidth
        const H = containerRef.current.offsetHeight
        const { x: mx, y: my } = mousePosRef.current

        setParticles(prev =>
            prev.map(p => {
                let { x, y, vx, vy } = p

                /* ── 마우스 반응 (repel) ── */
                if (interactive) {
                    const dx = mx - x, dy = my - y
                    const dist = Math.hypot(dx, dy)
                    if (dist < 100 && dist > 0.5) {
                        const force = (100 - dist) / 100
                        vx -= (dx / dist) * force * 0.5
                        vy -= (dy / dist) * force * 0.5
                    }
                }

                /* ── 위치 업데이트 & 경계 체크 ── */
                x += vx; y += vy
                if (x <= 0 || x >= W) { vx *= -0.8; x = Math.max(0, Math.min(W, x)) }
                if (y <= 0 || y >= H) { vy *= -0.8; y = Math.max(0, Math.min(H, y)) }
                vx *= 0.99; vy *= 0.99                      // 마찰

                /* ── 자취(트레일) ── */
                const trail = [...p.trail, { x, y }].slice(-5)

                return { ...p, x, y, vx, vy, trail }
            })
        )

        animationRef.current = requestAnimationFrame(animate)
    }, [interactive])

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationRef.current)
    }, [animate])

    /* ─────────────────────── 5) 렌더용 헬퍼 ─────────────────────── */
    const renderParticle = (p) => {
        const style = {
            left : `${p.x}px`,
            top  : `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
        }

        switch (p.type) {
            case "star":
                return <div key={p.id} className="particle particle-star" style={style}>⭐</div>
            case "heart":
                return <div key={p.id} className="particle particle-heart" style={style}>💖</div>
            case "diamond":
                return <div key={p.id} className="particle particle-diamond" style={style}>💎</div>
            case "sparkle":
                return <div key={p.id} className="particle particle-sparkle" style={style}>✨</div>
            default:   /* circle + trail */
                return (
                    <div key={p.id} className="particle particle-circle" style={style}>
                        {p.trail.map((pt, i) => (
                            <div
                                key={i}
                                className="particle-trail"
                                style={{
                                    left: `${pt.x - p.x}px`,
                                    top : `${pt.y - p.y}px`,
                                    opacity: (i / p.trail.length) * 0.5,
                                    backgroundColor: p.color,
                                }}
                            />
                        ))}
                    </div>
                )
        }
    }

    /* ─────────────────────── 6) JSX 반환 ─────────────────────── */
    return (
        <div ref={containerRef} className="particle-system">
            <div className="particle-info">
                <p> {"Move mouse to interact with particles!"}</p>
            </div>

            {particles.map(renderParticle)}

            {interactive && (
                <div
                    className="mouse-indicator"
                    style={{
                        left: `${mousePosRef.current.x}px`,
                        top : `${mousePosRef.current.y}px`,
                    }}
                />
            )}
        </div>
    )
}
