import React, { useEffect } from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import Cta from '../../components/ui/Cta';
import PropertyDetailsSection from '../../components/property/PropertyDetailsSection';
import { useParams } from 'react-router-dom';
import PageTitle from '../../common/PageTitle';
import SEO from '../../common/SEO';
import { siteMetadata, absoluteUrl } from '../../seo/siteMetadata';
import { generatePropertyStructuredData, generateBreadcrumbStructuredData } from '../../seo/structuredData';
import usePropertyStore from '../../store/propertyStore';

const PropertyDetails = () => {
    const { id } = useParams();
    const { 
        currentProperty, 
        isLoading, 
        error, 
        fetchPropertyById,
        clearCurrentProperty 
    } = usePropertyStore();

    useEffect(() => {
        if (id) {
            fetchPropertyById(id);
        }
        
        // Cleanup when component unmounts
        return () => {
            clearCurrentProperty();
        };
    }, [id, fetchPropertyById, clearCurrentProperty]); 
    
    // Generate enhanced structured data for property
    const generatePropertyStructured = () => {
        if (!currentProperty) return [];

        const propertyData = {
            id: currentProperty.id,
            title: currentProperty.title,
            description: currentProperty.description,
            address: currentProperty.full_address,
            city: currentProperty.city || 'Gurugram',
            propertyType: currentProperty.property_type || 'Apartment',
            listingType: currentProperty.purpose === 'rent' ? 'Rent' : 'Sale',
            bedrooms: currentProperty.bhk || 1,
            bathrooms: currentProperty.bathrooms || 1,
            balconies: currentProperty.balconies || 0,
            area: currentProperty.area_sqft || 1000,
            areaUnit: 'sqft',
            price: currentProperty.purpose === 'rent'
                ? (currentProperty.monthly_rent || currentProperty.daily_rate || currentProperty.base_price || 0)
                : currentProperty.base_price || 0,
            available: currentProperty.is_available !== false,
            images: Array.isArray(currentProperty.images)
                ? currentProperty.images.map(img => img.image_url).filter(Boolean)
                : [siteMetadata.defaultOgImage],
            url: `/property/${currentProperty.id}`
        };

        const breadcrumbData = [
            { name: 'Home', url: 'https://360ghar.com/' },
            { name: 'Properties', url: 'https://360ghar.com/properties' },
            { name: currentProperty.title || 'Property Details', url: `https://360ghar.com/property/${currentProperty.id}` }
        ];

        return [
            generatePropertyStructuredData(propertyData),
            generateBreadcrumbStructuredData(breadcrumbData)
        ];
    };

    return (
        <>
        <SEO
          title={currentProperty?.title ? `${currentProperty.title} in ${currentProperty.city || 'Gurugram'} | 360Ghar` : 'Property Details | 360Ghar - Best Real Estate Platform'}
          description={
            currentProperty?.description ||
            `View detailed property information, amenities, price, and immersive 360° virtual tours. ${currentProperty?.bhk || '1'} BHK ${currentProperty?.property_type || 'Apartment'} in ${currentProperty?.city || 'Gurugram'} with ${currentProperty?.area_sqft || '1000'} sqft area.`
          }
          keywords={`property details, ${currentProperty?.property_type || 'apartment'}, ${currentProperty?.city || 'Gurugram'}, ${currentProperty?.purpose === 'rent' ? 'rent' : 'buy'}, ${currentProperty?.bhk || '1'} BHK, ${currentProperty?.area_sqft || '1000'} sqft, virtual tour, 360° walkthrough, real estate, no broker, verified listing`}
          canonical={currentProperty?.id ? `/property/${currentProperty.id}` : undefined}
          image={
            (Array.isArray(currentProperty?.images) && currentProperty.images[0]?.image_url) ||
            siteMetadata.defaultOgImage
          }
          type="product"
          structuredData={generatePropertyStructured()}
        />
        <PageTitle title={currentProperty?.title ? `${currentProperty.title} | 360Ghar` : "Property Details | 360Ghar - Best Real Estate Platform"} />

        <main className="body-bg">
            <OffCanvas/>
            <MobileMenu/>

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
            ) : !currentProperty ? (
                <section className="property-details compact padding-y-60">
                    <div className="container container-two">
                        <div className="text-center py-5">
                            <i className="fas fa-home fa-2x text-muted"></i>
                            <h4 className="mt-3">Property Not Found</h4>
                            <p>The property you're looking for doesn't exist or has been removed.</p>
                        </div>
                    </div>
                </section>
            ) : (
                <PropertyDetailsSection property={currentProperty} />
            )}

            {/* Cta */}
            <Cta ctaClass=""/>

            {/* Footer */}
            <Footer/>

        </main>
        </>
    );
};

export default PropertyDetails;
