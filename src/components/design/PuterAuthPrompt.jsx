import React from 'react';

/**
 * PuterAuthPrompt - Explains Puter's user-pays model and provides sign-in
 *
 * This component is shown when the user is not authenticated with Puter.
 * It explains the cost model (users pay their own AI costs) and provides
 * a clear sign-in button.
 */
const PuterAuthPrompt = ({ onSignIn, isLoading = false }) => {
  return (
    <div className="puter-auth-prompt">
      <div className="auth-card">
        <div className="auth-icon mb-4">
          <i className="fas fa-wand-magic-sparkles fa-4x text-main"></i>
        </div>

        <h2 className="mb-3">Sign in to Generate AI Designs</h2>

        <p className="auth-description mb-4">
          Our AI Design Studio uses <strong>Puter</strong> to power image generation.
          Sign in with your free Puter account to start creating stunning interior
          and exterior designs.
        </p>

        <div className="cost-info bg-light p-4 rounded-3 mb-4">
          <h5 className="mb-3">
            <i className="fas fa-info-circle text-main me-2"></i>
            How it works
          </h5>
          <ul className="mb-0">
            <li className="mb-2">
              <i className="fas fa-check text-success me-2"></i>
              <strong>Free to sign up</strong> - Create a Puter account at no cost
            </li>
            <li>
              <i className="fas fa-shield-alt text-success me-2"></i>
              <strong>Privacy-focused</strong> - No tracking or data collection
            </li>
          </ul>
        </div>

        <button
          onClick={onSignIn}
          disabled={isLoading}
          className="btn btn-main btn-lg px-5"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin me-2"></i>
              Connecting...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt me-2"></i>
              Sign in with Puter
            </>
          )}
        </button>

        <p className="auth-note mt-4 text-muted small">
          <i className="fas fa-lock me-1"></i>
          By signing in, you agree to Puter&apos;s{' '}
          <a
            href="https://puter.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-main"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="https://puter.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-main"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default PuterAuthPrompt;
