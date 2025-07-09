"use client"

import { getAllComponents } from "../component-registry"
import { useEffect, useState } from "react" // Import useState and useEffect for dynamic component loading
import "./ComponentPreview.css"

export function ComponentPreview({ component }) {
    const [Component, setComponent] = useState(null)
    const [props, setProps] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const allComponents = getAllComponents()
        const componentConfig = allComponents.find((comp) => comp.name === component.name)

        if (componentConfig) {
            setComponent(() => componentConfig.component) // Store the component function
            setProps(componentConfig.props)
            setLoading(false)
        } else {
            setComponent(null)
            setProps({})
            setLoading(false)
        }
    }, [component])

    if (loading) {
        return (
            <div className="component-preview__loading">
                <div className="spinner"></div>
                <span>Loading preview...</span>
            </div>
        )
    }

    if (!Component) {
        return (
            <div className="component-preview__placeholder">
                <div className="placeholder-icon">🚧</div>
                <h4>Component Preview</h4>
                <p>Preview for "{component.name}" is coming soon!</p>
            </div>
        )
    }

    return (
        <div className="component-preview">
            <Component {...props} />
        </div>
    )
}
