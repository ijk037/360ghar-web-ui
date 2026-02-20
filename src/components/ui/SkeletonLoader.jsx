
const SkeletonLoader = ({ type = 'property-card', count = 1 }) => {
  const renderPropertyCardSkeleton = () => (
    <div className="skeleton-loader property-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-price"></div>
        <div className="skeleton-line skeleton-location"></div>
        <div className="skeleton-amenities">
          <div className="skeleton-amenity"></div>
          <div className="skeleton-amenity"></div>
          <div className="skeleton-amenity"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="skeleton-loader list-skeleton">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-line skeleton-list-item"></div>
      ))}
    </div>
  );

  const renderMapSkeleton = () => (
    <div className="skeleton-loader map-skeleton">
      <div className="skeleton-map-placeholder"></div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'property-card':
        return renderPropertyCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'map':
        return renderMapSkeleton();
      default:
        return renderPropertyCardSkeleton();
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
