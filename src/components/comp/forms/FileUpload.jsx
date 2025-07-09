"use client"
import { useState, useRef } from "react"
import "./FileUpload.css"

export function FileUpload({
                               accept = "*/*",
                               multiple = false,
                               onFileSelect,
                               maxSize = 10 * 1024 * 1024, // 10MB
                               className = "",
                           }) {
    const [dragOver, setDragOver] = useState(false)
    const [files, setFiles] = useState([])
    const fileInputRef = useRef(null)

    const handleFileSelect = (selectedFiles) => {
        const fileArray = Array.from(selectedFiles)
        const validFiles = fileArray.filter((file) => file.size <= maxSize)

        setFiles(validFiles)
        onFileSelect?.(validFiles)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        handleFileSelect(e.dataTransfer.files)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragOver(true)
    }

    const handleDragLeave = () => {
        setDragOver(false)
    }

    const removeFile = (fileName) => {
        const newFiles = files.filter((file) => file.name !== fileName)
        setFiles(newFiles)
        onFileSelect?.(newFiles)
    }

    return (
        <div className={`cosmic-file-upload ${className}`}>
            <div
                className={`cosmic-file-upload__area ${dragOver ? "drag-over" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="cosmic-file-upload__icon">📁</div>
                <p className="cosmic-file-upload__text">
                    Drag & drop files here or <span className="cosmic-file-upload__link">browse</span>
                </p>
                <p className="cosmic-file-upload__hint">Max file size: {Math.round(maxSize / 1024 / 1024)}MB</p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="cosmic-file-upload__input"
            />

            {files.length > 0 && (
                <div className="cosmic-file-upload__list">
                    {files.map((file, index) => (
                        <div key={index} className="cosmic-file-upload__item">
                            <span className="cosmic-file-upload__name">{file.name}</span>
                            <span className="cosmic-file-upload__size">{(file.size / 1024).toFixed(1)}KB</span>
                            <button className="cosmic-file-upload__remove" onClick={() => removeFile(file.name)}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
