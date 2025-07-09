"use client"
import "./SimpleTable.css"

export function SimpleTable({ headers = [], data = [], className = "" }) {
    return (
        <div className={`cosmic-table-container ${className}`}>
            <table className="cosmic-table">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
