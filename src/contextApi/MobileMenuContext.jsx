import { useState }  from 'react';
import { MobileMenuContext } from './MobileMenuContextValue';

const MobileMenuProvider = ({ children }) => {
        
    const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

    const handleMobileMenuClick = () => {
        setToggleMobileMenu(!toggleMobileMenu)
    }
    
    const handleMobileMenuClose = () => {
        setToggleMobileMenu(false)
    }
    
    return (
        <MobileMenuContext.Provider value={{ toggleMobileMenu, handleMobileMenuClick, handleMobileMenuClose }}>
            { children }
        </MobileMenuContext.Provider>
    );
};

export default MobileMenuProvider;
