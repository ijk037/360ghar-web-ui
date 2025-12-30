import React from 'react';

const FloorPlanSummary = ({ floorPlanAnalysis }) => {
    if (!floorPlanAnalysis) return null;

    const {
        plot_shape,
        rooms,
        entrance,
        kitchen,
        toilets,
        staircase,
        balconies,
        center_area,
        compass_visible
    } = floorPlanAnalysis;

    return (
        <div className="floor-plan-summary bg-white p-4 rounded-3 shadow-sm mb-4">
            <h4 className="mb-3">
                <i className="fas fa-drafting-compass me-2 text-main"></i>
                Floor Plan Analysis
            </h4>

            <div className="row g-3">
                {/* Plot Shape */}
                {plot_shape && (
                    <div className="col-md-6 col-lg-4">
                        <div className="summary-item p-3 bg-light rounded-2">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-vector-square text-main me-2"></i>
                                <strong>Plot Shape</strong>
                            </div>
                            <span className="text-capitalize">{plot_shape}</span>
                        </div>
                    </div>
                )}

                {/* Entrance */}
                {entrance && (
                    <div className="col-md-6 col-lg-4">
                        <div className="summary-item p-3 bg-light rounded-2">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-door-open text-main me-2"></i>
                                <strong>Main Entrance</strong>
                            </div>
                            <span>{entrance.direction}</span>
                            {entrance.type && (
                                <small className="text-muted ms-2">({entrance.type})</small>
                            )}
                        </div>
                    </div>
                )}

                {/* Kitchen */}
                {kitchen && (
                    <div className="col-md-6 col-lg-4">
                        <div className="summary-item p-3 bg-light rounded-2">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-utensils text-main me-2"></i>
                                <strong>Kitchen</strong>
                            </div>
                            <span>{kitchen.direction}</span>
                        </div>
                    </div>
                )}

                {/* Toilets */}
                {toilets && toilets.count > 0 && (
                    <div className="col-md-6 col-lg-4">
                        <div className="summary-item p-3 bg-light rounded-2">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-bath text-main me-2"></i>
                                <strong>Toilets ({toilets.count})</strong>
                            </div>
                            <span>{toilets.directions?.join(', ') || 'N/A'}</span>
                        </div>
                    </div>
                )}

                {/* Staircase */}
                {staircase && staircase.direction && (
                    <div className="col-md-6 col-lg-4">
                        <div className="summary-item p-3 bg-light rounded-2">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-stairs text-main me-2"></i>
                                <strong>Staircase</strong>
                            </div>
                            <span>{staircase.direction}</span>
                            {staircase.type && (
                                <small className="text-muted ms-2">({staircase.type})</small>
                            )}
                        </div>
                    </div>
                )}

                {/* Center Area */}
                {center_area && (
                    <div className="col-md-6 col-lg-4">
                        <div className="summary-item p-3 bg-light rounded-2">
                            <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-crosshairs text-main me-2"></i>
                                <strong>Center (Brahmasthan)</strong>
                            </div>
                            <span className="small">{center_area}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Detected Rooms */}
            {rooms && rooms.length > 0 && (
                <div className="mt-4">
                    <h6 className="mb-3">
                        <i className="fas fa-th-large me-2 text-muted"></i>
                        Detected Rooms ({rooms.length})
                    </h6>
                    <div className="rooms-grid">
                        {rooms.map((room, index) => (
                            <span key={index} className="badge bg-light text-dark me-2 mb-2 p-2">
                                <i className="fas fa-square me-1 text-main" style={{ fontSize: '8px' }}></i>
                                {room.name}
                                <small className="text-muted ms-1">({room.direction})</small>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Compass Detection */}
            {compass_visible && (
                <div className="mt-3">
                    <small className="text-success">
                        <i className="fas fa-check-circle me-1"></i>
                        Compass/North indicator detected in floor plan
                    </small>
                </div>
            )}
        </div>
    );
};

export default FloorPlanSummary;
