import Header from '../../common/Header';
import Footer from '../../common/Footer';
import MobileMenu from '../../common/MobileMenu';
import OffCanvas from '../../common/OffCanvas';
import Cta from '../../components/ui/Cta';
import LoginRegister from '../../components/forms/LoginRegister';
import PageTitle from '../../common/PageTitle';
import SEO from '../../common/SEO';

const Register = () => {
    return (
        <>
        <SEO title="Register | 360Ghar" description="Create your 360Ghar account." canonical="/register" noindex />
        <PageTitle title="360Ghar - Registration" />

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

    
            {/* Register Section */}
            <LoginRegister
                titleText="Sign up"
                firstNameCol="col-sm-6 col-xs-6" 
                showFirstName={true}
                lastNameCol="col-sm-6 col-xs-6" 
                showLastName={true}
                passwordCol="col-sm-6 col-xs-6" 
                showConfirm={true}
                btnText="Register"
                showForgotRemember={false}
                showTermCondition={true}
                haveAccountText = "Already Have An Account? "
                haveAccountLinkText = "Login"
                haveAccountLink = "/login"
            />

            {/* Cta */}
            <Cta ctaClass=""/>

            {/* Footer */}
            <Footer/>

        </main>   
        </>
    );
};

export default Register;
