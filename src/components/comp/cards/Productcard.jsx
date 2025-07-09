"use client"
import "./Productcard.css"

export function ProductCard({ product = {}, onAddToCart, showBadge = false, className = "" }) {
    const { name = "Cosmic Gadget", price = 99.99, originalPrice, rating = 4.5, image = "✨", badge = "New" } = product

    return (
        <div className={`cosmic-product-card ${className}`}>
            <div className="cosmic-product-card__image">
                {showBadge && <div className="cosmic-product-card__badge">{badge}</div>}
                <div className="cosmic-product-card__placeholder">{image}</div>
            </div>

            <div className="cosmic-product-card__info">
                <h3 className="cosmic-product-card__title">{name}</h3>
                <div className="cosmic-product-card__rating">
                    <span className="cosmic-product-card__stars">{"⭐".repeat(Math.floor(rating))}</span>
                    <span className="cosmic-product-card__rating-text">({rating})</span>
                </div>
                <div className="cosmic-product-card__price">
                    <span className="cosmic-product-card__price-current">${price.toFixed(2)}</span>
                    {originalPrice && <span className="cosmic-product-card__price-original">${originalPrice.toFixed(2)}</span>}
                </div>
                <button className="cosmic-product-card__add-to-cart" onClick={() => onAddToCart?.(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
