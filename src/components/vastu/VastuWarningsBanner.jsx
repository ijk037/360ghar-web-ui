import React, { useState } from 'react';

const WARNING_CONFIG = {
    not_floor_plan: {
        icon: 'fa-image',
        title: 'Image May Not Be a Floor Plan',
    },
    missing_kitchen: {
        icon: 'fa-utensils',
        title: 'Kitchen Not Detected',
    },
    missing_bedroom: {
        icon: 'fa-bed',
        title: 'Bedroom Not Detected',
    },
    missing_bathroom: {
        icon: 'fa-bath',
        title: 'Bathroom Not Detected',
    },
    missing_entrance: {
        icon: 'fa-door-open',
        title: 'Entrance Not Detected',
    },
    few_rooms_detected: {
        icon: 'fa-th-large',
        title: 'Few Rooms Detected',
    },
    unclear_layout: {
        icon: 'fa-question-circle',
        title: 'Layout Unclear',
    },
    low_image_quality: {
        icon: 'fa-camera',
        title: 'Image Quality Issues',
    },
    partial_analysis: {
        icon: 'fa-exclamation-circle',
        title: 'Partial Analysis',
    },
    ambiguous_directions: {
        icon: 'fa-compass',
        title: 'Direction Uncertainty',
    },
};

const SEVERITY_STYLES = {
    critical: {
        bgClass: 'bg-danger-subtle',
        borderClass: 'border-danger',
        iconClass: 'text-danger',
        badgeClass: 'bg-danger',
    },
    warning: {
        bgClass: 'bg-warning-subtle',
        borderClass: 'border-warning',
        iconClass: 'text-warning',
        badgeClass: 'bg-warning text-dark',
    },
    info: {
        bgClass: 'bg-info-subtle',
        borderClass: 'border-info',
        iconClass: 'text-info',
        badgeClass: 'bg-info',
    },
};

const VastuWarningsBanner = ({ warnings, confidence, isValidFloorPlan, onUploadNew }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!warnings || warnings.length === 0) {
        return null;
    }

    const hasCritical = warnings.some(w => w.severity === 'critical');
    const hasWarning = warnings.some(w => w.severity === 'warning');

    const bannerSeverity = hasCritical ? 'critical' : hasWarning ? 'warning' : 'info';
    const styles = SEVERITY_STYLES[bannerSeverity];

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical': return 'fa-times-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    };

    return (
        <div className={`vastu-warnings-banner ${styles.bgClass} border ${styles.borderClass} rounded-3 p-4 mb-4`}>
            {/* Header */}
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center">
                    <i className={`fas ${getSeverityIcon(bannerSeverity)} ${styles.iconClass} fa-lg me-3`}></i>
                    <div>
                        <h5 className="mb-1">
                            {hasCritical
                                ? 'Analysis Completed with Significant Caveats'
                                : 'Analysis Notes'}
                        </h5>
                        <p className="text-muted mb-0 small">
                            {warnings.length} issue{warnings.length !== 1 ? 's' : ''} detected
                            {confidence < 1 && ` | Confidence: ${Math.round(confidence * 100)}%`}
                        </p>
                    </div>
                </div>
                <button
                    className="btn btn-sm btn-link text-decoration-none"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Show Less' : 'Show Details'}
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} ms-1`}></i>
                </button>
            </div>

            {/* Critical Warning for Non-Floor Plan */}
            {!isValidFloorPlan && (
                <div className="alert alert-danger d-flex align-items-center mt-3 mb-0">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div className="flex-grow-1">
                        <strong>This image may not be a floor plan.</strong>
                        {' '}The analysis results should be interpreted with caution.
                    </div>
                    {onUploadNew && (
                        <button
                            className="btn btn-danger btn-sm ms-3"
                            onClick={onUploadNew}
                        >
                            <i className="fas fa-upload me-1"></i>
                            Upload New Image
                        </button>
                    )}
                </div>
            )}

            {/* Expanded Warnings List */}
            {isExpanded && (
                <div className="warnings-list mt-3">
                    {warnings.map((warning, index) => {
                        const config = WARNING_CONFIG[warning.type] || {
                            icon: 'fa-exclamation-circle',
                            title: 'Analysis Note',
                        };
                        const warnStyles = SEVERITY_STYLES[warning.severity] || SEVERITY_STYLES.info;

                        return (
                            <div
                                key={index}
                                className={`warning-item p-3 mb-2 rounded-2 bg-white border ${warnStyles.borderClass}`}
                            >
                                <div className="d-flex align-items-start">
                                    <i className={`fas ${config.icon} ${warnStyles.iconClass} me-3 mt-1`}></i>
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-1">
                                            <strong className="me-2">{config.title}</strong>
                                            <span className={`badge ${warnStyles.badgeClass} small`}>
                                                {warning.severity}
                                            </span>
                                        </div>
                                        <p className="mb-1 small">{warning.message}</p>
                                        <p className="mb-0 text-muted small">
                                            <i className="fas fa-lightbulb me-1"></i>
                                            <em>{warning.suggestion}</em>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Confidence Indicator */}
            {confidence < 0.7 && (
                <div className="confidence-indicator mt-3 pt-3 border-top">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <small className="text-muted">Analysis Confidence</small>
                        <small className={confidence < 0.5 ? 'text-danger' : 'text-warning'}>
                            {Math.round(confidence * 100)}%
                        </small>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                        <div
                            className={`progress-bar ${confidence < 0.5 ? 'bg-danger' : 'bg-warning'}`}
                            style={{ width: `${confidence * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VastuWarningsBanner;
