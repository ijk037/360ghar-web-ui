import Header from '../../common/Header';
import Footer from '../../common/Footer';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import Cta from '../../components/ui/Cta';
import ProjectDetailsSection from '../../components/project/ProjectDetailsSection';
import { useParams } from 'react-router-dom';

import SEO from '../../common/SEO';
import { siteMetadata } from '../../seo/siteMetadata';

const ProjectDetails = () => {
    const {title} = useParams(); 

    return (
        <>
        <SEO
            title="Project Details | 360Ghar"
            description="View detailed information about this real estate project including amenities, floor plans, and virtual tours."
            keywords="project details, real estate project, floor plans, amenities"
            canonical={`/project/${title}`}
            image={siteMetadata.defaultOgImage}
            type="website"
        />
        <OffCanvas />
        <MobileMenu />

        <main className="body-bg">
            
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

            
            {/* Project Details Section */}
            <ProjectDetailsSection/>

            {/* Cta */}
            <Cta ctaClass=""/>

            {/* Footer */}
            <Footer/>

        </main>   
        </>
    );
};

export default ProjectDetails;