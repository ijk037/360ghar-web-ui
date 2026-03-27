import { useState }  from 'react';
import { OffCanvasContext } from './OffCanvasContextValue';

const OffCanvasProvider = ({ children }) => {

    const [offCanvas, setOffCanvas] = useState(false); 

    const handleOffCanvas = () => {
        setOffCanvas(!offCanvas)
    }
    
    const handleOffCanvasClose = () => {
        setOffCanvas(false)
    }
    
    return (
        <>
            <OffCanvasContext.Provider value={{ offCanvas, handleOffCanvas, handleOffCanvasClose }}>
                { children }
            </OffCanvasContext.Provider>
        </>
    );
};

export default OffCanvasProvider;
