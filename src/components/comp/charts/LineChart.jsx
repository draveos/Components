"use client"
import { memo } from "react"
import "./LineChart.css"

export const LineChart = memo(function LineChart({
                                                     data = [],
                                                     title = "Line Chart",
                                                     className = "",
                                                     height = 260,                 // 필요하면 조정
                                                     yTicks = 5,                  // 세로 눈금 개수
                                                 }) {
    /* ─────────── 데이터 검사 ─────────── */
    if (!data.length) {
        return (
            <div className={`cosmic-chart-container ${className}`}>
                <h4 className="cosmic-chart-title">{title}</h4>
                <div className="cosmic-line-chart no-data">No data to display.</div>
            </div>
        )
    }

    /* ─────────── 스케일 계산 ─────────── */
    const padding = 32
    const w = 420                         // viewBox width (고정)
    const h = height                      // viewBox height
    const xMax = data.length - 1
    const yVals = data.map(d => d.y)
    const yMin = Math.min(...yVals)
    const yMax = Math.max(...yVals)
    const yRange = yMax - yMin || 1       // 0 나눔 방지

    /** 좌표 변환 함수 */
    const xPos = i     => (i / xMax) * (w - 2 * padding) + padding
    const yPos = val   => h - ((val - yMin) / yRange) * (h - 2 * padding) - padding

    /* ─────────── 꺾은 선(Path) & 에어리어(Path) ─────────── */
    const linePath = data
        .map((d, i) => `${i === 0 ? "M" : "L"}${xPos(i)},${yPos(d.y)}`)
        .join(" ")

    const areaPath = `${linePath} L${xPos(xMax)},${h - padding} L${xPos(0)},${h - padding} Z`

    /* ─────────── Y축 틱 (grid & 레이블) ─────────── */
    const yTicksArr = Array.from({ length: yTicks + 1 }, (_, i) => {
        const t = yMin + (yRange / yTicks) * i
        return { y: yPos(t), label: t }
    })

    return (
        <div className={`cosmic-chart-container ${className}`}>
            <h4 className="cosmic-chart-title">{title}</h4>

            <svg className="cosmic-line-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                {/* ----- defs: gradient & shadow ----- */}
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%"   stopColor="#34d399" />
                        <stop offset="50%"  stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>

                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%"   stopColor="#8b5cf6aa" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                    </filter>
                </defs>

                {/* ----- grid lines ----- */}
                <g className="grid">
                    {yTicksArr.map((t, idx) => (
                        <line
                            key={idx}
                            x1={padding}
                            x2={w - padding}
                            y1={t.y}
                            y2={t.y}
                        />
                    ))}
                </g>

                {/* ----- filled area ----- */}
                <path d={areaPath} fill="url(#areaGradient)" opacity="0.25" />

                {/* ----- main line ----- */}
                <path
                    d={linePath}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    filter="url(#shadow)"
                />

                {/* ----- data points + tooltip ----- */}
                {data.map((d, i) => (
                    <g className="point-group" key={i}>
                        <circle
                            cx={xPos(i)}
                            cy={yPos(d.y)}
                            r="5"
                            className="point-node"
                        />
                        <text
                            x={xPos(i)}
                            y={yPos(d.y) - 12}
                            className="point-label"
                        >
                            {d.y}
                        </text>
                    </g>
                ))}

                {/* ----- axes ----- */}
                <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} className="axis" />
                <line x1={padding} y1={padding}   x2={padding}      y2={h - padding} className="axis" />

                {/* ----- X축 레이블 ----- */}
                {data.map((d, i) => (
                    <text
                        key={i}
                        x={xPos(i)}
                        y={h - padding + 18}
                        className="x-label"
                    >
                        {d.x}
                    </text>
                ))}
            </svg>
        </div>
    )
})
