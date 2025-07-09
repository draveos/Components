"use client"

import { useEffect } from "react"
import { ComponentPreview } from "./ComponentPreview"
import "./PreviewModal.css"

export function PreviewModal({ isOpen, component, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen || !component) return null

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="preview-modal celestial-border">
                <div className="modal-header">
                    <div className="modal-title-section">
                        <h2 className="modal-title">{component.name}</h2>
                        <p className="modal-subtitle">{component.description}</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-content">
                    <div className="preview-container">
                        <ComponentPreview component={component} />
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="component-tags">
                        {component.tags?.map((tag) => (
                            <span key={tag} className="modal-tag">
                #{tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
