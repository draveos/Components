"use client"
import { useState, useRef, useEffect } from "react"
import "./Notification.css"

export function Notification({
                                 items = [],                // [{ id, label, variant }] 형태
                                 icon  = "📣",              // 필요하면 이모지 대신 <Icon/> 전달
                                 className = "",
                             }) {
    const [open, setOpen] = useState(false)
    const wrapRef = useRef(null)

    /* --------- 바깥 클릭 시 드롭다운 닫기 --------- */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
        }
        window.addEventListener("mousedown", handleClickOutside)
        return () => window.removeEventListener("mousedown", handleClickOutside)
    }, [])

    /* --------- 배지 색상: variant 결정 --------- */
    const newest = items[0]        // 가장 최근 항목
    const badgeVariant = newest?.variant || "default"

    return (
        <div ref={wrapRef} className={`cosmic-notification ${className}`}>
            {/* 버튼 (종 + 배지) */}
            <button
                className="notif-trigger"
                aria-label="Notifications"
                onClick={() => setOpen(!open)}
            >
                <span className="notif-icon">{icon}</span>
                {items.length > 0 && (
                    <span className={`cosmic-badge cosmic-badge--${badgeVariant}`}>
            {items.length}
          </span>
                )}
            </button>

            {/* 드롭다운 */}
            {open && (
                <div className="notif-dropdown">
                    {items.length === 0 ? (
                        <div className="notif-empty">No notifications</div>
                    ) : (
                        items.map((n) => (
                            <div key={n.id} className="notif-item">
                <span
                    className={`cosmic-badge cosmic-badge--${n.variant || "info"}`}
                >
                  {n.variant?.toUpperCase() || "INFO"}
                </span>
                                <span className="notif-label">{n.label}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
