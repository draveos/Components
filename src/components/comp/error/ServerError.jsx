"use client"
import "./ServerError.css"

export function ServerError({ code = 500, title = "Server Error", message, onRetry, className = "" }) {
    const getErrorIcon = () => {
        switch (code) {
            case 500:
                return "🔥"
            case 503:
                return "🚧"
            case 502:
                return "🌐"
            default:
                return "⚠️"
        }
    }

    return (
        <div className={`cosmic-server-error ${className}`}>
            <div className="cosmic-server-error__content">
                <div className="cosmic-server-error__icon">{getErrorIcon()}</div>
                <h1 className="cosmic-server-error__code">{code}</h1>
                <h2 className="cosmic-server-error__title">{title}</h2>
                <p className="cosmic-server-error__message">
                    {message || "Our servers are experiencing some cosmic interference."}
                </p>
                <div className="cosmic-server-error__actions">
                    {onRetry && (
                        <button className="cosmic-server-error__btn-retry" onClick={onRetry}>
                            Retry Connection
                        </button>
                    )}
                    <button className="cosmic-server-error__btn-refresh" onClick={() => window.location.reload()}>
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    )
}
