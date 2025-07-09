"use client"

import "./NotFound.css"

export function NotFound({
                             title = "404 - Page Not Found",
                             message = "You have found a mysterious page! But there seems to be nothing here..",
                             onGoHome,
                         }) {
    const handleGoHome = () => {
        if (onGoHome) {
            onGoHome()
        } else {
            // Use window.location instead of useRouter to avoid Next.js router dependency
            window.location.href = "/"
        }
    }

    const handleGoBack = () => {
        window.history.back()
    }

    return (
        <div className="cosmic-not-found">
            <div className="cosmic-not-found__container">
                <div className="cosmic-not-found__icon">🌌</div>
                <h1 className="cosmic-not-found__title">{title}</h1>
                <p className="cosmic-not-found__message">{message}</p>
                <div className="cosmic-not-found__actions">
                    <button
                        onClick={handleGoHome}
                        className="cosmic-btn cosmic-btn--primary cosmic-btn--large cosmic-not-found__button"
                    >
                        Try again?
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="cosmic-btn cosmic-btn--secondary cosmic-btn--large cosmic-not-found__button"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}
