"use client"
import "./ProfileCard.css"

export function ProfileCard({ profile = {}, onFollow, className = "" }) {
    const {
        name = "Cosmic Traveler",
        role = "Star Gazer",
        avatar = "👤",
        stats = { projects: 10, followers: "500" },
        isOnline = true,
    } = profile

    return (
        <div className={`cosmic-profile-card ${className}`}>
            <div className="cosmic-profile-card__header">
                <div className="cosmic-profile-card__avatar">{avatar}</div>
                {isOnline && <div className="cosmic-profile-card__status"></div>}
            </div>
            <div className="cosmic-profile-card__info">
                <h3 className="cosmic-profile-card__name">{name}</h3>
                <p className="cosmic-profile-card__role">{role}</p>
                <div className="cosmic-profile-card__stats">
                    <div className="cosmic-profile-card__stat">
                        <span className="cosmic-profile-card__stat-number">{stats.projects}</span>
                        <span className="cosmic-profile-card__stat-label">Projects</span>
                    </div>
                    <div className="cosmic-profile-card__stat">
                        <span className="cosmic-profile-card__stat-number">{stats.followers}</span>
                        <span className="cosmic-profile-card__stat-label">Followers</span>
                    </div>
                </div>
                <button className="cosmic-profile-card__button" onClick={onFollow}>
                    Follow
                </button>
            </div>
        </div>
    )
}
