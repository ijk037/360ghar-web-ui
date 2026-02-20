import TopHeader from '../../common/TopHeader';
import Header from '../../common/Header';
import Banner from '../../components/ui/Banner';
import About from '../../components/layout/About';
import Property from '../../components/property/Property';
import PropertyType from '../../components/ui/PropertyType';
import VideoPopup from '../../components/ui/VideoPopup';
import Counter from '../../components/ui/Counter';
import Portfolio from '../../components/project/Portfolio';
import Testimonial from '../../components/ui/Testimonial';
import Blog from '../../components/blog/Blog';
import FooterTwo from '../../common/FooterTwo';
import Message from '../../components/layout/Message';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import SEO from '../../common/SEO';
import { siteMetadata, absoluteUrl } from '../../seo/siteMetadata';
import { topHeaderInfos } from '../../data/CommonData/CommonData';

const HomeOne = () => {
    return (
        <>
            <OffCanvas/>
            <SEO
                title={siteMetadata.defaultTitle}
                description={siteMetadata.defaultDescription}
                keywords={siteMetadata.defaultKeywords}
                canonical={"/"}
                image={siteMetadata.defaultOgImage}
                type="website"
                structuredData={{
                    '@type': 'RealEstateAgent',
                    name: siteMetadata.organization.name,
                    url: siteMetadata.siteUrl,
                    logo: absoluteUrl(siteMetadata.defaultOgImage),
                    description: siteMetadata.defaultDescription,
                    email: siteMetadata.organization.email,
                    telephone: siteMetadata.organization.telephone,
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: siteMetadata.organization.address.streetAddress,
                        addressLocality: siteMetadata.organization.address.addressLocality,
                        addressRegion: siteMetadata.organization.address.addressRegion,
                        postalCode: siteMetadata.organization.address.postalCode,
                        addressCountry: siteMetadata.organization.address.addressCountry,
                    },
                    sameAs: [
                        'https://www.facebook.com/people/360Ghar',
                        'https://x.com/360Ghar',
                        'https://in.linkedin.com/company/360ghar',
                        'https://www.instagram.com/360ghar/',
                    ],
                    contactPoint: {
                        '@type': 'ContactPoint',
                        telephone: `+91-${topHeaderInfos[0]?.text || '8178340031'}`,
                        contactType: 'customer service',
                        areaServed: 'IN',
                        availableLanguage: ['en', 'hi'],
                    },
                }}
            />
            <MobileMenu/>
            
            <main className="body-bg">

                {/* Top header */}
                <TopHeader/>

                {/* Header */}
                <Header 
                    headerClass="" 
                    logoBlack={true}
                    logoWhite={false}
                    headerMenusClass=""
                    btnClass="btn btn-outline-light d-lg-block d-none"
                    btnLink="/property-details"
                    btnText="List Property"
                    spanClass="icon-right text-gradient" 
                    showHeaderBtn={true}
                    showOffCanvasBtn={true}
                    offCanvasBtnClass=""
                    showContactNumber={true}
                />

                {/* Banner */}
                <Banner/>
                
                {/* About */}
                <About/>

                {/* Property */}
                <Property/>

                {/* Property Type */}
                <PropertyType/>

                {/* Video Popup */}
                <VideoPopup/>

                {/* Counter */}
                <Counter/>

                {/* Message */}
                <Message/>

                {/* Portfolio */}
                <Portfolio/>

                {/* Testimonial */}
                <Testimonial/>

                {/* Blog */}
                <Blog/>

                {/* FooterTwo */}
                <FooterTwo/>
                
            </main>
        </>
    );
};

export default HomeOne;
