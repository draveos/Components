"use client"

import React from "react"
import { NotFound } from "./NotFound" // Import the NotFound component

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error in ErrorBoundary:", error, errorInfo)
        this.setState({ errorInfo })
    }

    render() {
        if (this.state.hasError) {
            // Render the NotFound component as a fallback when an error occurs
            return (
                <NotFound
                    title="Cosmic Anomaly Detected!"
                    message="It seems a critical error has occurred. Our space engineers are on it!"
                    // The NotFound component itself handles navigation via useRouter
                    // You can pass a specific onGoHome prop if you want custom behavior here
                    onGoHome={() => {
                        // Optionally reset error state and navigate home
                        this.setState({ hasError: false, error: null, errorInfo: null })
                        // NotFound's internal useRouter will handle the actual navigation
                    }}
                />
            )
        }

        return this.props.children
    }
}
