import { useEffect, useMemo }  from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import PropertyItem from './PropertyItem';
import Pagination from '../../common/Pagination';
import PropertyFilterBottom from '../property-filters/PropertyFilterBottom';
import PropertyFilters from '../property-filters/PropertyFilters';
import PropertyTopBar from '../property-filters/PropertyTopBar';
import usePropertyStore from '../../store/propertyStore';
import { useLocationStore } from '../../store/locationStore';
import { propertyAPIService } from '../../services/propertyAPIService';

const PropertyPageSection = () => {
    const { setLocation } = useLocationStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {
        properties,
        pagination,
        updateFilter,
        filters
    } = usePropertyStore();

    // Parse search parameters and apply them to filters on initial load
    useEffect(() => {
        const urlFilters = {};
        let locationUpdate = null;

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

        Object.entries(paramMappings).forEach(([urlParam, filterKey]) => {
            const value = searchParams.get(urlParam);
            if (value) {
                if (['price_min', 'price_max', 'area_min', 'area_max', 'guests', 'radius',
                     'bedrooms_min', 'bedrooms_max', 'bathrooms_min', 'bathrooms_max',
                     'parking_spaces_min', 'floor_number_min', 'floor_number_max', 'age_max'].includes(filterKey)) {
                    urlFilters[filterKey] = parseFloat(value);
                } else {
                    urlFilters[filterKey] = value;
                }
            }
        });

        const propertyTypes = searchParams.getAll('property_type');
        if (propertyTypes.length > 0) {
            urlFilters.property_type = propertyTypes;
        }

        const amenities = searchParams.getAll('amenities');
        if (amenities.length > 0) {
            urlFilters.amenities = amenities;
        }

        const features = searchParams.getAll('features');
        if (features.length > 0) {
            urlFilters.features = features;
        }

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

        if (Object.keys(urlFilters).length > 0) {
            Object.entries(urlFilters).forEach(([key, value]) => {
                updateFilter(key, value);
            });
        }

        if (locationUpdate) {
            setLocation(locationUpdate);
        }

    }, [searchParams, setLocation, updateFilter]);

    // Construct a safe cache key object containing only active filters
    const activeFiltersParams = useMemo(() => {
        const cleanFilters = {};
        Object.keys(filters).forEach(key => {
            const value = filters[key];
            if (value !== null && value !== undefined && value !== '') {
                if (Array.isArray(value)) {
                    if (value.length > 0) cleanFilters[key] = value;
                } else {
                    cleanFilters[key] = value;
                }
            }
        });
        return cleanFilters;
    }, [filters]);

    // SWR fetcher
    const fetcher = async ([url, params]) => {
        const res = await propertyAPIService.searchProperties(params, params.page || 1, params.limit || 12);
        return res.data || { properties: [], items: [], total: 0, totalPages: 1, limit: 12, page: 1 };
    };

    const { data: fetchPayload, error: fetchError, isLoading: swrLoading } = useSWR(
        ['/properties/search', activeFiltersParams], 
        fetcher, 
        { 
            revalidateOnFocus: false,
            keepPreviousData: true 
        }
    );

    // Determine derived states from SWR payload or Zustand fallback
    const displayProperties = fetchPayload?.properties || fetchPayload?.items || properties || [];
    const displayPagination = fetchPayload ? {
        page: fetchPayload.page || 1,
        totalPages: fetchPayload.total_pages || fetchPayload.totalPages || 1,
        total: fetchPayload.total || 0,
        limit: fetchPayload.limit || 12,
    } : pagination;
    const isFetching = swrLoading;
    const currentError = fetchError ? fetchError.message || 'Error loading properties' : null;

    const handlePageChange = (newPage) => {
        updateFilter('page', newPage);

        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        navigate(`?${params.toString()}`, { replace: true });
    };

    return (
        <>
            <section className="property-page bg-gray-100">
                <div className="container container-two">

                    {/* Top Bar - Search, Location, Sort */}
                    <div className="property-page__top-bar">
                        <PropertyTopBar />
                    </div>

                    {/* Results Count and Quick Sort */}
                    <div className="property-page__results-bar">
                        <PropertyFilterBottom
                            total={displayPagination.total}
                            currentPage={displayPagination.page}
                            totalPages={displayPagination.totalPages}
                        />
                    </div>

                    {/* Main Content - Sidebar + Properties Grid */}
                    <div className="property-page__content">
                        {/* Left Sidebar - Filters */}
                        <aside className="property-page__sidebar">
                            <div className="property-sidebar-wrapper">
                                <PropertyFilters />
                            </div>
                        </aside>

                        {/* Right Content - Property Grid */}
                        <main className="property-page__main">
                            <div className="property-grid">
                                {isFetching ? (
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div className="property-grid__item" key={index}>
                                            <div className="property-item loading">
                                                <div className="property-item__thumb loading-placeholder"></div>
                                                <div className="property-item__content">
                                                    <div className="loading-placeholder-text"></div>
                                                    <div className="loading-placeholder-text short"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : currentError ? (
                                    <div className="property-grid__empty">
                                        <p className="text-danger">Error loading properties: {currentError}</p>
                                    </div>
                                ) : displayProperties.length === 0 ? (
                                    <div className="property-grid__empty">
                                        <i className="fas fa-home"></i>
                                        <p>No properties found. Try adjusting your filters or location.</p>
                                    </div>
                                ) : (
                                    displayProperties.map((property, index) => (
                                        <div className="property-grid__item" key={property.id || index}>
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
                            {displayProperties.length > 0 && displayPagination.totalPages > 1 && (
                                <Pagination
                                    currentPage={displayPagination.page}
                                    totalPages={displayPagination.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </main>
                    </div>

                </div>
            </section>
        </>
    );
};

export default PropertyPageSection;
