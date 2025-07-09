"use client"
import { useState, useMemo } from "react"
import "./PaginatedTable.css"

export function PaginatedTable({ headers = [], data = [], itemsPerPage = 5, className = "" }) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(data.length / itemsPerPage)
    const currentTableData = useMemo(() => {
        const firstItemIndex = (currentPage - 1) * itemsPerPage
        const lastItemIndex = firstItemIndex + itemsPerPage
        return data.slice(firstItemIndex, lastItemIndex)
    }, [currentPage, data, itemsPerPage])

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    return (
        <div className={`cosmic-paginated-table-wrapper ${className}`}>
            <div className="cosmic-table-container">
                <table className="cosmic-table">
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {currentTableData.length > 0 ? (
                        currentTableData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} className="no-data">
                                No data available.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="cosmic-pagination">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1} className="cosmic-pagination__button">
                        Previous
                    </button>
                    <span className="cosmic-pagination__info">
            Page {currentPage} of {totalPages}
          </span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages} className="cosmic-pagination__button">
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}
