import React, { useEffect } from 'react';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../common/PageTitle';
import SEO from '../../common/SEO';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';

const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(-1)
        }, 2500);
    }, [navigate]);
    
    return (
        <>
            <SEO
                title="404 Not Found | 360Ghar"
                description="The page you are looking for does not exist."
                canonical={undefined}
                noindex={true}
                type="website"
            />
            <PageTitle title="360Ghar - 404 Page Not Found" />

            <OffCanvas />
            <MobileMenu />

            <main className="body-bg">
                <Header
                    headerClass="dark-header has-border"
                    headerMenusClass="mx-auto"
                    btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
                    btnLink="/post-property"
                    btnText="Post Property"
                    spanClass="icon-right text-gradient"
                    showContactNumber={false}
                />

                <section className="padding-y-120">
                    <div className="not-found text-center">
                        <div className="not-found__inner">
                            <span className="not-found__icon">
                                <i className="far fa-frown text-body"></i>
                            </span>
                            <h1 className="mt-4 mb-5">404 Page Not Found</h1>   
                            <Button 
                                btnLink="/" 
                                btnClass="btn-main" 
                                btnText="Back To Home" 
                                spanClass="icon-right" 
                                iconClass="" 
                            />
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default NotFound;
