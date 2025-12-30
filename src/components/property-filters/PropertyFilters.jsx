import React, { useState, useCallback } from 'react';
import usePropertyStore from '../../store/propertyStore';
import { useLocationStore } from '../../store/locationStore';

const PropertyFilters = ({ showAdvanced = false }) => {
  const {
    filters,
    updateFilter,
    clearFilters,
    applyFilters,
    isLoading,
    filtersChanged,
    getActiveFiltersCount
  } = usePropertyStore();

  const { location, setLocation } = useLocationStore();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(showAdvanced);

  const activeFiltersCount = getActiveFiltersCount();

  // Property types matching API documentation
  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'builder_floor', label: 'Builder Floor' },
    { value: 'room', label: 'Room' }
  ];

  // Purpose options matching API documentation
  const purposes = [
    { value: '', label: 'All' },
    { value: 'buy', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
    { value: 'short_stay', label: 'Short Stay' }
  ];

  // Bedroom options
  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' }
  ];

  // Amenities list
  const amenities = [
    'Parking', 'Security', 'Garden', 'Gym', 'Swimming Pool', 'Power Backup',
    'Water Supply', 'Waste Management', 'Intercom', 'Gas Pipeline', 'WiFi',
    'Air Conditioning', 'RO Water System', 'Servant Room', 'Study Room'
  ];

  // Features list
  const features = [
    'Furnished', 'Semi-Furnished', 'Unfurnished', 'Modular Kitchen',
    'Built-in Wardrobes', 'False Ceiling', 'Wooden Flooring', 'Marble Flooring',
    'Corner Property', 'Park Facing', 'Main Road Facing', 'East Facing'
  ];

  // Handle property type change (multi-select)
  const handlePropertyTypeChange = useCallback((type, checked) => {
    const currentTypes = [...(filters.property_type || [])];
    if (checked) {
      if (!currentTypes.includes(type)) {
        updateFilter('property_type', [...currentTypes, type]);
      }
    } else {
      updateFilter('property_type', currentTypes.filter(t => t !== type));
    }
  }, [filters.property_type, updateFilter]);

  // Handle amenity change (multi-select)
  const handleAmenityChange = useCallback((amenity, checked) => {
    const currentAmenities = [...(filters.amenities || [])];
    if (checked) {
      if (!currentAmenities.includes(amenity)) {
        updateFilter('amenities', [...currentAmenities, amenity]);
      }
    } else {
      updateFilter('amenities', currentAmenities.filter(a => a !== amenity));
    }
  }, [filters.amenities, updateFilter]);

  // Handle feature change (multi-select)
  const handleFeatureChange = useCallback((feature, checked) => {
    const currentFeatures = [...(filters.features || [])];
    if (checked) {
      if (!currentFeatures.includes(feature)) {
        updateFilter('features', [...currentFeatures, feature]);
      }
    } else {
      updateFilter('features', currentFeatures.filter(f => f !== feature));
    }
  }, [filters.features, updateFilter]);

  // Handle bedroom selection
  const handleBedroomChange = (value) => {
    if (value === '') {
      updateFilter('bedrooms_min', null);
      updateFilter('bedrooms_max', null);
    } else if (value === '4') {
      updateFilter('bedrooms_min', 4);
      updateFilter('bedrooms_max', null);
    } else {
      const num = parseInt(value);
      updateFilter('bedrooms_min', num);
      updateFilter('bedrooms_max', num);
    }
  };

  // Get current bedroom value for display
  const getCurrentBedroomValue = () => {
    if (!filters.bedrooms_min && !filters.bedrooms_max) return '';
    if (filters.bedrooms_min >= 4) return '4';
    if (filters.bedrooms_min === filters.bedrooms_max) return String(filters.bedrooms_min);
    return '';
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!filtersChanged && !isLoading) return;
    await applyFilters();
  };

  // Handle clear filters
  const handleClearFilters = () => {
    clearFilters();
    setLocation({ lat: null, lng: null, name: 'Search any location...' });
  };

  return (
    <div className="property-filter-sidebar">
      {/* Purpose */}
      <div className="filter-group">
        <h6 className="filter-group__title">Purpose</h6>
        <div className="filter-group__content">
          {purposes.map(purpose => (
            <div key={purpose.value} className="common-radio">
              <input
                className="form-check-input"
                type="radio"
                name="purpose"
                id={`purpose-${purpose.value || 'all'}`}
                value={purpose.value}
                checked={(filters.purpose || '') === purpose.value}
                onChange={(e) => updateFilter('purpose', e.target.value)}
              />
              <label className="form-check-label" htmlFor={`purpose-${purpose.value || 'all'}`}>
                {purpose.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="filter-group">
        <h6 className="filter-group__title">Property Type</h6>
        <div className="filter-group__content">
          {propertyTypes.map(type => (
            <div key={type.value} className="common-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`type-${type.value}`}
                checked={filters.property_type?.includes(type.value) || false}
                onChange={(e) => handlePropertyTypeChange(type.value, e.target.checked)}
              />
              <label className="form-check-label" htmlFor={`type-${type.value}`}>
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="filter-group">
        <h6 className="filter-group__title">Budget</h6>
        <div className="filter-group__content">
          <div className="filter-group__row">
            <input
              type="number"
              placeholder="Min"
              className="common-input common-input--sm"
              value={filters.price_min || ''}
              onChange={(e) => updateFilter('price_min', e.target.value ? parseFloat(e.target.value) : null)}
              min="0"
            />
            <span className="filter-group__separator">-</span>
            <input
              type="number"
              placeholder="Max"
              className="common-input common-input--sm"
              value={filters.price_max || ''}
              onChange={(e) => updateFilter('price_max', e.target.value ? parseFloat(e.target.value) : null)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="filter-group">
        <h6 className="filter-group__title">Bedrooms</h6>
        <div className="filter-group__content">
          <div className="bedroom-buttons">
            {bedroomOptions.map(option => (
              <button
                key={option.value}
                type="button"
                className={`bedroom-btn ${getCurrentBedroomValue() === option.value ? 'active' : ''}`}
                onClick={() => handleBedroomChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Location Radius (when location is set) */}
      {filters.lat && filters.lng && (
        <div className="filter-group">
          <h6 className="filter-group__title">Search Radius</h6>
          <div className="filter-group__content">
            <select
              className="form-select common-input common-input--sm"
              value={filters.radius || 20}
              onChange={(e) => updateFilter('radius', parseInt(e.target.value))}
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
            </select>
          </div>
        </div>
      )}

      {/* Advanced Filters Toggle */}
      <div className="filter-group">
        <button
          type="button"
          className="filter-group__toggle"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
          <i className={`fas fa-chevron-${showAdvancedFilters ? 'up' : 'down'}`}></i>
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="filter-group filter-group--advanced">
          {/* Bathrooms */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Bathrooms</h6>
            <div className="filter-group__row">
              <input
                type="number"
                placeholder="Min"
                className="common-input common-input--sm"
                value={filters.bathrooms_min || ''}
                onChange={(e) => updateFilter('bathrooms_min', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="10"
              />
              <span className="filter-group__separator">-</span>
              <input
                type="number"
                placeholder="Max"
                className="common-input common-input--sm"
                value={filters.bathrooms_max || ''}
                onChange={(e) => updateFilter('bathrooms_max', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="10"
              />
            </div>
          </div>

          {/* Area */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Area (sqft)</h6>
            <div className="filter-group__row">
              <input
                type="number"
                placeholder="Min"
                className="common-input common-input--sm"
                value={filters.area_min || ''}
                onChange={(e) => updateFilter('area_min', e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
              />
              <span className="filter-group__separator">-</span>
              <input
                type="number"
                placeholder="Max"
                className="common-input common-input--sm"
                value={filters.area_max || ''}
                onChange={(e) => updateFilter('area_max', e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
              />
            </div>
          </div>

          {/* Floor */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Floor</h6>
            <div className="filter-group__row">
              <input
                type="number"
                placeholder="Min"
                className="common-input common-input--sm"
                value={filters.floor_number_min || ''}
                onChange={(e) => updateFilter('floor_number_min', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="100"
              />
              <span className="filter-group__separator">-</span>
              <input
                type="number"
                placeholder="Max"
                className="common-input common-input--sm"
                value={filters.floor_number_max || ''}
                onChange={(e) => updateFilter('floor_number_max', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Additional Filters */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Other</h6>
            <div className="filter-group__row mb-2">
              <input
                type="number"
                placeholder="Min Parking"
                className="common-input common-input--sm flex-grow-1"
                value={filters.parking_spaces_min || ''}
                onChange={(e) => updateFilter('parking_spaces_min', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
              />
            </div>
            <div className="filter-group__row">
              <input
                type="number"
                placeholder="Max Age (years)"
                className="common-input common-input--sm flex-grow-1"
                value={filters.age_max || ''}
                onChange={(e) => updateFilter('age_max', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
              />
            </div>
          </div>

          {/* Location Details */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Location</h6>
            <input
              type="text"
              placeholder="City"
              className="common-input common-input--sm mb-2"
              value={filters.city || ''}
              onChange={(e) => updateFilter('city', e.target.value)}
            />
            <input
              type="text"
              placeholder="Locality/Area"
              className="common-input common-input--sm mb-2"
              value={filters.locality || ''}
              onChange={(e) => updateFilter('locality', e.target.value)}
            />
            <input
              type="text"
              placeholder="PIN Code"
              className="common-input common-input--sm"
              value={filters.pincode || ''}
              onChange={(e) => updateFilter('pincode', e.target.value)}
            />
          </div>

          {/* Short Stay Filters */}
          {filters.purpose === 'short_stay' && (
            <div className="filter-group__section">
              <h6 className="filter-group__subtitle">Short Stay</h6>
              <div className="mb-2">
                <label className="form-label small">Check-in</label>
                <input
                  type="date"
                  className="common-input common-input--sm"
                  value={filters.check_in || ''}
                  onChange={(e) => updateFilter('check_in', e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small">Check-out</label>
                <input
                  type="date"
                  className="common-input common-input--sm"
                  value={filters.check_out || ''}
                  onChange={(e) => updateFilter('check_out', e.target.value)}
                />
              </div>
              <input
                type="number"
                placeholder="Number of Guests"
                className="common-input common-input--sm"
                value={filters.guests || ''}
                onChange={(e) => updateFilter('guests', e.target.value ? parseInt(e.target.value) : null)}
                min="1"
                max="20"
              />
            </div>
          )}

          {/* Amenities */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Amenities</h6>
            <div className="filter-group__grid">
              {amenities.map(amenity => (
                <div key={amenity} className="common-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={filters.amenities?.includes(amenity) || false}
                    onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={`amenity-${amenity}`}>
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="filter-group__section">
            <h6 className="filter-group__subtitle">Features</h6>
            <div className="filter-group__grid">
              {features.map(feature => (
                <div key={feature} className="common-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`feature-${feature}`}
                    checked={filters.features?.includes(feature) || false}
                    onChange={(e) => handleFeatureChange(feature, e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={`feature-${feature}`}>
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="filter-group filter-group--actions">
        <button
          type="button"
          className={`btn btn-main w-100 ${filtersChanged ? 'btn-main-active' : ''}`}
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Searching...
            </>
          ) : (
            <>
              <i className="fas fa-search me-2"></i>
              Search
              {activeFiltersCount > 0 && (
                <span className="badge bg-white text-primary ms-2">{activeFiltersCount}</span>
              )}
            </>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            className="btn btn-outline-secondary w-100 mt-2"
            onClick={handleClearFilters}
            disabled={isLoading}
          >
            <i className="fas fa-times me-2"></i>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;
