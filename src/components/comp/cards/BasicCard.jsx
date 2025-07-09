"use client"
import "./BasicCard.css"

export function BasicCard({
                              title,
                              content,
                              image,
                              buttonText,
                              onButtonClick,
                              variant = "default",
                              className = "",
                              children,
                          }) {
    return (
        <div className={`cosmic-card cosmic-card--${variant} ${className}`}>
            {image && (
                <div className="cosmic-card__image">
                    {typeof image === "string" ? <div className="cosmic-card__image-placeholder">{image}</div> : image}
                </div>
            )}

            <div className="cosmic-card__content">
                {title && <h3 className="cosmic-card__title">{title}</h3>}
                {content && <p className="cosmic-card__text">{content}</p>}
                {children}

                {buttonText && (
                    <button className="cosmic-card__button" onClick={onButtonClick}>
                        {buttonText}
                    </button>
                )}
            </div>

            <div className="cosmic-card__glow"></div>
        </div>
    )
}
