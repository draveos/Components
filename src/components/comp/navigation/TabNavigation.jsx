"use client"
import { useState } from "react"
import "./TabNavigation.css"

export function TabNavigation({ tabs = [], defaultTab = 0, className = "" }) {
    const [activeTab, setActiveTab] = useState(defaultTab)

    return (
        <div className={`cosmic-tabs ${className}`}>
            <div className="cosmic-tabs__list" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`cosmic-tabs__button ${activeTab === index ? "active" : ""}`}
                        onClick={() => setActiveTab(index)}
                        role="tab"
                        aria-selected={activeTab === index}
                        id={`tab-${index}`}
                        aria-controls={`panel-${index}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="cosmic-tabs__content">
                <div
                    className="cosmic-tabs__panel"
                    role="tabpanel"
                    id={`panel-${activeTab}`}
                    aria-labelledby={`tab-${activeTab}`}
                >
                    {tabs[activeTab]?.content || (
                        <div>
                            <h4>{tabs[activeTab]?.label}</h4>
                            <p>Content for {tabs[activeTab]?.label} tab.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
