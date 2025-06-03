"use client"

import { useEffect, useState } from "react"
import "./CodeModal.css"

const componentCode = {
    "Primary Button": `import React from 'react';
import './Button.css';

export default function PrimaryButton({ children, onClick, ...props }) {
  return (
    <button 
      className="btn-primary" 
      onClick={onClick}
      {...props}
    >
      <span className="btn-text">{children}</span>
      <div className="btn-ripple"></div>
    </button>
  );
}`,

    "Icon Button": `import React from 'react';
import './Button.css';

export default function IconButton({ icon, children, onClick, ...props }) {
  return (
    <button 
      className="btn-icon" 
      onClick={onClick}
      {...props}
    >
      <span className="icon">{icon}</span>
      <span className="btn-text">{children}</span>
      <div className="btn-glow"></div>
    </button>
  );
}`,

    "Loading Button": `import React, { useState } from 'react';
import './Button.css';

export default function LoadingButton({ children, onClick, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    setIsLoading(true);
    try {
      await onClick?.(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={\`btn-loading \${isLoading ? 'loading' : ''}\`}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="spinner"></div>
          <span>Loading...</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}`,

    "Contact Form": `import React, { useState } from 'react';
import './Form.css';

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="form-input"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          className="form-textarea"
          required
        />
      </div>
      
      <button type="submit" className="form-submit">
        Send Message
      </button>
    </form>
  );
}`,

    "Responsive Navbar": `import React, { useState } from 'react';
import './Navbar.css';

export default function ResponsiveNavbar({ brand, links }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">⟡</span>
        <span className="brand-text">{brand}</span>
      </div>
      
      <div className={\`nav-links \${isOpen ? 'open' : ''}\`}>
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.href}
            className={\`nav-link \${link.active ? 'active' : ''}\`}
          >
            {link.text}
          </a>
        ))}
      </div>
      
      <button 
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </nav>
  );
}`,

    "Product Card": `import React from 'react';
import './Card.css';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  showBadge = false 
}) {
  return (
    <div className="product-card">
      <div className="product-image">
        {showBadge && (
          <div className="product-badge">Sale</div>
        )}
        <div className="product-placeholder">
          {product.image || '📱'}
        </div>
      </div>
      
      <div className="product-info">
        <h4 className="product-title">{product.name}</h4>
        
        <div className="product-rating">
          <span className="stars">
            {'⭐'.repeat(Math.floor(product.rating || 5))}
          </span>
          <span className="rating-text">
            ({product.rating || 4.8})
          </span>
        </div>
        
        <div className="product-price">
          <span className="price-current">
            \${product.price}
          </span>
          {product.originalPrice && (
            <span className="price-original">
              \${product.originalPrice}
            </span>
          )}
        </div>
        
        <button 
          className="add-to-cart"
          onClick={() => onAddToCart?.(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}`,

    "Search Input": `import React, { useState, useEffect } from 'react';
import './Search.css';

export default function SearchInput({ 
  placeholder = "Search...", 
  onSearch, 
  suggestions = [] 
}) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch?.(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, onSearch]);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {value && (
          <button 
            className="search-clear" 
            onClick={() => setValue('')}
          >
            ✕
          </button>
        )}
      </div>
      
      {showSuggestions && value && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions
            .filter(item => 
              item.toLowerCase().includes(value.toLowerCase())
            )
            .map((suggestion, index) => (
              <div 
                key={index}
                className="suggestion-item"
                onClick={() => setValue(suggestion)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}`,
}

export function CodeModal({ isOpen, component, onClose }) {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const copyToClipboard = async () => {
        try {
            const code = componentCode[component?.name] || "// Code not available yet"
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy code:", err)
        }
    }

    if (!isOpen || !component) return null

    const code = componentCode[component.name] || "// Code not available yet"

    return (
        <div className="modal-overlay">
            <div className="code-modal celestial-border">
                <div className="modal-header">
                    <div className="modal-title-section">
                        <h2 className="modal-title">{component.name} - Code</h2>
                        <p className="modal-subtitle">Copy and use this component in your project</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="code-content">
                    <div className="code-header">
                        <div className="code-language">JSX</div>
                        <button className={`copy-button ${copied ? "copied" : ""}`} onClick={copyToClipboard}>
                            {copied ? (
                                <>
                                    <span className="copy-icon">✓</span>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <span className="copy-icon">📋</span>
                                    <span>Copy Code</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="code-block">
            <pre>
              <code>{code}</code>
            </pre>
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="code-info">
            <span className="info-item">
              <span className="info-icon">📁</span>
              <span>Save as: {component.name.replace(/\s+/g, "")}.jsx</span>
            </span>
                        <span className="info-item">
              <span className="info-icon">🎨</span>
              <span>Don't forget to add the CSS styles!</span>
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
