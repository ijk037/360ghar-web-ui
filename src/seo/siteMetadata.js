export const siteMetadata = {
  siteUrl: 'https://360ghar.com',
  siteName: '360Ghar',
  defaultTitle:
    '360Ghar - Premier Real Estate Virtual Tours | Find Your Dream Home',
  defaultDescription:
    "Explore verified properties in Gurugram with studio‑quality 360° walkthroughs. Buy, rent, PG, or sell with authentic photos, accurate details, exact location, and in‑app visit scheduling. No upfront listing fee for owners.",
  defaultKeywords:
    'Gurgaon real estate, Gurugram properties, 360° walkthroughs, verified listings, PG in Gurgaon, flats for rent Gurgaon, apartments for sale Gurugram, DLF Phase, Golf Course Road, Sohna Road, Cyber City, map view, visit scheduling',
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

