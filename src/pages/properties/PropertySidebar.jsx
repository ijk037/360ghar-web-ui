import Header from '../../common/Header';
import Footer from '../../common/Footer';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import Cta from '../../components/ui/Cta';
import PropertySidebarSection from '../../components/property/PropertySidebarSection';
import SEO from '../../common/SEO';

const Property = () => {
    return (
        <>
            <SEO
                title="Properties with Filter Sidebar | 360Ghar"
                description="Filter and search verified properties in Gurugram on 360Ghar's property portal."
                canonical="/property-sidebar"
            />
            <main className="body-bg">

                {/* Header */}
                <Header
                    headerClass="dark-header has-border"
                    headerMenusClass="mx-auto"
                    btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                    btnLink="/add-new-listing"
                    btnText="Add Listing"
                    spanClass="icon-right text-gradient"
                    showContactNumber={false}
                />


                {/* Property Sidebar Section */}
                <PropertySidebarSection />

                {/* Cta */}
                <Cta ctaClass="" />

                {/* Footer */}
                <Footer />

            </main>

            <MobileMenu />
            <OffCanvas />
        </>
    );
};

export default Property;