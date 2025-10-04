export const siteMetadata = {
  siteUrl: 'https://360ghar.com',
  siteName: '360Ghar',
  defaultTitle:
    '360Ghar - Best Real Estate Platform in Gurugram | Buy, Sell, Rent Properties & PGs',
  defaultDescription:
    "360Ghar is Gurugram's premier real estate platform offering verified properties with 360° virtual tours. Buy, sell, rent apartments, flats, houses, and find PGs in prime locations like DLF Phase, Golf Course Road, Sohna Road, Cyber City. Schedule visits instantly. No listing fees for owners.",
  defaultKeywords:
    'Gurugram real estate, Gurgaon properties, buy property Gurugram, sell property Gurgaon, rent apartments Gurugram, PG in Gurgaon, flats for rent Gurgaon, apartments for sale Gurugram, DLF Phase properties, Golf Course Road real estate, Sohna Road apartments, Cyber City flats, Sector 29, MG Road, 360 virtual tours, verified listings, no broker properties, direct owner listings, real estate Gurugram, property dealers Gurgaon, housing society flats, builder floors, independent houses, commercial property Gurugram, office space Gurgaon',
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

