import { useEffect } from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import Cta from '../../components/ui/Cta';
import PropertyDetailsSection from '../../components/property/PropertyDetailsSection';
import { useParams } from 'react-router-dom';
import PageTitle from '../../common/PageTitle';
import SEO from '../../common/SEO';
import { siteMetadata } from '../../seo/siteMetadata';
import { generatePropertyStructuredData, generateBreadcrumbStructuredData } from '../../seo/structuredData';
import usePropertyStore from '../../store/propertyStore';

const PropertyDetails = () => {
    const { id } = useParams();
    const {
        currentProperty: propertyData,
        isLoading,
        error,
        fetchPropertyById
    } = usePropertyStore();

    useEffect(() => {
        if (id) {
            fetchPropertyById(id);
        }
    }, [id, fetchPropertyById]);

    // Generate enhanced structured data for property
    const generatePropertyStructured = () => {
        if (!propertyData) return [];

        const propertyStructuredData = {
            id: propertyData.id,
            title: propertyData.title,
            description: propertyData.description,
            address: propertyData.full_address,
            city: propertyData.city || 'Gurugram',
            propertyType: propertyData.property_type || 'Apartment',
            listingType: propertyData.purpose === 'rent' ? 'Rent' : 'Sale',
            bedrooms: propertyData.bhk || 1,
            bathrooms: propertyData.bathrooms || 1,
            balconies: propertyData.balconies || 0,
            area: propertyData.area_sqft || 1000,
            areaUnit: 'sqft',
            price: propertyData.purpose === 'rent'
                ? (propertyData.monthly_rent || propertyData.daily_rate || propertyData.base_price || 0)
                : propertyData.base_price || 0,
            available: propertyData.is_available !== false,
            images: Array.isArray(propertyData.images)
                ? propertyData.images.map(img => img.image_url).filter(Boolean)
                : [siteMetadata.defaultOgImage],
            url: `/property/${propertyData.id}`
        };

        const breadcrumbData = [
            { name: 'Home', url: 'https://360ghar.com/' },
            { name: 'Properties', url: 'https://360ghar.com/properties' },
            { name: propertyData.title || 'Property Details', url: `https://360ghar.com/property/${propertyData.id}` }
        ];

        return [
            generatePropertyStructuredData(propertyStructuredData),
            generateBreadcrumbStructuredData(breadcrumbData)
        ];
    };

    const mainImage = (Array.isArray(propertyData?.images) && propertyData.images[0]?.image_url) || siteMetadata.defaultOgImage;

    return (
        <>
            <SEO
                title={propertyData?.title ? `${propertyData.title} in ${propertyData.city || 'Gurugram'} | 360Ghar` : 'Property Details | 360Ghar - Best Real Estate Platform'}
                image={mainImage}
                type="product"
                structuredData={generatePropertyStructured()}
            />
            <PageTitle title={propertyData?.title ? `${propertyData.title} | 360Ghar` : "Property Details | 360Ghar - Best Real Estate Platform"} />

            <main className="body-bg">
                <OffCanvas />
                <MobileMenu />

                {/* Header */}
                <Header
                    headerClass="dark-header has-border"
                    headerMenusClass="mx-auto"
                    btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                    btnLink="/post-property"
                    btnText="Post Property"
                    spanClass="icon-right text-gradient"
                    showContactNumber={false}
                />


                {/* Loading, Error, or Property Details Section */}
                {isLoading ? (
                    <section className="property-details compact padding-y-60">
                        <div className="container container-two">
                            <div className="text-center py-5">
                                <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
                                <p className="mt-3">Loading property details...</p>
                            </div>
                        </div>
                    </section>
                ) : error ? (
                    <section className="property-details compact padding-y-60">
                        <div className="container container-two">
                            <div className="text-center py-5">
                                <i className="fas fa-exclamation-triangle fa-2x text-danger"></i>
                                <h4 className="mt-3 text-danger">Error Loading Property</h4>
                                <p>{error}</p>
                            </div>
                        </div>
                    </section>
                ) : !propertyData ? (
                    <section className="property-details compact padding-y-60">
                        <div className="container container-two">
                            <div className="text-center py-5">
                                <i className="fas fa-home fa-2x text-muted"></i>
                                <h4 className="mt-3">Property Not Found</h4>
                                <p>The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                            </div>
                        </div>
                    </section>
                ) : (
                    <PropertyDetailsSection property={propertyData} />
                )}

                {/* Cta */}
                <Cta ctaClass="" />

                {/* Footer */}
                <Footer />

            </main>
        </>
    );
};

export default PropertyDetails;
