import React from 'react';
import NewsletterThumb from '/assets/images/thumbs/newsletter-bg.png';
import NewsletterForm from '../../common/NewsletterForm';

const Newsletter = () => {
    return (
        <>
            <section className="newsletter bg-white">
                <div className="container container-two">
                    <div className="newsletter-content text-center background-img" style={{ backgroundImage: `url(${NewsletterThumb})`}}>
                        <h2 className="newsletter-content__title text-white">Subscribe To Our Newsletter</h2>
                        <p className="newsletter-content__desc text-white fw-light font-18">Get the latest updates on property listings, market trends, and exclusive offers in Gurgaon's real estate market.</p>
                        
                        <NewsletterForm formClass="" inputClass="white-bordered-input" iconClass="text-gradient"/>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Newsletter;