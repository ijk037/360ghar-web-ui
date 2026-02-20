
const LOADING_STEPS = {
    analyzing: {
        title: 'Analyzing Floor Plan',
        description: 'Our AI is examining your floor plan layout, identifying rooms and spaces...',
        icon: 'fa-search',
        progress: 40,
    },
    generating: {
        title: 'Generating Vastu Report',
        description: 'Applying Vastu Shastra principles and preparing your personalized analysis...',
        icon: 'fa-file-alt',
        progress: 80,
    },
};

const VastuLoadingState = ({ step = 'analyzing' }) => {
    const currentStep = LOADING_STEPS[step] || LOADING_STEPS.analyzing;

    return (
        <div className="vastu-loading-state text-center py-5">
            <div className="loading-animation mb-4">
                <div className="compass-spinner">
                    <i className="fas fa-compass fa-4x text-main"></i>
                </div>
            </div>

            <div className="loading-content">
                <h3 className="mb-3">
                    <i className={`fas ${currentStep.icon} me-2`}></i>
                    {currentStep.title}
                </h3>
                <p className="text-muted mb-4">{currentStep.description}</p>

                <div className="progress-wrapper mx-auto" style={{ maxWidth: '400px' }}>
                    <div className="progress" style={{ height: '8px' }}>
                        <div
                            className="progress-bar bg-main progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{ width: `${currentStep.progress}%` }}
                            aria-valuenow={currentStep.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>

                <div className="loading-steps mt-4">
                    <div className="d-flex justify-content-center gap-4">
                        <div className={`step ${step === 'analyzing' || step === 'generating' ? 'active' : ''} ${step === 'generating' ? 'completed' : ''}`}>
                            <i className={`fas ${step === 'generating' ? 'fa-check-circle text-success' : 'fa-search text-main'} me-2`}></i>
                            <span>Analyze Layout</span>
                        </div>
                        <div className={`step ${step === 'generating' ? 'active' : ''}`}>
                            <i className={`fas fa-file-alt ${step === 'generating' ? 'text-main' : 'text-muted'} me-2`}></i>
                            <span>Generate Report</span>
                        </div>
                    </div>
                </div>

                <p className="text-muted small mt-4">
                    <i className="fas fa-clock me-2"></i>
                    This usually takes 30-60 seconds
                </p>
            </div>
        </div>
    );
};

export default VastuLoadingState;
