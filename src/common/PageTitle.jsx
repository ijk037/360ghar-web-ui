import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title, description, keywords }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                {description && <meta name="description" content={description} />}
                {keywords && <meta name="keywords" content={keywords} />}
                <meta property="og:title" content={title} />
                {description && <meta property="og:description" content={description} />}
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                {description && <meta name="twitter:description" content={description} />}
            </Helmet>
        </>
    );
};

export default PageTitle;