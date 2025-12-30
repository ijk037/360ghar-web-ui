import React from 'react';
import usePropertyStore from '../../store/propertyStore';
import { useLocationStore } from '../../store/locationStore';
import GooglePlacesInput from '../../common/GooglePlacesInput';

const PropertyTopBar = () => {
  const {
    filters,
    updateFilter,
    applyFilters,
    isLoading
  } = usePropertyStore();

  const { location, setLocation } = useLocationStore();

  // Sort options matching API documentation
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'distance', label: 'Distance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'relevance', label: 'Relevance' }
  ];

  // Handle location selection from Google Places
  const handleLocationSelect = ({ lat, lng, name }) => {
    setLocation({ lat, lng, name });
    updateFilter('lat', lat);
    updateFilter('lng', lng);
  };

  // Handle search on Enter key
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      await applyFilters();
    }
  };

  return (
    <div className="property-top-bar">
      <div className="property-top-bar__search">
        <div className="property-top-bar__field">
          <label className="property-top-bar__label">
            <i className="fas fa-search"></i>
            Search
          </label>
          <input
            type="text"
            placeholder="Keyword, title, description..."
            className="common-input common-input--compact"
            value={filters.q || ''}
            onChange={(e) => updateFilter('q', e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="property-top-bar__field property-top-bar__field--location">
          <label className="property-top-bar__label">
            <i className="fas fa-map-marker-alt"></i>
            Location
          </label>
          <GooglePlacesInput
            placeholder={location?.name && location?.lat ? location.name : 'City, area, locality...'}
            className="common-input common-input--compact w-100"
            restrictCountry="in"
            onSelect={handleLocationSelect}
          />
        </div>
      </div>

      <div className="property-top-bar__actions">
        <div className="property-top-bar__field property-top-bar__field--sort">
          <label className="property-top-bar__label">
            <i className="fas fa-sort"></i>
            Sort
          </label>
          <select
            className="form-select common-input common-input--compact"
            value={filters.sort_by || 'newest'}
            onChange={(e) => {
              updateFilter('sort_by', e.target.value);
              applyFilters();
            }}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="btn btn-main property-top-bar__btn"
          onClick={applyFilters}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : (
            <i className="fas fa-search"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default PropertyTopBar;
