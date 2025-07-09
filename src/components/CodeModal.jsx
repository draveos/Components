"use client"

import { useEffect, useState } from "react"
import { getAllComponents } from "../component-registry"
import "./CodeModal.css"

export function CodeModal({ isOpen, component, onClose }) {
    const [copied, setCopied] = useState(false)
    const [code, setCode] = useState("// Code not available yet")

    useEffect(() => {
        if (isOpen && component) {
            document.body.style.overflow = "hidden"
            // Dynamically get code for the component
            const allComponents = getAllComponents()
            const componentConfig = allComponents.find((comp) => comp.name === component.name)
            if (componentConfig && componentConfig.component) {
                setCode(
                    `Code for ${component.name}.jsx\n\n` +
                    `${JSON.stringify(componentConfig.props, null, 2)}\n\n`
                )
            } else {
                setCode("// Component not found or code not available.")
            }
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen, component])

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy code:", err)
        }
    }

    if (!isOpen || !component) return null

    return (
        <div className="modal-overlay">
            <div className="code-modal celestial-border">
                <div className="modal-header">
                    <div className="modal-title-section">
                        <h2 className="modal-title">{component.name} - Code</h2>
                        <p className="modal-subtitle">Copy and use this component in your project</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="code-content">
                    <div className="code-header">
                        <div className="code-language">JSX</div>
                        <button className={`copy-button ${copied ? "copied" : ""}`} onClick={copyToClipboard}>
                            {copied ? (
                                <>
                                    <span className="copy-icon">✓</span>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <span className="copy-icon">📋</span>
                                    <span>Copy Code</span>
                                </>
                            )}
                        </button>
                    </div>
                    <div className="code-block">
            <pre>
              <code>{code}</code>
            </pre>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="code-info">
            <span className="info-item">
              <span className="info-icon">📁</span>
              <span>Save as: {component.name}.jsx</span>
            </span>
                        <span className="info-item">
              <span className="info-icon">🎨</span>
              <span>Don't forget to add the CSS styles!</span>
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
