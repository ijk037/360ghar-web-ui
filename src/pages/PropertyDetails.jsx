import React, { useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Breadcrumb from '../common/Breadcrumb';
import Cta from '../components/Cta';
import PropertyDetailsSection from '../components/PropertyDetailsSection';
import { useParams } from 'react-router-dom';
import PageTitle from '../common/PageTitle';
import usePropertyStore from '../store/propertyStore';

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
    
    return (
        <>
        <PageTitle title="360Ghar - Property Details" />

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
                pageTitle="Property Details"
                pageName={currentProperty?.title || 'Loading...'}
            />

            {/* Loading, Error, or Property Details Section */}
            {isLoading ? (
                <section className="property-details padding-y-120">
                    <div className="container container-two">
                        <div className="text-center py-5">
                            <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
                            <p className="mt-3">Loading property details...</p>
                        </div>
                    </div>
                </section>
            ) : error ? (
                <section className="property-details padding-y-120">
                    <div className="container container-two">
                        <div className="text-center py-5">
                            <i className="fas fa-exclamation-triangle fa-2x text-danger"></i>
                            <h4 className="mt-3 text-danger">Error Loading Property</h4>
                            <p>{error}</p>
                        </div>
                    </div>
                </section>
            ) : !currentProperty ? (
                <section className="property-details padding-y-120">
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
        </>
    );
};

export default PropertyDetails;
