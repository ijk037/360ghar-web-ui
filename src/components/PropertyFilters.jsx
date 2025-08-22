import React, { useState, useCallback } from 'react';
import usePropertyStore from '../store/propertyStore';
import { useLocationStore } from '../store/locationStore';
import GooglePlacesInput from '../common/GooglePlacesInput';

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
    { value: 'buy', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
    { value: 'short_stay', label: 'Short Stay' }
  ];

  // Sort options matching API documentation
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'distance', label: 'Distance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'relevance', label: 'Relevance' }
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

  // Handle location selection from Google Places
  const handleLocationSelect = useCallback(({ lat, lng, name }) => {
    setLocation({ lat, lng, name });
    updateFilter('lat', lat);
    updateFilter('lng', lng);
  }, [setLocation, updateFilter]);

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
    <div className="property-filters">
      <div className="row gy-4">
        
        {/* Basic Search Row */}
        <div className="col-lg-6">
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search by keyword, title, or description..."
              className="common-input common-input--withLeftIcon pill"
              value={filters.q || ''}
              onChange={(e) => updateFilter('q', e.target.value)}
            />
            <span className="input-icon input-icon--left text-gradient">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        <div className="col-lg-6">
          <GooglePlacesInput
            placeholder={location?.name || 'Search any location, building, street...'}
            className="common-input pill w-100"
            restrictCountry="in"
            onSelect={handleLocationSelect}
          />
        </div>

        {/* Purpose and Sort */}
        <div className="col-lg-3 col-md-6">
          <div className="select-has-icon">
            <select
              className="form-select common-input pill"
              value={filters.purpose || ''}
              onChange={(e) => updateFilter('purpose', e.target.value)}
            >
              <option value="">All Purposes</option>
              {purposes.map(purpose => (
                <option key={purpose.value} value={purpose.value}>{purpose.label}</option>
              ))}
            </select>
            <span className="input-icon input-icon--left text-gradient">
              <i className="fas fa-tags"></i>
            </span>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="select-has-icon">
            <select
              className="form-select common-input pill"
              value={filters.sort_by || 'newest'}
              onChange={(e) => updateFilter('sort_by', e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <span className="input-icon input-icon--left text-gradient">
              <i className="fas fa-sort"></i>
            </span>
          </div>
        </div>

        {/* Location Radius (when location is set) */}
        {filters.lat && filters.lng && (
          <div className="col-lg-3 col-md-6">
            <div className="select-has-icon">
              <select
                className="form-select common-input pill"
                value={filters.radius || 20}
                onChange={(e) => updateFilter('radius', parseInt(e.target.value))}
              >
                <option value={5}>5 km radius</option>
                <option value={10}>10 km radius</option>
                <option value={20}>20 km radius</option>
                <option value={50}>50 km radius</option>
                <option value={100}>100 km radius</option>
              </select>
              <span className="input-icon input-icon--left text-gradient">
                <i className="fas fa-map-marker-alt"></i>
              </span>
            </div>
          </div>
        )}

        {/* Property Types */}
        <div className={filters.lat && filters.lng ? "col-lg-3" : "col-lg-6"}>
          <div className="property-types-checkboxes">
            <label className="form-label">Property Types:</label>
            <div className="d-flex flex-wrap gap-2">
              {propertyTypes.map(type => (
                <div key={type.value} className="form-check">
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
        </div>

        {/* Price Range */}
        <div className="col-lg-3 col-md-6">
          <input
            type="number"
            placeholder="Min Price"
            className="common-input pill"
            value={filters.price_min || ''}
            onChange={(e) => updateFilter('price_min', e.target.value ? parseFloat(e.target.value) : null)}
            min="0"
          />
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            type="number"
            placeholder="Max Price"
            className="common-input pill"
            value={filters.price_max || ''}
            onChange={(e) => updateFilter('price_max', e.target.value ? parseFloat(e.target.value) : null)}
            min="0"
          />
        </div>

        {/* Bedrooms */}
        <div className="col-lg-3 col-md-6">
          <input
            type="number"
            placeholder="Min Bedrooms"
            className="common-input pill"
            value={filters.bedrooms_min || ''}
            onChange={(e) => updateFilter('bedrooms_min', e.target.value ? parseInt(e.target.value) : null)}
            min="0"
            max="20"
          />
        </div>
        <div className="col-lg-3 col-md-6">
          <input
            type="number"
            placeholder="Max Bedrooms"
            className="common-input pill"
            value={filters.bedrooms_max || ''}
            onChange={(e) => updateFilter('bedrooms_max', e.target.value ? parseInt(e.target.value) : null)}
            min="0"
            max="20"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-link text-primary p-0"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
            <i className={`fas fa-chevron-${showAdvancedFilters ? 'up' : 'down'} ms-2`}></i>
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <>
            {/* Bathrooms */}
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Min Bathrooms"
                className="common-input pill"
                value={filters.bathrooms_min || ''}
                onChange={(e) => updateFilter('bathrooms_min', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="10"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Max Bathrooms"
                className="common-input pill"
                value={filters.bathrooms_max || ''}
                onChange={(e) => updateFilter('bathrooms_max', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="10"
              />
            </div>

            {/* Area */}
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Min Area (sqft)"
                className="common-input pill"
                value={filters.area_min || ''}
                onChange={(e) => updateFilter('area_min', e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Max Area (sqft)"
                className="common-input pill"
                value={filters.area_max || ''}
                onChange={(e) => updateFilter('area_max', e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
              />
            </div>

            {/* Location Details */}
            <div className="col-lg-4 col-md-6">
              <input
                type="text"
                placeholder="City"
                className="common-input pill"
                value={filters.city || ''}
                onChange={(e) => updateFilter('city', e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="text"
                placeholder="Locality/Area"
                className="common-input pill"
                value={filters.locality || ''}
                onChange={(e) => updateFilter('locality', e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <input
                type="text"
                placeholder="PIN Code"
                className="common-input pill"
                value={filters.pincode || ''}
                onChange={(e) => updateFilter('pincode', e.target.value)}
              />
            </div>

            {/* Additional Property Filters */}
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Min Parking Spaces"
                className="common-input pill"
                value={filters.parking_spaces_min || ''}
                onChange={(e) => updateFilter('parking_spaces_min', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Min Floor"
                className="common-input pill"
                value={filters.floor_number_min || ''}
                onChange={(e) => updateFilter('floor_number_min', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="100"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Max Floor"
                className="common-input pill"
                value={filters.floor_number_max || ''}
                onChange={(e) => updateFilter('floor_number_max', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
                max="100"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Max Age (years)"
                className="common-input pill"
                value={filters.age_max || ''}
                onChange={(e) => updateFilter('age_max', e.target.value ? parseInt(e.target.value) : null)}
                min="0"
              />
            </div>

            {/* Short Stay Filters */}
            {filters.purpose === 'short_stay' && (
              <>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="date"
                    className="common-input pill"
                    value={filters.check_in || ''}
                    onChange={(e) => updateFilter('check_in', e.target.value)}
                  />
                  <label className="form-label">Check-in Date</label>
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="date"
                    className="common-input pill"
                    value={filters.check_out || ''}
                    onChange={(e) => updateFilter('check_out', e.target.value)}
                  />
                  <label className="form-label">Check-out Date</label>
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="number"
                    placeholder="Number of Guests"
                    className="common-input pill"
                    value={filters.guests || ''}
                    onChange={(e) => updateFilter('guests', e.target.value ? parseInt(e.target.value) : null)}
                    min="1"
                    max="20"
                  />
                </div>
              </>
            )}

            {/* Amenities */}
            <div className="col-12">
              <div className="amenities-section">
                <label className="form-label">Amenities:</label>
                <div className="row g-2">
                  {amenities.map(amenity => (
                    <div key={amenity} className="col-lg-3 col-md-4 col-sm-6">
                      <div className="form-check">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="col-12">
              <div className="features-section">
                <label className="form-label">Features:</label>
                <div className="row g-2">
                  {features.map(feature => (
                    <div key={feature} className="col-lg-3 col-md-4 col-sm-6">
                      <div className="form-check">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="col-12">
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <button 
              type="button" 
              className={`btn btn-main ${filtersChanged ? 'btn-main-active' : ''}`}
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
                  Search Properties
                  {activeFiltersCount > 0 && (
                    <span className="badge bg-white text-primary ms-2">{activeFiltersCount}</span>
                  )}
                </>
              )}
            </button>
            
            {activeFiltersCount > 0 && (
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={handleClearFilters}
                disabled={isLoading}
              >
                <i className="fas fa-times me-2"></i>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;