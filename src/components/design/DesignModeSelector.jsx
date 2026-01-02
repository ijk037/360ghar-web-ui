import React from 'react';

/**
 * DesignModeSelector - Toggle between Interior and Exterior design modes
 */
const DesignModeSelector = ({ value, onChange }) => {
  const modes = [
    {
      id: 'interior',
      label: 'Interior',
      description: 'Design room interiors',
      icon: 'fa-couch',
    },
    {
      id: 'exterior',
      label: 'Exterior',
      description: 'Design house exteriors',
      icon: 'fa-home',
    },
  ];

  return (
    <div className="design-mode-selector">
      <label className="form-label mb-3">
        <i className="fas fa-palette me-2"></i>
        Design Type
        <span className="text-danger ms-1">*</span>
      </label>

      <div className="mode-cards">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`mode-card ${value === mode.id ? 'active' : ''}`}
            onClick={() => onChange(mode.id)}
          >
            <div className="mode-icon">
              <i className={`fas ${mode.icon}`}></i>
            </div>
            <div className="mode-info">
              <span className="mode-label">{mode.label}</span>
              <span className="mode-desc">{mode.description}</span>
            </div>
            {value === mode.id && (
              <div className="mode-check">
                <i className="fas fa-check-circle"></i>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignModeSelector;
