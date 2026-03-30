import './SectionLoader.css';

const SectionLoader = ({ height = '200px', type = 'default' }) => {
  if (type === 'card') {
    return (
      <div className="section-loader" style={{ height }}>
        <div className="section-loader__card">
          <div className="section-loader__card-image"></div>
          <div className="section-loader__card-content">
            <div className="section-loader__line section-loader__line--title"></div>
            <div className="section-loader__line section-loader__line--subtitle"></div>
            <div className="section-loader__line section-loader__line--text"></div>
            <div className="section-loader__line section-loader__line--text section-loader__line--short"></div>
            <div className="section-loader__card-footer">
              <div className="section-loader__line section-loader__line--button"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="section-loader" style={{ height }}>
        <div className="section-loader__list">
          {[1, 2, 3].map((item) => (
            <div key={item} className="section-loader__list-item">
              <div className="section-loader__line section-loader__line--icon"></div>
              <div className="section-loader__line section-loader__line--title"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default shimmer skeleton
  return (
    <div className="section-loader" style={{ height }}>
      <div className="section-loader__shimmer">
        <div className="section-loader__block section-loader__block--large"></div>
        <div className="section-loader__block section-loader__block--medium"></div>
        <div className="section-loader__block section-loader__block--small"></div>
      </div>
    </div>
  );
};

export default SectionLoader;