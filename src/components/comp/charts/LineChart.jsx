"use client"
import "./LineChart.css"

export function LineChart({ data = [], title = "Line Chart", className = "" }) {
    if (data.length === 0) {
        return (
            <div className={`cosmic-chart-container ${className}`}>
                <h4 className="cosmic-chart-title">{title}</h4>
                <div className="cosmic-line-chart no-data">No data to display.</div>
            </div>
        )
    }

    const chartWidth = 300
    const chartHeight = 200
    const padding = 20

    const xMax = data.length - 1
    const yMax = Math.max(...data.map((d) => d.y))
    const yMin = Math.min(...data.map((d) => d.y))

    const points = data
        .map((d, i) => {
            const x = (i / xMax) * (chartWidth - 2 * padding) + padding
            const y = chartHeight - ((d.y - yMin) / (yMax - yMin)) * (chartHeight - 2 * padding) - padding
            return `${x},${y}`
        })
        .join(" ")

    return (
        <div className={`cosmic-chart-container ${className}`}>
            <h4 className="cosmic-chart-title">{title}</h4>
            <div className="cosmic-line-chart">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                    <polyline fill="none" stroke="#a78bfa" strokeWidth="3" points={points} />
                    {data.map((d, i) => {
                        const x = (i / xMax) * (chartWidth - 2 * padding) + padding
                        const y = chartHeight - ((d.y - yMin) / (yMax - yMin)) * (chartHeight - 2 * padding) - padding
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="5"
                                fill="#fbbf24"
                                stroke="#0f172a"
                                strokeWidth="2"
                                title={`${d.x}: ${d.y}`}
                            />
                        )
                    })}
                </svg>
                <div className="cosmic-line-chart__labels">
                    {data.map((d, i) => (
                        <span key={i} style={{ left: `${(i / xMax) * 100}%` }}>
              {d.x}
            </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
