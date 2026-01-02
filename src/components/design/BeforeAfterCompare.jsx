import React, { useState, useRef, useCallback } from 'react';

/**
 * BeforeAfterCompare - Side-by-side comparison slider
 * For img2img results comparing original to generated
 */
const BeforeAfterCompare = ({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  return (
    <div className="before-after-compare">
      <label className="form-label mb-3">
        <i className="fas fa-columns me-2"></i>
        Before & After Comparison
      </label>

      <div
        ref={containerRef}
        className="compare-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Before (Original) Image */}
        <div className="compare-image compare-before">
          <img src={beforeImage} alt={beforeLabel} />
          <span className="compare-label label-before">{beforeLabel}</span>
        </div>

        {/* After (Generated) Image - clipped */}
        <div
          className="compare-image compare-after"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={afterImage} alt={afterLabel} />
          <span className="compare-label label-after">{afterLabel}</span>
        </div>

        {/* Slider handle */}
        <div
          className="compare-slider"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="slider-handle">
            <i className="fas fa-grip-lines-vertical"></i>
          </div>
          <div className="slider-line"></div>
        </div>
      </div>

      <p className="text-muted small mt-2 text-center">
        <i className="fas fa-hand-pointer me-1"></i>
        Drag the slider to compare original and AI-generated design
      </p>
    </div>
  );
};

export default BeforeAfterCompare;
