
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropertyItem from './PropertyItem';
import Pagination from '../../common/Pagination';
import PropertyFilterBottom from '../property-filters/PropertyFilterBottom';
import PropertyFilters from '../property-filters/PropertyFilters';
import usePropertyStore from '../../store/propertyStore';
import { useLocationStore } from '../../store/locationStore';

const PropertyPageSection = () => {
    const { setLocation } = useLocationStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {
        properties,
        pagination,
        isLoading,
        error,
        updateFilter,
        fetchProperties
    } = usePropertyStore();

    // Parse search parameters and apply them to filters on initial load
    useEffect(() => {
        const urlFilters = {};
        let locationUpdate = null;

        // Parse all URL parameters that match our API
        const paramMappings = {
            'q': 'q',
            'purpose': 'purpose',
            'price_min': 'price_min',
            'price_max': 'price_max',
            'bedrooms_min': 'bedrooms_min',
            'bedrooms_max': 'bedrooms_max',
            'bathrooms_min': 'bathrooms_min',
            'bathrooms_max': 'bathrooms_max',
            'area_min': 'area_min',
            'area_max': 'area_max',
            'city': 'city',
            'locality': 'locality',
            'pincode': 'pincode',
            'parking_spaces_min': 'parking_spaces_min',
            'floor_number_min': 'floor_number_min',
            'floor_number_max': 'floor_number_max',
            'age_max': 'age_max',
            'check_in': 'check_in',
            'check_out': 'check_out',
            'guests': 'guests',
            'sort_by': 'sort_by',
            'radius': 'radius'
        };

        // Parse simple parameters
        Object.entries(paramMappings).forEach(([urlParam, filterKey]) => {
            const value = searchParams.get(urlParam);
            if (value) {
                // Convert numeric values
                if (['price_min', 'price_max', 'area_min', 'area_max', 'guests', 'radius',
                     'bedrooms_min', 'bedrooms_max', 'bathrooms_min', 'bathrooms_max',
                     'parking_spaces_min', 'floor_number_min', 'floor_number_max', 'age_max'].includes(filterKey)) {
                    urlFilters[filterKey] = parseFloat(value);
                } else {
                    urlFilters[filterKey] = value;
                }
            }
        });

        // Parse property types (array)
        const propertyTypes = searchParams.getAll('property_type');
        if (propertyTypes.length > 0) {
            urlFilters.property_type = propertyTypes;
        }

        // Parse amenities (array)
        const amenities = searchParams.getAll('amenities');
        if (amenities.length > 0) {
            urlFilters.amenities = amenities;
        }

        // Parse features (array)
        const features = searchParams.getAll('features');
        if (features.length > 0) {
            urlFilters.features = features;
        }

        // Parse location coordinates if provided
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        if (lat && lng) {
            const latNum = parseFloat(lat);
            const lngNum = parseFloat(lng);
            
            locationUpdate = {
                lat: latNum,
                lng: lngNum,
                name: 'Search Location'
            };
            
            urlFilters.lat = latNum;
            urlFilters.lng = lngNum;
        }

        // Apply URL filters to store if any exist
        if (Object.keys(urlFilters).length > 0) {
            Object.entries(urlFilters).forEach(([key, value]) => {
                updateFilter(key, value);
            });
        }

        // Update location if coordinates were provided
        if (locationUpdate) {
            setLocation(locationUpdate);
        }

    }, [searchParams, setLocation, updateFilter]);

    // Initial fetch on component mount
    useEffect(() => {
        // Fetch properties on initial load - location is optional
        fetchProperties();
    }, []); // Only run once on mount

    const handlePageChange = (newPage) => {
        // Update page in filters and fetch
        updateFilter('page', newPage);
        fetchProperties({}, newPage);
        
        // Update URL with current page
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        navigate(`?${params.toString()}`, { replace: true });
    };
    return (
        <>
            <section className="property bg-gray-100 padding-y-120">
                <div className="container container-two">

                   {/* Property Filter */}
                    <div className="property-filter mb-4">
                        <PropertyFilters />
                        <PropertyFilterBottom
                            total={pagination.total}
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                        />
                    </div>  

                    <div className="list-grid-item-wrapper property-item-wrapper show-two-item row gy-4">
                        {isLoading ? (
                            Array.from({ length: 12 }).map((_, index) => (
                                <div className="col-lg-4 col-sm-6" key={index}>
                                    <div className="property-item loading">
                                        <div className="property-item__thumb loading-placeholder"></div>
                                        <div className="property-item__content">
                                            <div className="loading-placeholder-text"></div>
                                            <div className="loading-placeholder-text short"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : error ? (
                            <div className="col-12">
                                <div className="text-center py-4">
                                    <p className="text-danger">Error loading properties: {error}</p>
                                </div>
                            </div>
                        ) : properties.length === 0 ? (
                            <div className="col-12">
                                <div className="text-center py-4">
                                    <p>No properties found. Try adjusting your filters or location.</p>
                                </div>
                            </div>
                        ) : (
                            properties.map((property, index) => (
                                <div className="col-lg-4 col-sm-6" key={property.id || index}>
                                    <PropertyItem 
                                        itemClass="property-item style-two style-shaped"
                                        btnClass="text-gradient fw-semibold"
                                        property={property}
                                        badgeText={property.status || "For Sale"}
                                        badgeClass="property-item__badge"
                                        iconsClass="text-gradient"
                                        btnRenderBottom={true}
                                        btnRenderRight={false}
                                    />
                                </div> 
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {properties.length > 0 && pagination.totalPages > 1 && (
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}

                </div>
            </section>   
        </>
    );
};

export default PropertyPageSection;


