
/**
 * DesignPromptInput - Custom prompt textarea with character limit
 */
const DesignPromptInput = ({ value, onChange, maxLength = 500 }) => {
  return (
    <div className="design-prompt-input">
      <label className="form-label mb-2">
        <i className="fas fa-comment-dots me-2"></i>
        Custom Instructions
        <span className="text-muted ms-2">(optional)</span>
      </label>

      <textarea
        className="form-control"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add specific details you want in your design...

Examples:
• 'Include a large window with city view'
• 'Use warm lighting and plants'
• 'Add a reading nook by the window'
• 'Make it spacious and airy'"
        maxLength={maxLength}
      />

      <div className="d-flex justify-content-between align-items-center mt-2">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Your style and room selections will be combined with this prompt
        </small>
        <small className="text-muted">
          {value.length}/{maxLength}
        </small>
      </div>
    </div>
  );
};

export default DesignPromptInput;
