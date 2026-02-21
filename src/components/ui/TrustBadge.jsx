import { useState } from 'react';

/**
 * TrustBadge Component
 * Displays trust indicators with animated effects
 * @param {string} type - 'verified' | 'premium' | 'new'
 * @param {string} position - 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 * @param {boolean} animated - Whether to show pulse animation
 * @param {string} tooltip - Tooltip text on hover
 * @param {string} className - Additional CSS classes
 */
const TrustBadge = ({
  type = 'verified',
  position = 'top-left',
  animated = true,
  tooltip,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getBadgeConfig = () => {
    switch (type) {
      case 'verified':
        return {
          icon: 'fas fa-check',
          text: 'Verified',
          defaultTooltip: 'Verified Property'
        };
      case 'premium':
        return {
          icon: 'fas fa-crown',
          text: 'Premium',
          defaultTooltip: 'Premium Property'
        };
      case 'new':
        return {
          icon: 'fas fa-sparkles',
          text: 'New',
          defaultTooltip: 'New Listing'
        };
      default:
        return {
          icon: 'fas fa-check',
          text: 'Verified',
          defaultTooltip: 'Verified'
        };
    }
  };

  const config = getBadgeConfig();
  const displayTooltip = tooltip || config.defaultTooltip;

  const getPositionClass = () => {
    const positions = {
      'top-left': 'trust-badge--position-tl',
      'top-right': 'trust-badge--position-tr',
      'bottom-left': 'trust-badge--position-bl',
      'bottom-right': 'trust-badge--position-br'
    };
    return positions[position] || positions['top-left'];
  };

  return (
    <div
      className={`trust-badge trust-badge--${type} ${getPositionClass()} ${animated ? 'trust-badge--animated' : ''} ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="trust-badge__icon">
        <i className={config.icon}></i>
      </div>
      <span className="trust-badge__text">
        {config.text}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div className="trust-badge__tooltip">
          {displayTooltip}
        </div>
      )}
    </div>
  );
};

export default TrustBadge;
