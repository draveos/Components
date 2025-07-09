"use client"
import "./BarChart.css"

export function BarChart({ data = [], title = "Bar Chart", className = "" }) {
    const maxValue = Math.max(...data.map((item) => item.value))
    const chartHeight = 200 // Fixed height for the chart area

    return (
        <div className={`cosmic-chart-container ${className}`}>
            <h4 className="cosmic-chart-title">{title}</h4>
            <div className="cosmic-bar-chart" style={{ height: `${chartHeight}px` }}>
                {data.map((item, index) => (
                    <div key={index} className="cosmic-bar-chart__bar-wrapper">
                        <div
                            className="cosmic-bar-chart__bar"
                            style={{ height: `${(item.value / maxValue) * 100}%` }}
                            title={`${item.label}: ${item.value}`}
                        ></div>
                        <span className="cosmic-bar-chart__label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
