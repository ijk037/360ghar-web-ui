import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Cta from '../../components/ui/Cta';
import AboutThree from '../../components/layout/AboutThree';
import PropertyTypeThree from '../../components/ui/PropertyTypeThree';
import AreasWeCover from '../../components/layout/AreasWeCover';
import OwnerCta from '../../components/ui/OwnerCta';
import Team from '../../components/ui/Team';
import PageTitle from '../../common/PageTitle';
import SEO from '../../common/SEO';
import { siteMetadata } from '../../seo/siteMetadata';
import { realEstateStructuredData, generateBreadcrumbStructuredData } from '../../seo/structuredData';

const AboutUs = () => {
    // Enhanced structured data for About page
    const aboutStructuredData = [
        realEstateStructuredData.organization,
        realEstateStructuredData.localBusiness,
        {
            '@type': 'AboutPage',
            name: 'About 360Ghar - Gurugram Real Estate Platform',
            url: `${siteMetadata.siteUrl}/about-us`,
            description: 'Learn about 360Ghar, Gurugram premier real estate platform offering verified properties with 360° virtual tours',
            isPartOf: { '@type': 'WebSite', name: siteMetadata.siteName, url: siteMetadata.siteUrl },
        },
        generateBreadcrumbStructuredData([
            { name: 'Home', url: 'https://360ghar.com/' },
            { name: 'About Us', url: 'https://360ghar.com/about-us' }
        ])
    ];

    return (
        <>
            <SEO
                title="About 360Ghar - Best Real Estate Platform in Gurugram | Verified 360° Tours"
                description="Discover 360Ghar, Gurugram premier real estate platform offering verified properties with 360° virtual tours, expert guidance, and no upfront listing fees. Serving DLF Phase, Golf Course Road, Sohna Road, Cyber City and all Gurugram areas."
                keywords="about 360Ghar, Gurugram real estate platform, property portal Gurgaon, virtual tours, real estate services, DLF Phase properties, Golf Course Road real estate, verified property listings, no broker fees, property management"
                canonical="/about-us"
                image={siteMetadata.defaultOgImage}
                type="website"
                structuredData={aboutStructuredData}
            />
            <PageTitle title="360Ghar - About Us" />
            {/* Header */}
            <Header
                headerClass="dark-header has-border"
                logoBlack={false}
                logoWhite={true}
                headerMenusClass="mx-auto"
                btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                spanClass="icon-right text-gradient"
                showContactNumber={false}
            />

      
            <AboutThree/>    

            <Team/>

            <PropertyTypeThree/> 

            <AreasWeCover/>

            <OwnerCta className="padding-y-60"/>

            {/* Cta */}
            <Cta ctaClass=""/>

            {/* Footer */}
            <Footer/>
        </>
    );
};

export default AboutUs;
