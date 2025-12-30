 import React from 'react';
 
 const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.the360ghar.ghar360';
 
 const AppDownload = () => {
     return (
         <section className="app-download padding-y-120 bg-white">
             <div className="container container-two">
                 <div className="row align-items-center gy-4">
                     <div className="col-lg-6">
                         <div className="app-download__content">
                             <span className="section-heading__subtitle bg-gray-100">
                                 Mobile App
                             </span>
                             <h2 className="app-download__title mt-3">
                                 Get the <span className="text-gradient">360Ghar App</span>
                             </h2>
                             <p className="app-download__desc mt-3">
                                 Search verified properties, take virtual tours, and connect with your dedicated Relationship Manager - all from your phone. Download now for a seamless property search experience.
                             </p>
                             <ul className="app-download__features mt-4">
                                 <li><i className="fas fa-check-circle text-gradient"></i> AI-powered property recommendations</li>
                                 <li><i className="fas fa-check-circle text-gradient"></i> 360° virtual property tours</li>
                                 <li><i className="fas fa-check-circle text-gradient"></i> Instant notifications for new listings</li>
                                 <li><i className="fas fa-check-circle text-gradient"></i> Direct chat with your RM</li>
                             </ul>
                             <a 
                                 href={PLAY_STORE_URL} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="app-download__badge mt-4"
                             >
                                 <img 
                                     src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                     alt="Get it on Google Play"
                                     height="60"
                                 />
                             </a>
                         </div>
                     </div>
                     <div className="col-lg-6">
                         <div className="app-download__image text-center">
                             <div className="app-download__phone-mockup">
                                 <i className="fas fa-mobile-alt"></i>
                                 <span>360Ghar</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </section>
     );
 };
 
 export default AppDownload;
