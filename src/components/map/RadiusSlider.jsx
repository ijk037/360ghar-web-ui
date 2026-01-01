import React from 'react';

const RadiusSlider = ({ radius = 20, onRadiusChange, min = 1, max = 50 }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    onRadiusChange(value);
  };

  return (
    <div className="radius-slider-container">
      <div className="radius-slider-header">
        <label className="radius-slider-label">
          <i className="fas fa-draw-circle me-2"></i>
          Search Radius
        </label>
        <span className="radius-value">{radius} km</span>
      </div>
      
      <div className="radius-slider-wrapper">
        <input
          type="range"
          className="radius-slider"
          min={min}
          max={max}
          value={radius}
          onChange={handleChange}
          step="1"
        />
        <div className="radius-slider-track">
          <div 
            className="radius-slider-fill" 
            style={{ width: `${((radius - min) / (max - min)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="radius-slider-labels">
        <span className="radius-label-min">{min} km</span>
        <span className="radius-label-max">{max} km</span>
      </div>
    </div>
  );
};

export default RadiusSlider;
