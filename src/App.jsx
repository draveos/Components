"use client"

import { useState, useEffect } from "react"
import { FontIntro } from "./components/FontIntro"
import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { Database } from "./pages/Database"
import "./App.css"

function App() {
    const [showIntro, setShowIntro] = useState(true)
    const [currentPage, setCurrentPage] = useState("home")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Listen for modal state changes from child components
    useEffect(() => {
        const handleModalOpen = () => setIsModalOpen(true)
        const handleModalClose = () => setIsModalOpen(false)

        // Listen for custom events
        window.addEventListener("modalOpen", handleModalOpen)
        window.addEventListener("modalClose", handleModalClose)

        return () => {
            window.removeEventListener("modalOpen", handleModalOpen)
            window.removeEventListener("modalClose", handleModalClose)
        }
    }, [])

    if (showIntro) {
        return <FontIntro onFinish={() => setShowIntro(false)} />
    }

    return (
        <div className="app">
            <div className="star-field">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className={`header-container ${isModalOpen ? "header-hidden" : ""}`}>
                <Header
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            {currentPage === "home" && <Home selectedCategory={selectedCategory} />}
            {currentPage === "database" && <Database />}
        </div>
    )
}

export default App
