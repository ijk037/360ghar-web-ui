/**
 * LoadingSkeleton Component
 * Displays animated skeleton placeholders while content loads
 * Supports multiple variants: card, list-item, detail-page
 */

const CardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-line" style={{ width: '40%', height: '16px' }}></div>
      <div className="skeleton-line skeleton-line--medium"></div>
      <div className="skeleton-line skeleton-line--short"></div>
      <div className="skeleton-amenities">
        <div className="skeleton-amenity"></div>
        <div className="skeleton-amenity"></div>
        <div className="skeleton-amenity"></div>
      </div>
    </div>
  </div>
);

const ListItemSkeleton = () => (
  <div className="skeleton-list-item">
    <div className="skeleton-list-item__image"></div>
    <div className="skeleton-list-item__content">
      <div className="skeleton-line" style={{ width: '50%', marginBottom: '12px' }}></div>
      <div className="skeleton-line skeleton-line--medium" style={{ marginBottom: '8px' }}></div>
      <div className="skeleton-line skeleton-line--short"></div>
    </div>
  </div>
);

const DetailPageSkeleton = () => (
  <>
    <div className="skeleton-detail">
      <div className="skeleton-detail__hero"></div>
      <div className="skeleton-detail__thumbs">
        <div className="skeleton-detail__thumb"></div>
        <div className="skeleton-detail__thumb"></div>
        <div className="skeleton-detail__thumb"></div>
        <div className="skeleton-detail__thumb"></div>
      </div>
      <div className="skeleton-detail__title"></div>
      <div className="skeleton-detail__section">
        <div className="skeleton-detail__section-title"></div>
        <div className="skeleton-detail__grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-detail__grid-item"></div>
          ))}
        </div>
      </div>
      <div className="skeleton-detail__section">
        <div className="skeleton-detail__section-title"></div>
        <div className="skeleton-detail__grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-detail__grid-item"></div>
          ))}
        </div>
      </div>
    </div>
    <div className="skeleton-sidebar">
      <div className="skeleton-sidebar__price"></div>
      <div className="skeleton-line skeleton-line--short"></div>
      <div className="skeleton-sidebar__button"></div>
    </div>
  </>
);

const LoadingSkeleton = ({
  variant = 'card',
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'list-item':
        return <ListItemSkeleton />;
      case 'detail-page':
        return <DetailPageSkeleton />;
      case 'card':
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className={`loading-skeleton ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
