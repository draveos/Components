"use client"

import "./Database.css"

export function Database() {
    return (
        <div className="database-page">
            <h1 className="database-page__title">
                <span className="database-page__title-word">Celestial</span>
                <span className="database-page__title-word">Database</span>
            </h1>
            <p className="database-page__subtitle">Explore the vast collection of cosmic data.</p>

            <div className="database-page__content">
                <div className="database-page__section">
                    <h2 className="database-page__section-title">Planetary Systems</h2>
                    <ul className="database-page__list">
                        <li>Alpha Centauri System</li>
                        <li>Kepler-186f System</li>
                        <li>TRAPPIST-1 System</li>
                        <li>Proxima Centauri System</li>
                    </ul>
                </div>

                <div className="database-page__section">
                    <h2 className="database-page__section-title">Galactic Structures</h2>
                    <ul className="database-page__list">
                        <li>Milky Way Galaxy</li>
                        <li>Andromeda Galaxy</li>
                        <li>Triangulum Galaxy</li>
                        <li>Whirlpool Galaxy</li>
                    </ul>
                </div>

                <div className="database-page__section">
                    <h2 className="database-page__section-title">Cosmic Phenomena</h2>
                    <ul className="database-page__list">
                        <li>Supernovae</li>
                        <li>Black Holes</li>
                        <li>Nebulae</li>
                        <li>Quasars</li>
                    </ul>
                </div>
            </div>

            <div className="database-page__footer">
                <p>Data last updated: Stardate 78945.6</p>
            </div>
        </div>
    )
}
