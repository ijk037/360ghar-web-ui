import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteMetadata, absoluteUrl } from '../seo/siteMetadata';
import { useLocation } from 'react-router-dom';

const toArray = (maybeArray) => (Array.isArray(maybeArray) ? maybeArray : [maybeArray].filter(Boolean));

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  url,
  hreflangs,
  structuredData, // object or array of objects
  noindex = false,
}) => {
  const location = useLocation();
  const path = `${location.pathname || ''}${location.search || ''}`;
  const computedUrl = absoluteUrl(url || path);
  const canonicalUrl = absoluteUrl(canonical || path);

  const metaTitle = title || siteMetadata.defaultTitle;
  const metaDesc = description || siteMetadata.defaultDescription;
  const metaKeywords = keywords || siteMetadata.defaultKeywords;
  const ogImage = absoluteUrl(image || siteMetadata.defaultOgImage);

  const alternates = hreflangs || [
    { hrefLang: 'en-in', href: canonicalUrl },
    { hrefLang: 'hi-in', href: canonicalUrl.replace(/\/$/, '') + '/hi/' },
    { hrefLang: 'x-default', href: canonicalUrl },
  ];

  const ldBlocks = toArray(structuredData);

  return (
    <Helmet>
      {/* Primary */}
      <title>{metaTitle}</title>
      {metaDesc && <meta name="description" content={metaDesc} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      {metaDesc && <meta property="og:description" content={metaDesc} />} 
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={computedUrl} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content={siteMetadata.twitterCard} />
      <meta name="twitter:title" content={metaTitle} />
      {metaDesc && <meta name="twitter:description" content={metaDesc} />} 
      <meta name="twitter:image" content={ogImage} />

      {/* Alternate languages */}
      {alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}

      {/* Structured Data */}
      {ldBlocks.map((ld, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...ld })}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

