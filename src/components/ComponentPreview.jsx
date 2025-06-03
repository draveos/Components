"use client"

import { useState } from "react"
import "./ComponentPreview.css"

export function ComponentPreview({ component }) {
    const [activeTab, setActiveTab] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [formData, setFormData] = useState({})
    const [currentStep, setCurrentStep] = useState(0)

    const renderComponent = () => {
        switch (component.name) {
            case "Primary Button":
                return (
                    <div className="preview-section">
                        <button className="btn-primary">
                            <span className="btn-text">Click Me</span>
                            <div className="btn-ripple"></div>
                        </button>
                    </div>
                )

            case "Icon Button":
                return (
                    <div className="preview-section">
                        <button className="btn-icon">
                            <span className="icon">⭐</span>
                            <span className="btn-text">Favorite</span>
                            <div className="btn-glow"></div>
                        </button>
                    </div>
                )

            case "Loading Button":
                return (
                    <div className="preview-section">
                        <button
                            className={`btn-loading ${isLoading ? "loading" : ""}`}
                            onClick={() => {
                                setIsLoading(true)
                                setTimeout(() => setIsLoading(false), 3000)
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </div>
                )

            case "Gradient Button":
                return (
                    <div className="preview-section">
                        <button className="btn-gradient">
                            <span className="btn-text">Gradient Magic</span>
                            <div className="gradient-overlay"></div>
                        </button>
                    </div>
                )

            case "Contact Form":
                return (
                    <div className="preview-section">
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your name" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="your@email.com" className="form-input" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="Your message..." className="form-textarea"></textarea>
                            </div>
                            <button type="submit" className="form-submit">
                                Send Message
                            </button>
                        </form>
                    </div>
                )

            case "Login Form":
                return (
                    <div className="preview-section">
                        <div className="login-form">
                            <h3 className="form-title">Welcome Back</h3>
                            <div className="form-group">
                                <input type="email" placeholder="Email" className="form-input" />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" className="form-input" />
                            </div>
                            <button className="form-submit">Sign In</button>
                            <div className="form-footer">
                                <a href="#" className="form-link">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    </div>
                )

            case "Multi-step Form":
                return (
                    <div className="preview-section">
                        <div className="wizard-form">
                            <div className="wizard-progress">
                                {[1, 2, 3].map((step, index) => (
                                    <div key={step} className={`progress-step ${index <= currentStep ? "active" : ""}`}>
                                        <div className="step-number">{step}</div>
                                        {index < 2 && <div className="step-line"></div>}
                                    </div>
                                ))}
                            </div>
                            <div className="wizard-content">
                                {currentStep === 0 && (
                                    <div className="step-content">
                                        <h4>Personal Information</h4>
                                        <input type="text" placeholder="First Name" className="form-input" />
                                        <input type="text" placeholder="Last Name" className="form-input" />
                                    </div>
                                )}
                                {currentStep === 1 && (
                                    <div className="step-content">
                                        <h4>Contact Details</h4>
                                        <input type="email" placeholder="Email" className="form-input" />
                                        <input type="tel" placeholder="Phone" className="form-input" />
                                    </div>
                                )}
                                {currentStep === 2 && (
                                    <div className="step-content">
                                        <h4>Confirmation</h4>
                                        <p>Please review your information</p>
                                    </div>
                                )}
                            </div>
                            <div className="wizard-actions">
                                {currentStep > 0 && (
                                    <button onClick={() => setCurrentStep(currentStep - 1)} className="btn-secondary">
                                        Previous
                                    </button>
                                )}
                                {currentStep < 2 ? (
                                    <button onClick={() => setCurrentStep(currentStep + 1)} className="btn-primary">
                                        Next
                                    </button>
                                ) : (
                                    <button className="btn-primary">Submit</button>
                                )}
                            </div>
                        </div>
                    </div>
                )

            case "Search Input":
                return (
                    <div className="preview-section">
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search components..."
                                    className="search-input"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                {searchValue && (
                                    <button className="search-clear" onClick={() => setSearchValue("")}>
                                        ✕
                                    </button>
                                )}
                            </div>
                            {searchValue && (
                                <div className="search-suggestions">
                                    <div className="suggestion-item">Button Components</div>
                                    <div className="suggestion-item">Form Elements</div>
                                    <div className="suggestion-item">Navigation</div>
                                </div>
                            )}
                        </div>
                    </div>
                )

            case "Responsive Navbar":
                return (
                    <div className="preview-section">
                        <nav className="navbar">
                            <div className="nav-brand">
                                <span className="brand-icon">⟡</span>
                                <span className="brand-text">Brand</span>
                            </div>
                            <div className="nav-links">
                                <a href="#" className="nav-link active">
                                    Home
                                </a>
                                <a href="#" className="nav-link">
                                    About
                                </a>
                                <a href="#" className="nav-link">
                                    Services
                                </a>
                                <a href="#" className="nav-link">
                                    Contact
                                </a>
                            </div>
                            <button className="nav-toggle">☰</button>
                        </nav>
                    </div>
                )

            case "Sidebar Menu":
                return (
                    <div className="preview-section">
                        <div className="sidebar-demo">
                            <div className="sidebar">
                                <div className="sidebar-header">
                                    <span className="sidebar-icon">⟡</span>
                                    <span className="sidebar-title">Menu</span>
                                </div>
                                <nav className="sidebar-nav">
                                    <a href="#" className="sidebar-link active">
                                        <span className="link-icon">🏠</span>
                                        <span className="link-text">Dashboard</span>
                                    </a>
                                    <a href="#" className="sidebar-link">
                                        <span className="link-icon">👥</span>
                                        <span className="link-text">Users</span>
                                    </a>
                                    <a href="#" className="sidebar-link">
                                        <span className="link-icon">📊</span>
                                        <span className="link-text">Analytics</span>
                                    </a>
                                    <a href="#" className="sidebar-link">
                                        <span className="link-icon">⚙️</span>
                                        <span className="link-text">Settings</span>
                                    </a>
                                </nav>
                            </div>
                            <div className="main-content">
                                <h4>Main Content Area</h4>
                                <p>Content goes here...</p>
                            </div>
                        </div>
                    </div>
                )

            case "Breadcrumbs":
                return (
                    <div className="preview-section">
                        <nav className="breadcrumbs">
                            <a href="#" className="breadcrumb-item">
                                Home
                            </a>
                            <span className="breadcrumb-separator">›</span>
                            <a href="#" className="breadcrumb-item">
                                Components
                            </a>
                            <span className="breadcrumb-separator">›</span>
                            <span className="breadcrumb-current">Navigation</span>
                        </nav>
                    </div>
                )

            case "Tab Navigation":
                return (
                    <div className="preview-section">
                        <div className="tab-container">
                            <div className="tab-list">
                                {["Overview", "Features", "Pricing", "Support"].map((tab, index) => (
                                    <button
                                        key={tab}
                                        className={`tab-button ${activeTab === index ? "active" : ""}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="tab-content">
                                <div className="tab-panel">
                                    <h4>{["Overview", "Features", "Pricing", "Support"][activeTab]}</h4>
                                    <p>Content for {["Overview", "Features", "Pricing", "Support"][activeTab]} tab.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "Grid System":
                return (
                    <div className="preview-section">
                        <div className="grid-demo">
                            <div className="grid-container">
                                <div className="grid-item">1</div>
                                <div className="grid-item">2</div>
                                <div className="grid-item">3</div>
                                <div className="grid-item">4</div>
                                <div className="grid-item">5</div>
                                <div className="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                )

            case "Card Layout":
                return (
                    <div className="preview-section">
                        <div className="card-demo">
                            <div className="demo-card">
                                <div className="card-image">🖼️</div>
                                <div className="card-body">
                                    <h4 className="card-title">Card Title</h4>
                                    <p className="card-text">This is a sample card with some content.</p>
                                    <button className="card-button">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case "Product Card":
                return (
                    <div className="preview-section">
                        <div className="product-card">
                            <div className="product-image">
                                <div className="product-badge">Sale</div>
                                <div className="product-placeholder">📱</div>
                            </div>
                            <div className="product-info">
                                <h4 className="product-title">Awesome Product</h4>
                                <div className="product-rating">
                                    <span className="stars">⭐⭐⭐⭐⭐</span>
                                    <span className="rating-text">(4.8)</span>
                                </div>
                                <div className="product-price">
                                    <span className="price-current">$99.99</span>
                                    <span className="price-original">$129.99</span>
                                </div>
                                <button className="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                )

            case "Profile Card":
                return (
                    <div className="preview-section">
                        <div className="profile-card">
                            <div className="profile-header">
                                <div className="profile-avatar">👤</div>
                                <div className="profile-status"></div>
                            </div>
                            <div className="profile-info">
                                <h4 className="profile-name">Sejin Kim</h4>
                                <p className="profile-role">Frontend Developer</p>
                                <div className="profile-stats">
                                    <div className="stat">
                                        <span className="stat-number">127</span>
                                        <span className="stat-label">Projects</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-number">2.4k</span>
                                        <span className="stat-label">Followers</span>
                                    </div>
                                </div>
                                <button className="profile-button">Follow</button>
                            </div>
                        </div>
                    </div>
                )

            case "Confirmation Modal":
                return (
                    <div className="preview-section">
                        <div className="demo-modal">
                            <div className="modal-icon warning">⚠️</div>
                            <h4 className="modal-title">Confirm Action</h4>
                            <p className="modal-message">Are you sure you want to delete this item? This action cannot be undone.</p>
                            <div className="modal-actions">
                                <button className="btn-cancel">Cancel</button>
                                <button className="btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="preview-section">
                        <div className="placeholder-content">
                            <div className="placeholder-icon">🚧</div>
                            <h4>Component Preview</h4>
                            <p>Preview for "{component.name}" is coming soon!</p>
                        </div>
                    </div>
                )
        }
    }

    return <div className="component-preview">{renderComponent()}</div>
}
