import React, { useState, useEffect, Fragment } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import classNames from 'classnames';
import './advancemarker.css';

const AdvanceMarker = ({ latitude, longitude }) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const position = {
        lat: latitude,
        lng: longitude
    };

    const renderCustomPin = () => {
        return (
            <>
                <div className="custom-pin">
                    <button className="close-button">
                        <span className="material-symbols-outlined"> Cerrar </span>
                    </button>

                    <div className="image-container">
                        <span className="icon">
                        </span>
                    </div>

                </div>

                <div className="tip" />
            </>
        );
    };

    return (
        <AdvancedMarker
            position={position}
            title={'AdvancedMarker with custom html content.'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={classNames('real-estate-marker', { clicked, hovered })}
            onClick={() => setClicked(!clicked)}>
            {renderCustomPin()}
        </AdvancedMarker>
    )
}

export default AdvanceMarker