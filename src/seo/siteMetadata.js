export const siteMetadata = {
  siteUrl: 'https://360ghar.com',
  siteName: '360Ghar',
  defaultTitle:
    '360Ghar - Premier Real Estate Virtual Tours | Find Your Dream Home',
  defaultDescription:
    "Explore premium properties with immersive 360° virtual tours. Buy, sell, and rent homes across India with 360Ghar's advanced real estate platform.",
  defaultKeywords:
    'real estate, property, virtual tours, homes for sale, rental properties, India, Gurgaon, Gurugram, apartments, villas',
  defaultOgImage: '/assets/images/logo/logo.png',
  twitterCard: 'summary_large_image',
  organization: {
    name: '360Ghar',
    email: 'info@360ghar.com',
    telephone: '+91-8178340031',
    address: {
      streetAddress: '',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      postalCode: '122001',
      addressCountry: 'IN',
    },
  },
};

export const absoluteUrl = (urlOrPath) => {
  if (!urlOrPath) return siteMetadata.siteUrl;
  try {
    // If already absolute
    // eslint-disable-next-line no-new
    new URL(urlOrPath);
    return urlOrPath;
  } catch (_) {
    return `${siteMetadata.siteUrl.replace(/\/$/, '')}/${String(urlOrPath).replace(/^\//, '')}`;
  }
};

