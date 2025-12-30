import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListGridButtons from '../../common/ListGridButtons';
import usePropertyStore from '../../store/propertyStore';

const PropertyFilterBottom = ({ total = 0, currentPage = 1 }) => {
    const { filters, updateFilter, applyFilters } = usePropertyStore();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const selectedSort = filters.sort_by || 'newest';

    const handleSortChangeEnhanced = async (newSortValue) => {
        updateFilter('sort_by', newSortValue);
        updateFilter('page', 1);
        await applyFilters();

        const params = new URLSearchParams(searchParams);
        params.set('sort_by', newSortValue);
        params.set('page', '1');
        navigate(`?${params.toString()}`, { replace: true });
    };

    const showingStart = total > 0 ? ((currentPage - 1) * 12) + 1 : 0;
    const showingEnd = Math.min(currentPage * 12, total);

    return (
        <div className="property-filter__bottom flx-between gap-2">
            <div className="property-results-info d-flex align-items-center gap-3 flex-wrap">
                <span className="property-filter__text font-16 text-gray-800">
                    {total > 0 ?
                        `Showing ${showingStart}-${showingEnd} of ${total.toLocaleString()} properties` :
                        'No properties found'
                    }
                </span>
                {total > 0 && (
                    <div className="sort-options">
                        <div className="btn-group btn-group-sm" role="group">
                            <button
                                type="button"
                                className={`btn btn-outline-secondary ${selectedSort === 'newest' ? 'active' : ''}`}
                                onClick={() => handleSortChangeEnhanced('newest')}
                            >
                                Newest
                            </button>
                            <button
                                type="button"
                                className={`btn btn-outline-secondary ${selectedSort === 'distance' ? 'active' : ''}`}
                                onClick={() => handleSortChangeEnhanced('distance')}
                            >
                                Distance
                            </button>
                            <button
                                type="button"
                                className={`btn btn-outline-secondary ${selectedSort === 'price_low' ? 'active' : ''}`}
                                onClick={() => handleSortChangeEnhanced('price_low')}
                            >
                                Price: Low
                            </button>
                            <button
                                type="button"
                                className={`btn btn-outline-secondary ${selectedSort === 'price_high' ? 'active' : ''}`}
                                onClick={() => handleSortChangeEnhanced('price_high')}
                            >
                                Price: High
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="d-flex align-items-center gap-3">
                <ListGridButtons/>
            </div>
        </div>
    );
};

export default PropertyFilterBottom;
