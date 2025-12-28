import { useState } from 'react';
import Header from '../../common/Header';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import SEO from '../../common/SEO';
import { siteMetadata } from '../../seo/siteMetadata';

import './DesignBlueprint.css';

const DESIGNER_SRC = '/blueprint3d/index.html';

const DesignBlueprint = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <SEO
        title="Design Blueprint - 360Ghar"
        description="Design and visualize floor plans in 2D and 3D."
        keywords="floor plan, blueprint, 3D design, interior design"
        canonical="/design-blueprint"
        image={siteMetadata.defaultOgImage}
        type="website"
        noindex
      />

      <OffCanvas />
      <MobileMenu />

      <main className="body-bg design-blueprint-shell">
        <Header
          headerClass="dark-header has-border"
          logoBlack={false}
          logoWhite
          headerMenusClass="mx-auto"
          btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
          spanClass="icon-right text-gradient"
          showContactNumber={false}
        />

        <section className="design-blueprint-content">
          <div className="design-blueprint-frame">
            {!isLoaded && (
              <div className="design-blueprint-loading" role="status" aria-live="polite">
                Loading blueprint designer…
              </div>
            )}

            <iframe
              className="design-blueprint-iframe"
              src={DESIGNER_SRC}
              title="360Ghar Blueprint Designer"
              onLoad={() => setIsLoaded(true)}
              allow="fullscreen; clipboard-read; clipboard-write"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default DesignBlueprint;
