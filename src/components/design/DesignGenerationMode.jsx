import React from 'react';

/**
 * DesignGenerationMode - Toggle between Text-to-Image and Image-to-Image modes
 */
const DesignGenerationMode = ({ value, onChange }) => {
  const modes = [
    {
      id: 'text-to-image',
      label: 'Create from Scratch',
      description: 'Generate a new design from your description',
      icon: 'fa-magic',
    },
    {
      id: 'image-to-image',
      label: 'Reimagine Photo',
      description: 'Upload a photo and transform it with AI',
      icon: 'fa-images',
    },
  ];

  return (
    <div className="generation-mode-selector">
      <label className="form-label mb-3">
        <i className="fas fa-wand-magic-sparkles me-2"></i>
        Generation Mode
      </label>

      <div className="generation-mode-tabs">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={`generation-mode-tab ${value === mode.id ? 'active' : ''}`}
            onClick={() => onChange(mode.id)}
          >
            <i className={`fas ${mode.icon} me-2`}></i>
            <div className="tab-content">
              <span className="tab-label">{mode.label}</span>
              <span className="tab-desc">{mode.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignGenerationMode;
