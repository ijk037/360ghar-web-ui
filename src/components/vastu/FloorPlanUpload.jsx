import React, { useCallback, useRef, useState } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FloorPlanUpload = ({ onImageSelect, selectedFile, previewUrl }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const validateFile = useCallback((file) => {
        if (!file) {
            return 'No file selected';
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Invalid file type. Please upload JPEG, PNG, or WebP images only.';
        }

        if (file.size > MAX_FILE_SIZE) {
            return `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
        }

        return null;
    }, []);

    const handleFile = useCallback((file) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        const preview = URL.createObjectURL(file);
        onImageSelect(file, preview);
    }, [validateFile, onImageSelect]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleInputChange = useCallback((e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleRemove = useCallback((e) => {
        e.stopPropagation();
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        onImageSelect(null, null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [previewUrl, onImageSelect]);

    return (
        <div className="floor-plan-upload">
            <label className="form-label mb-3">
                <i className="fas fa-image me-2"></i>
                Floor Plan Image
                <span className="text-danger ms-1">*</span>
            </label>

            <div
                className={`upload-zone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleInputChange}
                    className="d-none"
                />

                {!selectedFile ? (
                    <div className="upload-placeholder">
                        <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                        <h5 className="mb-2">Upload Floor Plan</h5>
                        <p className="text-muted mb-2">
                            Drag and drop your floor plan image here
                        </p>
                        <p className="text-muted small mb-3">
                            or click to browse files
                        </p>
                        <span className="badge bg-light text-dark">
                            JPEG, PNG, WebP (max 5MB)
                        </span>
                    </div>
                ) : (
                    <div className="upload-preview">
                        <img
                            src={previewUrl}
                            alt="Floor plan preview"
                            className="preview-image"
                        />
                        <div className="preview-overlay">
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={handleRemove}
                            >
                                <i className="fas fa-times me-1"></i>
                                Remove
                            </button>
                        </div>
                        <div className="file-info">
                            <i className="fas fa-check-circle text-success me-2"></i>
                            <span className="file-name">{selectedFile.name}</span>
                            <span className="file-size text-muted ms-2">
                                ({(selectedFile.size / 1024).toFixed(1)} KB)
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="alert alert-danger mt-3 mb-0">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                </div>
            )}
        </div>
    );
};

export default FloorPlanUpload;
