 import { useState } from 'react';
 import { toast } from 'react-toastify';
 
 const PropertyActions = ({ property, onLikeToggle, isLiked, likeLoading }) => {
   const [shareOpen, setShareOpen] = useState(false);
 
   const propertyUrl = typeof window !== 'undefined' 
     ? `${window.location.origin}/property/${property?.id}` 
     : '';
   const shareText = `Check out this property: ${property?.title || 'Property'} on 360Ghar`;
 
   const copyLink = async () => {
     try {
       await navigator.clipboard.writeText(propertyUrl);
       toast.success('Link copied to clipboard!');
       setShareOpen(false);
     } catch {
       toast.error('Failed to copy link');
     }
   };
 
   const shareWhatsApp = () => {
     const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + propertyUrl)}`;
     window.open(url, '_blank');
     setShareOpen(false);
   };
 
   const shareFacebook = () => {
     const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`;
     window.open(url, '_blank', 'width=600,height=400');
     setShareOpen(false);
   };
 
   const shareTwitter = () => {
     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(propertyUrl)}`;
     window.open(url, '_blank', 'width=600,height=400');
     setShareOpen(false);
   };
 
   const printPage = () => {
     window.print();
   };
 
   return (
     <div className="property-actions d-flex align-items-center gap-2 flex-wrap">
       <button
         type="button"
         className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
         onClick={onLikeToggle}
         disabled={likeLoading}
         title={isLiked ? 'Remove from saved' : 'Save property'}
       >
         <i className={`fas fa-heart ${likeLoading ? 'fa-pulse' : ''}`}></i>
         <span className="ms-1 d-none d-sm-inline">{isLiked ? 'Saved' : 'Save'}</span>
       </button>
 
       <div className="dropdown">
         <button
           type="button"
           className="btn btn-sm btn-outline-primary"
           onClick={() => setShareOpen(!shareOpen)}
           title="Share property"
         >
           <i className="fas fa-share-alt"></i>
           <span className="ms-1 d-none d-sm-inline">Share</span>
         </button>
         {shareOpen && (
           <div className="dropdown-menu show share-dropdown">
             <button className="dropdown-item" onClick={shareWhatsApp}>
               <i className="fab fa-whatsapp text-success me-2"></i> WhatsApp
             </button>
             <button className="dropdown-item" onClick={shareFacebook}>
               <i className="fab fa-facebook text-primary me-2"></i> Facebook
             </button>
             <button className="dropdown-item" onClick={shareTwitter}>
               <i className="fab fa-twitter text-info me-2"></i> Twitter
             </button>
             <hr className="dropdown-divider" />
             <button className="dropdown-item" onClick={copyLink}>
               <i className="fas fa-link me-2"></i> Copy Link
             </button>
           </div>
         )}
       </div>
 
       <button
         type="button"
         className="btn btn-sm btn-outline-secondary"
         onClick={printPage}
         title="Print property details"
       >
         <i className="fas fa-print"></i>
         <span className="ms-1 d-none d-md-inline">Print</span>
       </button>
     </div>
   );
 };
 
 export default PropertyActions;
