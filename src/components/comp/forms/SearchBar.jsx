"use client"
import { useState, useEffect } from "react"
import "./SearchBar.css"

export function SearchBar({ placeholder = "Search...", onSearch, suggestions = [], className = "" }) {
    const [query, setQuery] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch?.(query)
        }, 300) // Debounce search input
        return () => clearTimeout(timeoutId)
    }, [query, onSearch])

    const filteredSuggestions = suggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))

    return (
        <div className={`cosmic-search-bar ${className}`}>
            <div className="cosmic-search-bar__input-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Small delay to allow click on suggestion
                    placeholder={placeholder}
                    className="cosmic-search-bar__input"
                />
                <button className="cosmic-search-bar__button" onClick={() => onSearch?.(query)}>
                    🔍
                </button>
            </div>

            {showSuggestions && query && filteredSuggestions.length > 0 && (
                <div className="cosmic-search-bar__suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="cosmic-search-bar__suggestion-item"
                            onMouseDown={() => {
                                // Use onMouseDown to prevent onBlur from firing first
                                setQuery(suggestion)
                                onSearch?.(suggestion)
                                setShowSuggestions(false)
                            }}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
