import React, { useRef, useState } from 'react'
import { X, Upload } from 'lucide-react'

export default function DragDropFileUpload({ onFileSelect, accept, disabled = false, selectedFile = null, onRemoveFile, hasError = false }) {
    const fileInputRef = useRef(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        if (!disabled) {
            setIsDragOver(true)
        }
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)

        if (disabled) return

        const files = e.dataTransfer.files
        if (files.length > 0) {
            const file = files[0]
            // Check file type if accept is specified
            if (accept && !accept.split(',').some(type => file.name.toLowerCase().endsWith(type.trim().replace('.', '')))) {
                alert(`Please select a file with one of these extensions: ${accept}`)
                return
            }
            onFileSelect(file)
        }
    }

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleInputChange = (e) => {
        if (e.target.files.length > 0) {
            onFileSelect(e.target.files[0])
        }
    }

    const handleRemoveFile = (e) => {
        e.stopPropagation() // Prevent triggering the click event
        if (onRemoveFile) {
            onRemoveFile()
        }
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const baseClasses = "relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer"
    const disabledClasses = "opacity-50 cursor-not-allowed"
    const errorClasses = "border-red-500 bg-red-50"
    const dragOverClasses = "border-blue-500 bg-blue-50 scale-105"
    const normalClasses = "border-gray-300 hover:border-gray-400 hover:bg-gray-50"

    const containerClasses = `
        ${baseClasses}
        ${disabled ? disabledClasses : ''}
        ${hasError ? errorClasses : ''}
        ${isDragOver && !disabled && !hasError ? dragOverClasses : ''}
        ${!hasError && !isDragOver && !disabled ? normalClasses : ''}
    `.trim()

    return (
        <div
            className={containerClasses}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleInputChange}
                className="hidden"
                disabled={disabled}
            />

            {/* Upload area content */}
            <div className="flex flex-col items-center justify-center space-y-4">
                {selectedFile ? (
                    // Selected file display
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium text-green-700">File Selected</p>
                            <p className="text-sm text-green-600 truncate max-w-xs">{selectedFile.name}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                        <button
                            onClick={handleRemoveFile}
                            className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <X className="w-4 h-4" />
                            <span>Remove</span>
                        </button>
                    </div>
                ) : (
                    // Default upload display
                    <>
                        {/* Upload icon */}
                        <Upload className="w-8 h-8 mx-auto text-gray-700" />

                        {/* Text content */}
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-700">
                                {isDragOver && !disabled
                                    ? 'Drop your file here'
                                    : 'Drag & drop your file here'
                                }
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                or <span className="text-blue-600 font-medium">click to browse</span>
                            </p>
                            {accept && (
                                <p className="text-xs text-gray-400 mt-2">
                                    Accepted formats: {accept}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
