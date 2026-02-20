import { useEffect, useState }  from 'react';

/**
 * Loading steps configuration
 */
const LOADING_STEPS = [
  {
    id: 'understanding',
    label: 'Understanding your vision',
    icon: 'fa-brain',
    duration: 2000,
  },
  {
    id: 'generating',
    label: 'Generating design',
    icon: 'fa-wand-magic-sparkles',
    duration: 15000,
  },
  {
    id: 'enhancing',
    label: 'Applying finishing touches',
    icon: 'fa-sparkles',
    duration: 5000,
  },
];

/**
 * DesignLoadingState - Multi-step loading animation
 */
const DesignLoadingState = ({ currentStep = 'understanding' }) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    'AI is analyzing your preferences...',
    'Creating the perfect composition...',
    'Adding realistic textures and lighting...',
    'Fine-tuning details for photorealism...',
    'Almost there! Polishing the final result...',
  ];

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 3;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [tips.length]);

  const currentStepIndex = LOADING_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="design-loading-state">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="loading-spinner">
            <i className="fas fa-wand-magic-sparkles fa-3x text-main"></i>
          </div>
          <div className="loading-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>

        <h3 className="loading-title mt-4">Creating Your Design</h3>
        <p className="loading-subtitle text-muted">{tips[tipIndex]}</p>

        {/* Progress bar */}
        <div className="loading-progress mt-4">
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-main"
              role="progressbar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="loading-steps mt-4">
          {LOADING_STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`loading-step ${
                index < currentStepIndex
                  ? 'completed'
                  : index === currentStepIndex
                  ? 'active'
                  : ''
              }`}
            >
              <div className="step-icon">
                {index < currentStepIndex ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className={`fas ${step.icon}`}></i>
                )}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        <p className="loading-note mt-4 text-muted small">
          <i className="fas fa-clock me-1"></i>
          This may take 15-30 seconds depending on complexity
        </p>
      </div>
    </div>
  );
};

export { LOADING_STEPS };
export default DesignLoadingState;
