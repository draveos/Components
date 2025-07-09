"use client"
import "./ConfirmationModal.css"

export function ConfirmationModal({
                                      title = "Confirm Action",
                                      message = "Are you sure you want to proceed?",
                                      onConfirm,
                                      onCancel,
                                      confirmText = "Confirm",
                                      cancelText = "Cancel",
                                      type = "warning",
                                      className = "",
                                  }) {
    const getIcon = () => {
        switch (type) {
            case "warning":
                return "⚠️"
            case "danger":
                return "🚨"
            case "info":
                return "ℹ️"
            default:
                return "❓"
        }
    }

    return (
        <div className={`cosmic-confirmation-modal ${className}`}>
            <div className={`cosmic-confirmation-modal__icon ${type}`}>{getIcon()}</div>
            <h4 className="cosmic-confirmation-modal__title">{title}</h4>
            <p className="cosmic-confirmation-modal__message">{message}</p>
            <div className="cosmic-confirmation-modal__actions">
                <button className="cosmic-confirmation-modal__btn-cancel" onClick={onCancel}>
                    {cancelText}
                </button>
                <button
                    className={`cosmic-confirmation-modal__btn-confirm ${type === "danger" ? "danger" : ""}`}
                    onClick={onConfirm}
                >
                    {confirmText}
                </button>
            </div>
        </div>
    )
}
