import { siteMetadata } from './siteMetadata';

// Real Estate focused structured data for LLM optimization
export const realEstateStructuredData = {
  // Organization schema for real estate company
  organization: {
    '@type': 'RealEstateOrganization',
    name: siteMetadata.organization.name,
    url: siteMetadata.siteUrl,
    logo: siteMetadata.defaultOgImage,
    description: 'Gurugram premier real estate platform offering verified properties with 360° virtual tours',
    email: siteMetadata.organization.email,
    telephone: siteMetadata.organization.telephone,
    address: {
      '@type': 'PostalAddress',
      ...siteMetadata.organization.address
    },
    areaServed: [
      {
        '@type': 'Place',
        name: 'Gurugram',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gurugram',
          addressRegion: 'HR',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'Place',
        name: 'Gurgaon',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Gurgaon',
          addressRegion: 'HR',
          addressCountry: 'IN'
        }
      }
    ],
    serviceType: [
      'Property Buying',
      'Property Selling',
      'Property Rental',
      'PG Accommodation',
      'Virtual Tours',
      'Property Management'
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'RealEstateService',
          name: 'Property Listing Service',
          description: 'List your property on 360Ghar with 360° virtual tours'
        }
      }
    ]
  },

  // Website schema for search engines
  website: {
    '@type': 'WebSite',
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    description: siteMetadata.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/properties?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  },

  // Real Estate listing schema
  realEstateListing: {
    '@type': 'RealEstateListing',
    name: 'Properties for Sale and Rent in Gurugram',
    description: 'Verified properties with 360° virtual tours in prime Gurugram locations',
    url: `${siteMetadata.siteUrl}/properties`,
    numberOfItems: 1000,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      addressCountry: 'IN'
    }
  },

  // Local business schema
  localBusiness: {
    '@type': 'LocalBusiness',
    name: siteMetadata.siteName,
    description: 'Best real estate platform in Gurugram for buying, selling, renting properties and PGs',
    url: siteMetadata.siteUrl,
    telephone: siteMetadata.organization.telephone,
    address: {
      '@type': 'PostalAddress',
      ...siteMetadata.organization.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4595,
      longitude: 77.0266
    },
    openingHours: 'Mo-Su 00:00-23:59',
    serviceArea: {
      '@type': 'Place',
      name: 'Gurugram, Haryana, India'
    }
  },

  // FAQ schema for common real estate questions
  faq: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is 360Ghar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '360Ghar is Gurugram premier real estate platform offering verified properties with 360° virtual tours for buying, selling, renting properties and finding PGs.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I list my property on 360Ghar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can list your property on 360Ghar by visiting the post-property page. There are no upfront listing fees for owners.'
        }
      },
      {
        '@type': 'Question',
        name: 'What types of properties are available in Gurugram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '360Ghar offers various property types in Gurugram including apartments, flats, builder floors, independent houses, commercial spaces, and PG accommodations in prime locations like DLF Phase, Golf Course Road, Sohna Road, Cyber City, and more.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are all properties on 360Ghar verified?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 360Ghar features verified properties with authentic photos, accurate details, exact locations, and 360° virtual tours to ensure transparency and authenticity.'
        }
      }
    ]
  }
};

// Location-based structured data for major Gurugram areas
export const gurugramAreasData = [
  {
    '@type': 'Place',
    name: 'DLF Phase 1, Gurugram',
    description: 'Premium residential and commercial properties in DLF Phase 1',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      addressCountry: 'IN'
    },
    keywords: 'DLF Phase 1 properties, DLF Phase 1 apartments, DLF Phase 1 flats'
  },
  {
    '@type': 'Place',
    name: 'Golf Course Road, Gurugram',
    description: 'Luxury properties and premium apartments on Golf Course Road',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      addressCountry: 'IN'
    },
    keywords: 'Golf Course Road properties, Golf Course Road luxury apartments'
  },
  {
    '@type': 'Place',
    name: 'Sohna Road, Gurugram',
    description: 'Affordable and mid-range apartments on Sohna Road',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      addressCountry: 'IN'
    },
    keywords: 'Sohna Road properties, Sohna Road apartments, Sohna Road flats'
  },
  {
    '@type': 'Place',
    name: 'Cyber City, Gurugram',
    description: 'Commercial and residential properties near Cyber City',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      addressCountry: 'IN'
    },
    keywords: 'Cyber City properties, Cyber City apartments, Cyber City office space'
  },
  {
    '@type': 'Place',
    name: 'Sector 29, Gurugram',
    description: 'Properties in Sector 29, near major commercial hubs',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'HR',
      addressCountry: 'IN'
    },
    keywords: 'Sector 29 properties, Sector 29 apartments, Sector 29 flats'
  }
];

// Property-specific structured data generator
export const generatePropertyStructuredData = (property) => ({
  '@type': ['RealEstateListing', 'Product'],
  name: property.title || 'Property in Gurugram',
  description: property.description || 'Premium property with 360° virtual tour in Gurugram',
  url: property.url || `${siteMetadata.siteUrl}/property/${property.id}`,
  image: property.images || [siteMetadata.defaultOgImage],
  address: {
    '@type': 'PostalAddress',
    addressLocality: property.city || 'Gurugram',
    addressRegion: 'HR',
    addressCountry: 'IN',
    streetAddress: property.address || ''
  },
  numberOfRooms: property.bedrooms || 1,
  floorSize: {
    '@type': 'QuantitativeValue',
    value: property.area || 1000,
    unitText: property.areaUnit || 'sqft'
  },
  offers: {
    '@type': 'Offer',
    price: property.price || 0,
    priceCurrency: 'INR',
    availability: property.available ? 'InStock' : 'OutOfStock',
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    seller: {
      '@type': 'RealEstateOrganization',
      name: siteMetadata.siteName,
      telephone: siteMetadata.organization.telephone
    }
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Property Type',
      value: property.propertyType || 'Apartment'
    },
    {
      '@type': 'PropertyValue',
      name: 'Listing Type',
      value: property.listingType || 'Sale'
    },
    {
      '@type': 'PropertyValue',
      name: 'Furnishing',
      value: property.furnishing || 'Semi-Furnished'
    },
    {
      '@type': 'PropertyValue',
      name: 'Bathrooms',
      value: property.bathrooms || 1
    },
    {
      '@type': 'PropertyValue',
      name: 'Balconies',
      value: property.balconies || 0
    },
    {
      '@type': 'PropertyValue',
      name: 'Parking',
      value: property.parking || 0
    },
    {
      '@type': 'PropertyValue',
      name: 'Age of Property',
      value: property.age || 'New'
    },
    {
      '@type': 'PropertyValue',
      name: 'Transaction Type',
      value: property.transactionType || 'New Property'
    },
    {
      '@type': 'PropertyValue',
      name: 'Ownership Type',
      value: property.ownershipType || 'Freehold'
    },
    {
      '@type': 'PropertyValue',
      name: 'Floor',
      value: property.floor || 'Ground Floor'
    },
    {
      '@type': 'PropertyValue',
      name: 'Total Floors',
      value: property.totalFloors || 0
    },
    {
      '@type': 'PropertyValue',
      name: 'Facing',
      value: property.facing || 'North-East'
    },
    {
      '@type': 'PropertyValue',
      name: 'Overlooking',
      value: property.overlooking || 'Garden/Park'
    },
    {
      '@type': 'PropertyValue',
      name: 'Virtual Tour Available',
      value: 'Yes'
    }
  ],
  aggregateRating: property.rating ? {
    '@type': 'AggregateRating',
    ratingValue: property.rating,
    reviewCount: property.reviewCount || 10
  } : undefined,
  review: property.reviews ? property.reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    datePublished: review.date,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating
    },
    reviewBody: review.comment
  })) : undefined
});

// Blog post structured data generator
export const generateBlogStructuredData = (blog) => ({
  '@type': 'BlogPosting',
  headline: blog.title || 'Real Estate Blog',
  description: blog.description || 'Latest real estate insights and tips',
  image: blog.image || siteMetadata.defaultOgImage,
  author: {
    '@type': 'Organization',
    name: siteMetadata.siteName
  },
  publisher: {
    '@type': 'Organization',
    name: siteMetadata.siteName,
    logo: {
      '@type': 'ImageObject',
      url: siteMetadata.defaultOgImage
    }
  },
  datePublished: blog.publishedAt || new Date().toISOString(),
  dateModified: blog.updatedAt || new Date().toISOString(),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': blog.url || `${siteMetadata.siteUrl}/blog/${blog.slug}`
  }
});

// Breadcrumb structured data generator
export const generateBreadcrumbStructuredData = (breadcrumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

// Video object structured data for virtual tours
export const generateVideoStructuredData = (video) => ({
  '@type': 'VideoObject',
  name: video.title || '360° Virtual Tour',
  description: video.description || 'Experience this property through our immersive 360° virtual tour',
  thumbnailUrl: video.thumbnail || siteMetadata.defaultOgImage,
  uploadDate: video.uploadDate || new Date().toISOString(),
  duration: video.duration || 'PT1M',
  contentUrl: video.contentUrl,
  embedUrl: video.embedUrl,
  publisher: {
    '@type': 'Organization',
    name: siteMetadata.siteName,
    logo: {
      '@type': 'ImageObject',
      url: siteMetadata.defaultOgImage
    }
  }
});