import React, { useState, useEffect, Fragment } from 'react';
import {
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
    Pin
} from '@vis.gl/react-google-maps';

const MarkerWithInfowindow = ({ lat, lng, title, date, iconview }) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <Fragment>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(true)}
                position={{ lat: lat, lng: lng }}
                title={title}
            >
                {iconview && (<Pin
                    background={iconview ? iconview.background : '#22ccff'}
                    borderColor={iconview ? iconview.borderColor : '#1e89a1'}
                    glyphColor={iconview ? iconview.glyphColor : '#0f677a'}></Pin>)}
            </AdvancedMarker>

            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}>
                    Usuario: {title} <br />
                    Fecha de rastreo: <code style={{ whiteSpace: 'nowrap' }}>{date}</code><br />
                    Lat:{lat} Lng:{lng}
                </InfoWindow>
            )}
        </Fragment>
    )
}

export default MarkerWithInfowindow