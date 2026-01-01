import { useState, useEffect, useRef } from 'react';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const scrollTop = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div
            className="scrollToTop"
            style={{ visibility: visible ? 'visible' : 'hidden' }}
            onClick={scrollToTop}
            ref={scrollTop}
        >
            <i className="fas fa-chevron-up text-gradient"></i>
        </div>
    );
};

export default ScrollToTop;