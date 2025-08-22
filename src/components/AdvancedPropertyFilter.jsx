import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocationStore } from '../store/locationStore';
import GooglePlacesInput from '../common/GooglePlacesInput';

const AdvancedPropertyFilter = ({ buttonText = "Search Properties" }) => {
  const { location, setLocation } = useLocationStore();
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formik = useFormik({
    initialValues: {
      // Basic Search
      searchKeyword: '',
      purpose: 'all',
      property_type: [],

      // Location
      city: '',
      locality: '',

      // Price Range
      min_price: '',
      max_price: '',

      // Property Details
      bedrooms_min: '',
      bedrooms_max: '',
      bathrooms_min: '',
      bathrooms_max: '',
      area_min: '',
      area_max: '',

      // Advanced Filters
      amenities: [],
      features: [],
      parking_spaces_min: '',
      floor_number_min: '',
      floor_number_max: '',
      age_max: '',

      // Short Stay
      check_in: '',
      check_out: '',
      guests: '',

      // Sorting
      sort_by: 'newest',
    },
    validationSchema: yup.object({
      searchKeyword: yup.string().optional(),
      min_price: yup.number().min(0, 'Price must be positive').optional(),
      max_price: yup.number().min(0, 'Price must be positive').optional(),
      bedrooms_min: yup.number().min(0).max(20).optional(),
      bedrooms_max: yup.number().min(0).max(20).optional(),
      bathrooms_min: yup.number().min(0).max(10).optional(),
      bathrooms_max: yup.number().min(0).max(10).optional(),
      area_min: yup.number().min(0).optional(),
      area_max: yup.number().min(0).optional(),
      parking_spaces_min: yup.number().min(0).optional(),
      floor_number_min: yup.number().min(0).max(100).optional(),
      floor_number_max: yup.number().min(0).max(100).optional(),
      age_max: yup.number().min(0).optional(),
      guests: yup.number().min(1).max(20).optional(),
    }),
    onSubmit: (values) => {
      try {
        // Build query parameters
        const params = new URLSearchParams();

        // Basic search
        if (values.searchKeyword) params.set('q', values.searchKeyword);
        if (values.purpose && values.purpose !== 'all') params.set('purpose', values.purpose);

        // Property types
        if (values.property_type.length > 0) {
          values.property_type.forEach(type => params.append('property_type', type));
        }

        // Location
        if (values.city) params.set('city', values.city);
        if (values.locality) params.set('locality', values.locality);

        // Price
        if (values.min_price) params.set('price_min', values.min_price);
        if (values.max_price) params.set('price_max', values.max_price);

        // Property details
        if (values.bedrooms_min) params.set('bedrooms_min', values.bedrooms_min);
        if (values.bedrooms_max) params.set('bedrooms_max', values.bedrooms_max);
        if (values.bathrooms_min) params.set('bathrooms_min', values.bathrooms_min);
        if (values.bathrooms_max) params.set('bathrooms_max', values.bathrooms_max);
        if (values.area_min) params.set('area_min', values.area_min);
        if (values.area_max) params.set('area_max', values.area_max);

        // Advanced filters
        if (values.amenities.length > 0) {
          values.amenities.forEach(amenity => params.append('amenities', amenity));
        }
        if (values.features.length > 0) {
          values.features.forEach(feature => params.append('features', feature));
        }
        if (values.parking_spaces_min) params.set('parking_spaces_min', values.parking_spaces_min);
        if (values.floor_number_min) params.set('floor_number_min', values.floor_number_min);
        if (values.floor_number_max) params.set('floor_number_max', values.floor_number_max);
        if (values.age_max) params.set('age_max', values.age_max);

        // Short stay
        if (values.check_in) params.set('check_in', values.check_in);
        if (values.check_out) params.set('check_out', values.check_out);
        if (values.guests) params.set('guests', values.guests);

        // Sorting
        if (values.sort_by && values.sort_by !== 'newest') params.set('sort_by', values.sort_by);

        // Location coordinates
        if (location.lat && location.lng) {
          params.set('lat', location.lat.toString());
          params.set('lng', location.lng.toString());
          params.set('radius', '20');
        }

        toast.success("Search filters applied successfully!", {
          theme: "colored",
          position: "top-right"
        });

        // Navigate to property page with filters
        navigate(`/properties?${params.toString()}`);

      } catch (error) {
        toast.error("Error applying filters. Please try again.", {
          theme: "colored"
        });
      }
    },
  });

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'builder_floor', label: 'Builder Floor' },
    { value: 'room', label: 'Room' }
  ];

  const purposes = [
    { value: 'buy', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
    { value: 'short_stay', label: 'Short Stay' }
  ];

  const amenities = [
    'Parking', 'Security', 'Garden', 'Gym', 'Swimming Pool', 'Power Backup',
    'Water Supply', 'Waste Management', 'Intercom', 'Gas Pipeline', 'WiFi',
    'Air Conditioning', 'RO Water System', 'Servant Room', 'Study Room'
  ];

  const features = [
    'Furnished', 'Semi-Furnished', 'Unfurnished', 'Modular Kitchen',
    'Built-in Wardrobes', 'False Ceiling', 'Wooden Flooring', 'Marble Flooring',
    'Corner Property', 'Park Facing', 'Main Road Facing', 'East Facing'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'distance', label: 'Distance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'relevance', label: 'Relevance' }
  ];

  const handlePropertyTypeChange = (type, checked) => {
    const currentTypes = [...formik.values.property_type];
    if (checked) {
      if (!currentTypes.includes(type)) {
        formik.setFieldValue('property_type', [...currentTypes, type]);
      }
    } else {
      formik.setFieldValue('property_type', currentTypes.filter(t => t !== type));
    }
  };

  const handleAmenityChange = (amenity, checked) => {
    const currentAmenities = [...formik.values.amenities];
    if (checked) {
      if (!currentAmenities.includes(amenity)) {
        formik.setFieldValue('amenities', [...currentAmenities, amenity]);
      }
    } else {
      formik.setFieldValue('amenities', currentAmenities.filter(a => a !== amenity));
    }
  };

  const handleFeatureChange = (feature, checked) => {
    const currentFeatures = [...formik.values.features];
    if (checked) {
      if (!currentFeatures.includes(feature)) {
        formik.setFieldValue('features', [...currentFeatures, feature]);
      }
    } else {
      formik.setFieldValue('features', currentFeatures.filter(f => f !== feature));
    }
  };

  const resetFilters = () => {
    formik.resetForm();
    setLocation({ lat: null, lng: null, name: 'Search any location...' });
    toast.info("All filters cleared", { theme: "colored" });
  };

  return (
    <>
      <ToastContainer />
      <div className="advanced-property-filter">
        <form onSubmit={formik.handleSubmit}>
          <div className="row gy-4">
            {/* Basic Search Row */}
            <div className="col-lg-6">
              <input
                type="text"
                placeholder="Search by keyword, title, or description..."
                name="searchKeyword"
                className="common-input"
                value={formik.values.searchKeyword}
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-lg-6">
              <GooglePlacesInput
                placeholder={location.name || 'Search any location, building, street...'}
                className="common-input w-100"
                restrictCountry="in"
                onSelect={({ lat, lng, name }) => setLocation({ lat, lng, name })}
              />
            </div>

            {/* Property Type and Purpose */}
            <div className="col-lg-3 col-md-6">
              <div className="select-has-icon">
                <select
                  className="select common-input"
                  name="purpose"
                  value={formik.values.purpose}
                  onChange={formik.handleChange}
                >
                  <option value="all">All Purposes</option>
                  {purposes.map(purpose => (
                    <option key={purpose.value} value={purpose.value}>{purpose.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="select-has-icon">
                <select
                  className="select common-input"
                  name="sort_by"
                  value={formik.values.sort_by}
                  onChange={formik.handleChange}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="property-types-checkboxes">
                <label className="form-label">Property Types:</label>
                <div className="row g-2">
                  {propertyTypes.map(type => (
                    <div key={type.value} className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`type-${type.value}`}
                          checked={formik.values.property_type.includes(type.value)}
                          onChange={(e) => handlePropertyTypeChange(type.value, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={`type-${type.value}`}>
                          {type.label}
                        </label>
                      </div>
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
                name="min_price"
                className="common-input"
                value={formik.values.min_price}
                onChange={formik.handleChange}
                min="0"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <input
                type="number"
                placeholder="Max Price"
                name="max_price"
                className="common-input"
                value={formik.values.max_price}
                onChange={formik.handleChange}
                min="0"
              />
            </div>

            {/* Property Details */}
            <div className="col-lg-3 col-md-4 col-sm-6">
              <input
                type="number"
                placeholder="Min Bedrooms"
                name="bedrooms_min"
                className="common-input"
                value={formik.values.bedrooms_min}
                onChange={formik.handleChange}
                min="0"
                max="20"
              />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <input
                type="number"
                placeholder="Max Bedrooms"
                name="bedrooms_max"
                className="common-input"
                value={formik.values.bedrooms_max}
                onChange={formik.handleChange}
                min="0"
                max="20"
              />
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <input
                type="number"
                placeholder="Min Bathrooms"
                name="bathrooms_min"
                className="common-input"
                value={formik.values.bathrooms_min}
                onChange={formik.handleChange}
                min="0"
                max="10"
              />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <input
                type="number"
                placeholder="Max Bathrooms"
                name="bathrooms_max"
                className="common-input"
                value={formik.values.bathrooms_max}
                onChange={formik.handleChange}
                min="0"
                max="10"
              />
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6">
              <input
                type="number"
                placeholder="Min Area (sqft)"
                name="area_min"
                className="common-input"
                value={formik.values.area_min}
                onChange={formik.handleChange}
                min="0"
              />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <input
                type="number"
                placeholder="Max Area (sqft)"
                name="area_max"
                className="common-input"
                value={formik.values.area_max}
                onChange={formik.handleChange}
                min="0"
              />
            </div>

            {/* Advanced Filters Toggle */}
            <div className="col-12">
              <button
                type="button"
                className="btn btn-link text-primary p-0"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
                <i className={`fas fa-chevron-${showAdvanced ? 'up' : 'down'} ms-2`}></i>
              </button>
            </div>

            {showAdvanced && (
              <>
                {/* Location Details */}
                <div className="col-lg-6">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="common-input"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    type="text"
                    placeholder="Locality/Area"
                    name="locality"
                    className="common-input"
                    value={formik.values.locality}
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Advanced Property Filters */}
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="number"
                    placeholder="Min Parking Spaces"
                    name="parking_spaces_min"
                    className="common-input"
                    value={formik.values.parking_spaces_min}
                    onChange={formik.handleChange}
                    min="0"
                  />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="number"
                    placeholder="Min Floor"
                    name="floor_number_min"
                    className="common-input"
                    value={formik.values.floor_number_min}
                    onChange={formik.handleChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="number"
                    placeholder="Max Floor"
                    name="floor_number_max"
                    className="common-input"
                    value={formik.values.floor_number_max}
                    onChange={formik.handleChange}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="number"
                    placeholder="Max Age (years)"
                    name="age_max"
                    className="common-input"
                    value={formik.values.age_max}
                    onChange={formik.handleChange}
                    min="0"
                  />
                </div>

                {/* Short Stay Filters */}
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="date"
                    name="check_in"
                    className="common-input"
                    value={formik.values.check_in}
                    onChange={formik.handleChange}
                  />
                  <label className="form-label">Check-in Date</label>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="date"
                    name="check_out"
                    className="common-input"
                    value={formik.values.check_out}
                    onChange={formik.handleChange}
                  />
                  <label className="form-label">Check-out Date</label>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <input
                    type="number"
                    placeholder="Number of Guests"
                    name="guests"
                    className="common-input"
                    value={formik.values.guests}
                    onChange={formik.handleChange}
                    min="1"
                    max="20"
                  />
                </div>

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
                              checked={formik.values.amenities.includes(amenity)}
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
                              checked={formik.values.features.includes(feature)}
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
              <div className="d-flex gap-3 justify-content-center">
                <button type="submit" className="btn btn-main">
                  <i className="fas fa-search me-2"></i>
                  {buttonText}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={resetFilters}>
                  <i className="fas fa-undo me-2"></i>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdvancedPropertyFilter;
