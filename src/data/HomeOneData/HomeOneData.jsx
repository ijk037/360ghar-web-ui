import React from 'react'; 

// Banner One
import BannerImg from '/assets/images/thumbs/banner-img.png'; 
export const bannerContent = {
    subtitle: '360 WALKTHROUGH',
    title: 'India\'s first 360° ',
    gradientTitle: 'Home Platform',
    desc: 'Unlock the power of virtual reality in real estate. Easily Rent, Buy, and Sell properties with immersive 360° walkthroughs across Gurgaon.',
    thumb: BannerImg
}

// Filter Tabs
export const filterTabs = [
    {
        id: 1,
        text: 'Rent'
    },
    {
        id: 2,
        text: 'Buy'
    },
    {
        id: 3,
        text: 'Sell'
    },
]
  

// About One Content
export const aboutStatistics = {
    icon: <i className="fas fa-users text-gradient"></i>,
    number: '4000+',
    text: 'Satisfied Clients'
}
import aboutContentThumb from '/assets/images/thumbs/about-img.png';
import aboutContentIcon from '/assets/images/icons/about-icon.svg'; 
export const aboutContent = {
    thumb: aboutContentThumb,
    icon: aboutContentIcon,
    title: 'Your Dream Home Awaits',
    desc: '360Ghar revolutionizes the way you experience real estate with immersive 360° virtual tours. Our platform connects buyers, sellers, and renters across Gurgaon, making property transactions seamless and transparent.'
}


// Property data removed. Use API-driven properties everywhere.


// Property Type Data
import propertyTypeIcon1 from '/assets/images/icons/property-type-icon1.svg';
import propertyTypeIcon2 from '/assets/images/icons/property-type-icon2.svg';
import propertyTypeIcon3 from '/assets/images/icons/property-type-icon3.svg';
export const propertyTypes = [ 
    {
        icon: propertyTypeIcon1,
        title: '360° Virtual Tours',
        desc: 'Experience properties like never before with our immersive 360° walkthroughs. See every detail from the comfort of your home.'
    },
    {
        icon: propertyTypeIcon2,
        title: 'Expert Property Guidance',
        desc: 'Our experienced real estate consultants provide personalized guidance to help you make informed property decisions in Gurgaon.'
    },
    {
        icon: propertyTypeIcon3,
        title: 'Comprehensive Property Solutions',
        desc: 'From property listings to legal documentation, we provide end-to-end solutions for all your real estate needs in one platform.'
    },
]


// CountUp Data
export const counts = [
    {
        number: '5000+',
        text: 'Properties Listed'
    },
    {
        number: '2000+',
        text: 'Happy Customers'
    },
    {
        number: '50+',
        text: 'Expert Agents'
    },
    {
        number: '10',
        text: 'Cities Covered'
    },
]


// portfolio  Data
import portfolioThumb1 from '/assets/images/thumbs/portfolio1.png';
import portfolioThumb2 from '/assets/images/thumbs/portfolio2.png';
import portfolioThumb3 from '/assets/images/thumbs/portfolio3.png';
import portfolioThumb4 from '/assets/images/thumbs/portfolio4.png'; 
export const portfolios = [
    {
        thumb: portfolioThumb1,
        title: 'Residential Properties',
        desc: 'Discover luxury apartments, independent houses, and villas in prime locations across Gurgaon with 360° virtual tours.',
        btnIcon: <i className="fas fa-arrow-right"></i>
    },
    {
        thumb: portfolioThumb2,
        title: 'Commercial Spaces',
        desc: 'Find the perfect office spaces, retail outlets, and commercial complexes for your business needs in Gurgaon.',
        btnIcon: <i className="fas fa-arrow-right"></i>
    },
    {
        thumb: portfolioThumb3,
        title: 'Investment Properties',
        desc: 'Explore high-yield investment opportunities in Gurgaon\'s growing real estate market with expert market analysis.',
        btnIcon: <i className="fas fa-arrow-right"></i>
    },
    {
        thumb: portfolioThumb4,
        title: 'Rental Properties',
        desc: 'Browse through a wide selection of rental properties including apartments, houses, and PG accommodations in Gurgaon.',
        btnIcon: <i className="fas fa-arrow-right"></i>
    },
]


// Testimonial Data
import quoteIcon from '/assets/images/icons/quote.svg';
export const testimonials = [
    {
        name: 'Aman Sharma',
        designation: 'Home Seeker – Gurugram',
        desc: '360Ghar completely transformed how I search for properties. The verified 360° tours saved me countless visits and made shortlisting effortless.',
        quote: quoteIcon
    },
    {
        name: 'Rajesh Kumar',
        designation: 'Property Investor',
        desc: '360Ghar helped me find the perfect investment property in Gurugram. The team’s verification and guidance gave me full confidence.',
        quote: quoteIcon
    },
]


// Blog Data
import blogThumb1 from '/assets/images/thumbs/blog1.png';
import blogThumb2 from '/assets/images/thumbs/blog2.png';
import blogThumb3 from '/assets/images/thumbs/blog3.png';
import blogThumb4 from '/assets/images/thumbs/property-4.png';
import blogThumb5 from '/assets/images/thumbs/property-5.png';
import blogThumb6 from '/assets/images/thumbs/property-6.png'; 
export const blogs = [
    {
        id: 1,
        thumb: blogThumb1,
        admin: 'By Amit Sharma',
        meta: [
            {
                icon: <i className="fas fa-user"></i>,
                text: ' By admin'
            },
            {
                icon: <i className="fas fa-comments"></i>,
                text: 'Comments (30)'
            },
        ],
        title: 'Top 10 Luxury Apartments in Gurgaon for 2024',
        desc: 'Discover the most exclusive luxury apartments in Gurgaon with premium amenities, world-class facilities, and stunning architecture. Our comprehensive guide covers everything from DLF The Crest to M3M Golf Estate, helping you make an informed decision for your dream home.',
        linkText: 'Read More',
    },
    {
        id: 2,
        thumb: blogThumb2,
        date: '28 Mar',
        admin: 'By Rajesh Kumar',
        meta: [
            {
                icon: <i className="fas fa-user"></i>,
                text: ' By admin'
            },
            {
                icon: <i className="fas fa-comments"></i>,
                text: 'Comments (50)'
            },
        ],
        title: 'Investment Guide: Why Gurgaon is the Next Real Estate Hotspot',
        desc: 'Learn why Gurgaon has become India\'s premier investment destination. From rapid infrastructure development to excellent ROI potential, discover the key factors making Gurgaon properties a smart investment choice for 2024 and beyond.',
        linkText: 'Read More',
    },
    {
        id: 3,
        thumb: blogThumb3,
        admin: 'By Rakibul Islam',
        meta: [
            {
                icon: <i className="fas fa-user"></i>,
                text: ' By admin'
            },
            {
                icon: <i className="fas fa-comments"></i>,
                text: 'Comments (10)'
            },
        ],
        title: 'Complete Guide to Renting in Gurgaon: Tips and Tricks',
        desc: 'Navigate the rental market in Gurgaon with confidence. Our comprehensive guide covers everything from understanding rental agreements to finding the best neighborhoods, ensuring you get the perfect rental property for your needs.',
        linkText: 'Read More',
    },
    {
        id: 4,
        thumb: blogThumb4,
        admin: 'By Priya Singh',
        meta: [
            {
                icon: <i className="fas fa-user"></i>,
                text: ' By admin'
            },
            {
                icon: <i className="fas fa-comments"></i>,
                text: 'Comments (10)'
            },
        ],
        title: 'Commercial Real Estate Trends in Gurgaon 2024',
        desc: 'Stay ahead of the curve with the latest commercial real estate trends in Gurgaon. From co-working spaces to retail developments, discover how the commercial property market is evolving and where the best investment opportunities lie.',
        linkText: 'Read More',
    },
    {
        id: 5,
        thumb: blogThumb5,
        admin: 'By Vikram Patel',
        meta: [
            {
                icon: <i className="fas fa-user"></i>,
                text: ' By admin'
            },
            {
                icon: <i className="fas fa-comments"></i>,
                text: 'Comments (10)'
            },
        ],
        title: 'Understanding Property Documents: A Complete Checklist',
        desc: 'Don\'t get caught off guard during property transactions. Our comprehensive guide to essential property documents ensures you have everything you need for a smooth and legally compliant property purchase or rental in Gurgaon.',
        linkText: 'Read More',
    },
    {
        id: 6,
        thumb: blogThumb6,
        admin: 'By Neha Gupta',
        meta: [
            {
                icon: <i className="fas fa-user"></i>,
                text: ' By admin'
            },
            {
                icon: <i className="fas fa-comments"></i>,
                text: 'Comments (10)'
            },
        ],
        title: 'Top 5 Areas in Gurgaon with the Best Property Appreciation',
        desc: 'Discover the neighborhoods in Gurgaon that offer the highest property appreciation rates. From Sohna Road to MG Road, learn which areas are likely to give you the best returns on your real estate investment in the coming years.',
        linkText: 'Read More',
    },
]
