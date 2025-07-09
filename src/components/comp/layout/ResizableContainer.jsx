"use client"
import { useRef, useState, useEffect, useCallback } from "react"
import "./ResizableContainer.css"

const BREAKPOINTS = [
    { name: "sm",  max: 640 },
    { name: "md",  max: 768 },
    { name: "lg",  max: 1024 },
    { name: "xl",  max: 1280 },
]

export function ResizableContainer({
                                       children,
                                       min = 250,            // hard-min px
                                       max = 1600,           // hard-max px
                                       defaultWidth = 800,   // initial width
                                       showSizeBadge = true, // toggle badge display
                                       className = "",
                                   }) {
    const boxRef   = useRef(null)
    const dragRef  = useRef(null)
    const [width, setWidth] = useState(defaultWidth)
    const [size,  setSize]  = useState("lg")   // initial guess

    /* ───────── drag handlers ───────── */
    useEffect(() => {
        const handleMove = (e) => {
            if (!dragRef.current) return
            const delta = e.clientX - dragRef.current.startX
            const newW  = Math.min(max, Math.max(min, dragRef.current.startWidth + delta))
            setWidth(newW)
        }
        const stopDrag = () => {
            dragRef.current = null
            window.removeEventListener("mousemove", handleMove)
            window.removeEventListener("mouseup",   stopDrag)
        }

        const startDrag = (e) => {
            dragRef.current = { startX: e.clientX, startWidth: width }
            window.addEventListener("mousemove", handleMove)
            window.addEventListener("mouseup",   stopDrag)
        }

        const handle = boxRef.current?.querySelector(".resize-handle")
        handle?.addEventListener("mousedown", startDrag)

        return () => handle?.removeEventListener("mousedown", startDrag)
    }, [width, min, max])

    /* ───────── update breakpoint label ───────── */
    const computeSize = useCallback((w) => {
        const bp = BREAKPOINTS.find(b => w <= b.max) || { name: "full" }
        setSize(bp.name)
    }, [])

    useEffect(() => computeSize(width), [width, computeSize])

    /* ───────── style object ───────── */
    const style = { width }

    return (
        <div ref={boxRef} className={`resizable-container ${className}`} style={style}>
            {showSizeBadge && <span className="size-badge">{size.toUpperCase()}</span>}
            <div className="content">{children}</div>
            <div className="resize-handle" />
        </div>
    )
}
