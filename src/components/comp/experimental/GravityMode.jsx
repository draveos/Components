// ================================
// GravityMode_Fixed.jsx
// Single‑component, self‑contained gravity + black‑hole demo
// Updated with safe sceneRef handling, multi‑instance protection, and
// React 18 strict‑mode‑compatible lifecycle.
// ================================

"use client";

import React, {
    useState,
    useRef,
    useCallback,
    useLayoutEffect,
    useEffect,
} from "react";
import "./GravityMode.css";

export function GravityMode({ className = "" }) {
    /* --------------------------------------------------------
     *  STATE
     * -----------------------------------------------------*/
    const [active, setActive] = useState(false);          // gravity on/off
    const [strength, setStrength] = useState(5);          // px per frame²
    const [pos, setPos] = useState(0);                    // virtual Y scroll
    const [vel, setVel] = useState(0);                    // velocity px/frame
    const [status, setStatus] = useState("Idle");        // HUD string

    /* --------------------------------------------------------
     *  REFS
     * -----------------------------------------------------*/
    const sceneRef = useRef(null);                        // the moving container
    const rafId     = useRef();                           // requestAnimationFrame id

    /* --------------------------------------------------------
     *  PHYSICS LOOP
     * -----------------------------------------------------*/
    const animate = useCallback(() => {
        setPos(prev => {
            let next = prev + vel;
            const max = window.innerHeight * 2;               // 200vh scene
            if (next < 0) { next = 0; setVel(0); }
            if (next > max) { next = max; setVel(0); }
            sceneRef.current?.style.setProperty(
                "transform",
                `translateY(${-next}px)`
            );
            return next;
        });

        // status HUD
        setStatus(Math.abs(vel) < 0.2 ? "Hovering" : vel > 0 ? "Falling" : "Escaping");

        // gravity pull (accelerate downward)
        setVel(v => v + strength * 0.08);

        rafId.current = requestAnimationFrame(animate);
    }, [vel, strength]);

    /* --------------------------------------------------------
     *  ACTIVATE / DEACTIVATE
     * -----------------------------------------------------*/
    useLayoutEffect(() => {
        if (active) {
            // lock body once
            document.body.classList.add("gravity-on");
            document.body.style.overflow = "hidden";
            rafId.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(rafId.current);
            // unlock body only if no other GravityMode is running
            if (!document.querySelector(".gravity-shell[data-active='true']")) {
                document.body.classList.remove("gravity-on");
                document.body.style.overflow = "";
            }
            setVel(0);
            setPos(0);
            sceneRef.current?.style.setProperty("transform", "translateY(0)");
            setStatus("Idle");
        }
        return () => cancelAnimationFrame(rafId.current);
    }, [active, animate]);

    /* --------------------------------------------------------
     *  INPUT HANDLERS
     * -----------------------------------------------------*/
    const onWheel = useCallback(
        e => {
            if (!active) return;
            e.preventDefault();
            const delta = e.deltaY > 0 ? 1 : -1;
            setVel(v => v + delta * strength * 0.6);
        },
        [active, strength]
    );

    const onKey = useCallback(
        e => {
            if (!active) return;
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === "ArrowUp" || e.key === "PageUp") setVel(v => v - strength);
            if (e.key === "ArrowDown" || e.key === "PageDown") setVel(v => v + strength);
            if (e.key === "Home") setVel(-20);
        },
        [active, strength]
    );

    useEffect(() => {
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
        };
    }, [onWheel, onKey]);

    /* --------------------------------------------------------
     *  RENDER
     * -----------------------------------------------------*/
    return (
        <div className={`gravity-shell ${className}`} data-active={active}>
            {/* HUD / Controls */}
            <header className="gravity-ui">
                <h3>🕳️ Black‑Hole Gravity Mode</h3>
                <button
                    className={active ? "btn stop" : "btn start"}
                    onClick={() => setActive(a => !a)}
                >
                    {active ? "Deactivate (zero‑g)" : "Activate Gravity"}
                </button>
                <label>
                    Strength&nbsp;
                    <input
                        type="range"
                        min={1}
                        max={10}
                        value={strength}
                        onChange={e => setStrength(+e.target.value)}
                        disabled={active}
                    />
                    &nbsp;{strength}
                </label>
                <div className="readout">
                    <span>Y&nbsp;{pos.toFixed(0)}px</span>
                    <span>v&nbsp;{vel.toFixed(1)}</span>
                    <span>{status}</span>
                </div>
            </header>

            {/* Scroll scene */}
            <div className="scene" ref={sceneRef} style={{ willChange: "transform" }}>
                {/* random stars */}
                {Array.from({ length: 60 }).map((_, i) => (
                    <span
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 180}vh`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}

                {/* filler content */}
                <section className="content">🚀 Try scrolling up…</section>
                <section className="content">✨ Gravity keeps pulling.</section>

                {/* Black‑hole at 150vh */}
                <div className="blackhole" style={{ top: "150vh" }}>
                    <div className="ring r1" />
                    <div className="ring r2" />
                    <div className="core" />
                </div>

                <section className="content">🎉 Escaped the singularity!</section>
            </div>
        </div>
    );
}
