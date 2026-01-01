import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const Logo = () => {
    return (
        <Link to="/" className="link">
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

export default Logo;
