"use client"

export function Footer({ links = [], copyright, className = "" }) {
    return (
        <footer className={`site-footer ${className}`}>
            <div className="footer-content">
                {links.length > 0 && (
                    <div className="footer-links">
                        {links.map((section, index) => (
                            <div key={index} className="footer-section">
                                <h4 className="footer-title">{section.title}</h4>
                                <ul className="footer-list">
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <a href={item.href || "#"} className="footer-link">
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {copyright && (
                    <div className="footer-bottom">
                        <p className="footer-copyright">{copyright}</p>
                    </div>
                )}
            </div>
        </footer>
    )
}
