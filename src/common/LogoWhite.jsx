import React from 'react';
import { Link } from 'react-router-dom';

import LogoWhiteImage from '/assets/images/logo/logo.png';

const LogoWhite = () => {
    return (
        <>
            <Link to="/" className="mobile-menu__logo">
                <img src={LogoWhiteImage} alt="Logo"/>
            </Link>   
        </>
    );
};

export default LogoWhite;