import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Breadcrumb from '../../common/Breadcrumb';
import Cta from '../../components/Cta';
import AboutThree from '../../components/AboutThree';
import PropertyTypeThree from '../../components/PropertyTypeThree';
import Team from '../../components/Team';
import PageTitle from '../../common/PageTitle';
import SEO from '../../common/SEO';
import { siteMetadata } from '../../seo/siteMetadata';

const AboutUs = () => {
    return (
        <>
            <SEO 
                title="About 360Ghar | Virtual Real Estate Tours Across India"
                description="Learn about 360Ghar, India's immersive real estate platform offering 360° virtual property tours, expert guidance, and seamless transactions. Based in Gurugram, Haryana."
                keywords="about 360Ghar, real estate platform, virtual tours, Gurgaon, Gurugram"
                canonical="/about-us"
                image={siteMetadata.defaultOgImage}
                type="website"
                structuredData={{
                    '@type': 'AboutPage',
                    name: 'About 360Ghar',
                    url: `${siteMetadata.siteUrl}/about-us`,
                    description: 'About 360Ghar virtual real estate tours and services',
                    isPartOf: { '@type': 'WebSite', name: siteMetadata.siteName, url: siteMetadata.siteUrl },
                }}
            />
            <PageTitle title="360Ghar - About Us" />
            {/* Header */}
            <Header 
                headerClass="dark-header has-border" 
                logoBlack={false}
                logoWhite={true}
                headerMenusClass="mx-auto"
                btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                btnLink="/add-new-listing"
                btnText="Add Listing"
                spanClass="icon-right text-gradient" 
                showHeaderBtn={true}
                showOffCanvasBtn={false}
                offCanvasBtnClass=""
                showContactNumber={false}
            />

            {/* BreadCrumb */}
            <Breadcrumb 
                pageTitle="About Us"
                pageName="About Us"
            />

            <AboutThree/>    

            <Team/>

            <PropertyTypeThree/> 

            {/* Cta */}
            <Cta ctaClass=""/>

            {/* Footer */}
            <Footer/>
        </>
    );
};

export default AboutUs;
