import React from 'react';

import Header from '../../common/Header';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import BannerTwo from '../../components/ui/BannerTwo';
import Service from '../../components/ui/Service';
import AboutTwo from '../../components/layout/AboutTwo';
import FloorPlan from '../../components/property/FloorPlan';
import CounterTwo from '../../components/ui/CounterTwo';
import Gallery from '../../components/layout/Gallery';
import Apartment from '../../components/layout/Apartment';
import MessageTwo from '../../components/layout/MessageTwo';
import BlogTwo from '../../components/blog/BlogTwo';
import Footer from '../../common/Footer';
import PageTitle from '../../common/PageTitle';

const HomeTwo = () => {
    return (
        <>
            <PageTitle title="360Ghar - Home Two" />
            
            <OffCanvas/>
            <MobileMenu/>
            
            <main className="dark-background">

                {/* Header */}
                <Header 
                    headerClass="dark-header" 
                    logoBlack={false}
                    logoWhite={true}
                    headerMenusClass="ms-auto me-4"
                    btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                    btnLink="/add-new-listing"
                    btnText="Add Listing"
                    spanClass="icon-right text-gradient" 
                    showHeaderBtn={true}
                    showOffCanvasBtn={false}
                    offCanvasBtnClass=""
                    showContactNumber={true}
                />

                {/* Banner Two */}
                <BannerTwo/>

                {/* Service */}
                <Service/>

                {/* About Two */}
                <AboutTwo/>

                {/* Floor Plan */}
                <FloorPlan/>

                {/* Gallery */}
                <Gallery/>

                {/* Counter Two */}
                <CounterTwo/>

                {/* Apartment */}
                <Apartment/>

                {/* Message Two */}
                <MessageTwo/>

                {/* Blog Two */}
                <BlogTwo/>

                {/* Footer */}
                <Footer/>
                
            </main>   
        </>
    );
};

export default HomeTwo;