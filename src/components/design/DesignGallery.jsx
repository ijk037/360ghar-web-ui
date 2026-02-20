import { useState, useEffect, useCallback }  from 'react';

const STORAGE_KEY = 'designGallery';
const MAX_DESIGNS = 20;

/**
 * DesignGallery - History of generated designs stored in localStorage
 */
const DesignGallery = ({ onSelectDesign }) => {
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load designs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDesigns(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load gallery:', error);
    }
  }, []);

  const handleDelete = useCallback((designId, e) => {
    e.stopPropagation();
    const updated = designs.filter((d) => d.id !== designId);
    setDesigns(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (selectedDesign?.id === designId) {
      setSelectedDesign(null);
    }
  }, [designs, selectedDesign]);

  const handleSelect = useCallback((design) => {
    setSelectedDesign(design);
    if (onSelectDesign) {
      onSelectDesign(design);
    }
  }, [onSelectDesign]);

  const handleClearAll = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all saved designs?')) {
      setDesigns([]);
      setSelectedDesign(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  if (designs.length === 0) {
    return null; // Don\Don'tapos;t show gallery if empty
  }

  const visibleDesigns = isExpanded ? designs : designs.slice(0, 4);

  return (
    <div className="design-gallery">
      <div className="gallery-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          <i className="fas fa-images me-2"></i>
          Your Designs
          <span className="badge bg-light text-dark ms-2">{designs.length}</span>
        </h5>
        {designs.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn btn-sm btn-outline-danger"
          >
            <i className="fas fa-trash-alt me-1"></i>
            Clear All
          </button>
        )}
      </div>

      <div className="gallery-grid">
        {visibleDesigns.map((design) => (
          <div
            key={design.id}
            className={`gallery-item ${selectedDesign?.id === design.id ? 'selected' : ''}`}
            onClick={() => handleSelect(design)}
          >
            <img
              src={design.imageUrl}
              alt="Saved design"
              className="gallery-thumb"
            />
            <div className="gallery-overlay">
              <button
                className="btn btn-sm btn-danger delete-btn"
                onClick={(e) => handleDelete(design.id, e)}
                title="Delete design"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="gallery-info">
              <span className="design-date">
                {new Date(design.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {designs.length > 4 && (
        <button
          className="btn btn-link text-main w-100 mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <i className="fas fa-chevron-up me-1"></i>
              Show Less
            </>
          ) : (
            <>
              <i className="fas fa-chevron-down me-1"></i>
              Show All ({designs.length - 4} more)
            </>
          )}
        </button>
      )}

      {/* Selected design modal */}
      {selectedDesign && (
        <div className="gallery-modal" onClick={() => setSelectedDesign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedDesign(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <img
              src={selectedDesign.imageUrl}
              alt="Selected design"
              className="modal-image"
            />
            {selectedDesign.settings && (
              <div className="modal-info">
                <div className="settings-badges">
                  {selectedDesign.settings.style && (
                    <span className="badge bg-main text-white me-2">
                      {selectedDesign.settings.style}
                    </span>
                  )}
                  {selectedDesign.settings.roomType && (
                    <span className="badge bg-light text-dark me-2">
                      {selectedDesign.settings.roomType}
                    </span>
                  )}
                </div>
                <span className="design-date text-muted">
                  {new Date(selectedDesign.createdAt).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Helper to save a design to the gallery
 */
export const saveToGallery = (design) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const gallery = stored ? JSON.parse(stored) : [];

    gallery.unshift({
      id: Date.now(),
      imageUrl: design.imageUrl,
      originalUrl: design.originalUrl,
      prompt: design.prompt,
      settings: design.settings,
      createdAt: new Date().toISOString(),
    });

    // Keep only last MAX_DESIGNS
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery.slice(0, MAX_DESIGNS)));
    return true;
  } catch (error) {
    console.error('Failed to save to gallery:', error);
    return false;
  }
};

export default DesignGallery;
