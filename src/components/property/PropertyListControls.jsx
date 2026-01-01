import React from 'react';

const PropertyListControls = ({
  viewMode = 'grid-2',
  onViewModeChange,
  sortBy = 'newest',
  onSortChange,
  groupByLocation = true,
  onGroupByLocationChange,
  totalProperties = 0
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'fa-clock' },
    { value: 'price_asc', label: 'Price: Low to High', icon: 'fa-arrow-up' },
    { value: 'price_desc', label: 'Price: High to Low', icon: 'fa-arrow-down' },
    { value: 'distance', label: 'Distance', icon: 'fa-location-arrow' },
    { value: 'area_asc', label: 'Area: Small to Large', icon: 'fa-ruler' },
    { value: 'area_desc', label: 'Area: Large to Small', icon: 'fa-ruler' }
  ];

  const viewModes = [
    { value: 'grid-1', label: 'Single Column', icon: 'fa-list' },
    { value: 'grid-2', label: 'Two Columns', icon: 'fa-th-large' }
  ];

  return (
    <div className="property-list-controls">
      <div className="controls-left">
        <span className="controls-count">
          <i className="fas fa-home me-2"></i>
          <strong>{totalProperties}</strong> {totalProperties === 1 ? 'Property' : 'Properties'}
        </span>
      </div>

      <div className="controls-right">
        {/* Group by Location Toggle */}
        <div className="control-item">
          <button
            className={`control-btn ${groupByLocation ? 'active' : ''}`}
            onClick={() => onGroupByLocationChange(!groupByLocation)}
            title={groupByLocation ? 'Grouped by Location' : 'Show All Properties'}
          >
            <i className={`fas ${groupByLocation ? 'fa-map-marked-alt' : 'fa-list-ul'} me-1`}></i>
            {groupByLocation ? 'Grouped' : 'All'}
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="control-item view-mode-controls">
          {viewModes.map(mode => (
            <button
              key={mode.value}
              className={`control-btn ${viewMode === mode.value ? 'active' : ''}`}
              onClick={() => onViewModeChange(mode.value)}
              title={mode.label}
            >
              <i className={`fas ${mode.icon}`}></i>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="control-item">
          <select
            className="control-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyListControls;
