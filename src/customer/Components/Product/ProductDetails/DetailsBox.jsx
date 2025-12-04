import React, { useState } from 'react';


const DetailsBox = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="details-box">
            <div className="header" onClick={toggleOpen}>
                <h4>{title}</h4>
                <span>{isOpen ? '−' : '＋'}</span>
            </div>
            {isOpen && (
                <div className="content">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};

export default DetailsBox;
