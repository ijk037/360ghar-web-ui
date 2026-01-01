import React, { useState } from 'react';

const ListGridButtons = () => {

    const [listGrid, setListGrid] = useState(false);

    const handleListGrid = () => {
        setListGrid(!listGrid); 
        document.body.classList.toggle('list-view'); 
    }
    
    return (
        <div className="list-grid d-flex align-items-center gap-2 me-4">
            <button 
                className={`list-grid__button grid-button text-body ${!listGrid ? 'active' : ''}`} 
                onClick={handleListGrid}
            >
                <i className="fas fa-th-large"></i>
            </button>
            <button 
                className={`list-grid__button list-button text-body ${listGrid ? 'active' : ''}`} 
                onClick={handleListGrid}
            >
                <i className="fas fa-list"></i>
            </button>
        </div>   
    );
};

export default ListGridButtons;