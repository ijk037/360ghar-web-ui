import { useState }  from 'react';
import { ScrollHideContext } from './ScrollHideContextValue';

const ScrollHideProvider = ({ children }) => {

    const [hideScroll, setHideScroll] = useState(false); 

    const removeAllScrollClasses = () => {
        document.body.classList.remove('scroll-hide-sm');
        document.body.classList.remove('scroll-hide');
    };

    const openScrollHideSm = () => {
        setHideScroll(true);
        document.body.classList.add('scroll-hide-sm');
    };

    const handleScrollHide = () => {
        if (hideScroll) {
            handleScrollHideClose();
            return;
        }
        openScrollHideSm();
    }

    const handleScrollHideClose = () => {
        setHideScroll(false); 
        removeAllScrollClasses();
    }

    const openScrollHideLg = () => {
        setHideScroll(true);
        document.body.classList.add('scroll-hide');
    };

    // Large Device Scroll Hide
    const handleScrollHideLg = () => {
        if (hideScroll) {
            handleScrollHideLgClose();
            return;
        }
        openScrollHideLg();
    }

    const handleScrollHideLgClose = () => {
        setHideScroll(false); 
        removeAllScrollClasses();
    }
    
    return (
        <ScrollHideContext.Provider value={{ hideScroll, handleScrollHide, handleScrollHideClose, handleScrollHideLg, handleScrollHideLgClose, openScrollHideSm, openScrollHideLg }}>
            { children }
        </ScrollHideContext.Provider>
    );
};

export default ScrollHideProvider;
