import React from 'react';
import { Link } from 'react-router-dom';

const PropertyInfoWindow = ({ property, onClose }) => {
  if (!property) return null;

  const formatPrice = (value) => {
    if (!value) return 'Price on request';
    return `₹${Number(value).toLocaleString('en-IN')}`;
  };

  const price = property.purpose === 'rent' 
    ? formatPrice(property.monthly_rent || property.daily_rate)
    : formatPrice(property.base_price);
  
  const priceLabel = property.purpose === 'rent'
    ? property.daily_rate ? '/day' : '/month'
    : '';

  const mainImage = property.main_image_url || property.image_url || '/assets/images/thumbs/property-1.png';

  return (
    <div className="property-info-window">
      <button className="info-window-close" onClick={onClose} aria-label="Close">
        <i className="fas fa-times"></i>
      </button>
      
      <div className="info-window-image">
        <img src={mainImage} alt={property.title} />
        {property.purpose && (
          <span className="info-window-badge">
            {property.purpose === 'buy' ? 'For Sale' : property.purpose === 'rent' ? 'For Rent' : 'Short Stay'}
          </span>
        )}
      </div>
      
      <div className="info-window-content">
        <h6 className="info-window-title">{property.title}</h6>
        
        <p className="info-window-price">
          {price}
          <span className="price-label">{priceLabel}</span>
        </p>
        
        <p className="info-window-location">
          <i className="fas fa-map-marker-alt me-1"></i>
          {property.locality || property.city}
        </p>
        
        <div className="info-window-amenities">
          {property.bedrooms && (
            <span className="amenity-item">
              <i className="fas fa-bed"></i> {property.bedrooms} Bed
            </span>
          )}
          {property.bathrooms && (
            <span className="amenity-item">
              <i className="fas fa-bath"></i> {property.bathrooms} Bath
            </span>
          )}
          {property.area_sqft && (
            <span className="amenity-item">
              <i className="fas fa-ruler-combined"></i> {property.area_sqft.toLocaleString()} sqft
            </span>
          )}
        </div>
        
        <Link to={`/property/${property.id}`} className="info-window-link">
          View Details
          <i className="fas fa-arrow-right ms-2"></i>
        </Link>
      </div>
    </div>
  );
};

export default PropertyInfoWindow;
