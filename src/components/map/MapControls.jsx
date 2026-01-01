import React from 'react';

const MapControls = ({
  mapType = 'roadmap',
  onMapTypeChange,
  onZoomReset,
  onMyLocation,
  showFullScreen = false,
  onFullScreenToggle
}) => {
  const mapTypes = [
    { value: 'roadmap', label: 'Map', icon: 'fa-map' },
    { value: 'satellite', label: 'Satellite', icon: 'fa-satellite' },
    { value: 'hybrid', label: 'Hybrid', icon: 'fa-layer-group' }
  ];

  return (
    <div className="map-controls">
      <div className="map-controls-group">
        <h6 className="map-controls-title">
          <i className="fas fa-sliders-h me-2"></i>
          Map Controls
        </h6>
        
        {/* Map Type Selector */}
        <div className="map-type-selector">
          {mapTypes.map(type => (
            <button
              key={type.value}
              className={`map-type-btn ${mapType === type.value ? 'active' : ''}`}
              onClick={() => onMapTypeChange(type.value)}
              title={type.label}
            >
              <i className={`fas ${type.icon}`}></i>
              <span className="map-type-label">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="map-quick-actions">
          <button
            className="map-action-btn"
            onClick={onZoomReset}
            title="Reset Zoom"
          >
            <i className="fas fa-compress-arrows-alt me-2"></i>
            Reset View
          </button>
          
          <button
            className="map-action-btn"
            onClick={onMyLocation}
            title="Go to My Location"
          >
            <i className="fas fa-location-crosshairs me-2"></i>
            My Location
          </button>

          {showFullScreen && (
            <button
              className="map-action-btn"
              onClick={onFullScreenToggle}
              title="Toggle Full Screen"
            >
              <i className="fas fa-expand me-2"></i>
              Full Screen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapControls;
