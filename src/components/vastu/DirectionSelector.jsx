import React from 'react';

const DIRECTIONS = [
    { value: 'up', label: 'Top', icon: 'fa-arrow-up', description: 'North is at the top of the image' },
    { value: 'right', label: 'Right', icon: 'fa-arrow-right', description: 'North is to the right of the image' },
    { value: 'down', label: 'Bottom', icon: 'fa-arrow-down', description: 'North is at the bottom of the image' },
    { value: 'left', label: 'Left', icon: 'fa-arrow-left', description: 'North is to the left of the image' },
    { value: 'unknown', label: 'Unknown', icon: 'fa-question', description: 'Let AI detect the orientation' },
];

const DirectionSelector = ({ value, onChange }) => {
    return (
        <div className="direction-selector">
            <label className="form-label">
                <i className="fas fa-compass me-2"></i>
                North Direction in Image
                <span className="text-danger ms-1">*</span>
            </label>
            <p className="text-muted small mb-3">
                Indicate which side of your floor plan image points North
            </p>

            <div className="direction-compass">
                <div className="compass-center">
                    <i className="fas fa-home"></i>
                </div>

                {DIRECTIONS.filter(d => d.value !== 'unknown').map((dir) => (
                    <button
                        key={dir.value}
                        type="button"
                        className={`compass-direction compass-${dir.value} ${value === dir.value ? 'active' : ''}`}
                        onClick={() => onChange(dir.value)}
                        title={dir.description}
                    >
                        <i className={`fas ${dir.icon}`}></i>
                        <span className="direction-label">{dir.label}</span>
                    </button>
                ))}
            </div>

            <div className="direction-unknown mt-3">
                <button
                    type="button"
                    className={`btn btn-outline-secondary w-100 ${value === 'unknown' ? 'active' : ''}`}
                    onClick={() => onChange('unknown')}
                >
                    <i className="fas fa-question-circle me-2"></i>
                    I'm not sure - Let AI detect
                </button>
            </div>

            <div className="selected-direction mt-3">
                <small className="text-muted">
                    <i className="fas fa-info-circle me-2"></i>
                    Selected: <strong>{DIRECTIONS.find(d => d.value === value)?.description}</strong>
                </small>
            </div>
        </div>
    );
};

export default DirectionSelector;
