"use client"

export function Header({ logo, navigation, actions, className = "" }) {
    return (
        <header className={`site-header ${className}`}>
            <div className="header-content">
                <div className="header-logo">{logo}</div>

                {navigation && <nav className="header-nav">{navigation}</nav>}

                {actions && <div className="header-actions">{actions}</div>}
            </div>
        </header>
    )
}
