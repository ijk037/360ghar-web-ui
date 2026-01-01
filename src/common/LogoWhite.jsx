import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const LogoWhite = () => {
    return (
        <Link to="/" className="mobile-menu__logo">
            <LazyImage
                src="/assets/images/logo/logo.png"
                alt="360Ghar Logo"
                priority
                width={150}
                height={150}
                style={{ height: 'auto', maxHeight: '50px', width: 'auto' }}
            />
        </Link>
    );
};

export default LogoWhite;
