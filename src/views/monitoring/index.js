import React, { useState, useEffect, Fragment } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import useLocation from 'hooks/useLocation';
import StartMarker from 'assets/img/icons/map/start.png';
import EndMarker from 'assets/img/icons/map/end.png';
import MarkerGF from 'assets/img/icons/map/marker.png';
import useBranchOffice from 'hooks/useBranchOffice';
import useUser from 'hooks/useUser';
import MapFilter from './filters';

const Monitoring = () => {
    const keyload = window.keympload;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: keyload,
        //libraries: ['geometry', 'places']
    });
    const { getmarkers, getwaypointsuser } = useLocation();
    const {getbranchoffices}=useBranchOffice();
    const {getuserbranch}=useUser();

    const [position, setPosition] = useState([]);
    const [isUserTrack, setIsUserTrack] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [originpoint, setOriginpoint] = useState(null);
    const [destinationpoint, setDestinationpoint] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const [response, setResponse] = useState([]);
    const [isRouteCalculated, setIsRouteCalculated] = useState(false);
    const [zoom, setZoom] = useState(12);
    const [mapCenter, setMapCenter] = useState(null);
    const [branchs, setBranchs] = useState([]);
    const [users, setUsers] = useState([]);

    const [calculatingRoute, setCalculatingRoute] = useState(false);
    const defaultcenter = {
        lat: 12.1219451,
        lng: -86.2642218
    };

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    const onLoad = (marker) => {
        let location = marker.position;
        let locationdata = {
            lat: location.lat(),
            lng: location.lng()
        };
        //coords(locationdata);
    };
    const handleActiveMarker = (marker, LatLng) => {
        if (marker === activeMarker) {
            return;
        }
        setZoom(15);
        setActiveMarker(marker);
        setMapCenter(LatLng);
    };
    const gettrack = (usr, date) => {
        if (usr == '') {
            setIsUserTrack(false);
            getmarkers(date, (data) => {
                let posidata = [];
                setResponse([]);
                data.map((value) => {
                    posidata.push({
                        id: value.id,
                        lat: Number(value.latitude),
                        lng: Number(value.longitude),
                        user: value.user,
                        date: value.date_toshow,
                    })
                });
                setPosition(posidata);
                setIsRouteCalculated(false);
            });
        } else {
            setIsUserTrack(true);
            getwaypointsuser(usr, date, (data) => {
                let posidata = [];
                let lastposition = null;
                let firstposition = null;
                let waypoints = [];
                data.map((value) => {
                    posidata.push({
                        id: value.id,
                        lat: Number(value.latitude),
                        lng: Number(value.longitude),
                        user: value.user,
                        date: value.date_toshow,
                    })
                    waypoints.push({
                        location: { lat: Number(value.latitude), lng: Number(value.longitude) },
                        stopover: false,
                    });
                });
                if (data.length >= 1) {
                    firstposition = { lat: Number(data[0].latitude), lng: Number(data[0].longitude) };
                    lastposition = { lat: Number(data[data.length - 1].latitude), lng: Number(data[data.length - 1].longitude) };
                }
                setPosition(posidata);
                setOriginpoint(firstposition);
                setDestinationpoint(lastposition);
                calculateRoute(waypoints);
            });
        }
    }
    const calculateRoute = async (waypoints) => {
        setResponse([]);
        let routes = [];
        const promises = [];
        setCalculatingRoute(true);
        const calc = async (origin, destination) => {
            await new Promise((resolve) => {
                const directionsService = new window.google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: origin,
                        destination: destination,
                        optimizeWaypoints: false,
                        travelMode: 'WALKING'
                    },
                    (result, status) => {
                        if (status === 'OK') {
                            routes.push(result);
                        } else {
                            console.error(`Error al calcular la ruta: ${status}`);
                        }
                        resolve();
                    }
                );
            });
        }
        for (let i = 0; i < waypoints.length - 1; i++) {
            const origin = waypoints[i].location;
            const destination = waypoints[i + 1].location;
            promises.push(calc(origin, destination));
        }
        await Promise.all(promises);
        setResponse(routes);
        setWaypoints(waypoints);
        setCalculatingRoute(false);
    };
    const updateuserfilter=(id)=>{
        getuserbranch(id,setUsers);
    }

    useEffect(() => {
        getbranchoffices(setBranchs);
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        getmarkers(formattedDate, (data) => {
            let posidata = [];
            setResponse([]);
            data.map((value) => {
                posidata.push({
                    id: value.id,
                    lat: Number(value.latitude),
                    lng: Number(value.longitude),
                    user: value.user,
                    date: value.date_toshow,
                })
            });
            setPosition(posidata);
            setIsRouteCalculated(false);
        });
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <MapFilter branch={branchs} users={users} getuserbranch={updateuserfilter} gettracks={gettrack} />
            </div>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div style={{
                        minHeight: '600px',
                        minWidth: '80vw'
                    }}>
                        {isLoaded && (
                            <GoogleMap mapContainerStyle={containerStyle} center={mapCenter ? mapCenter : defaultcenter} zoom={zoom}>
                                {/* Child components, such as markers, info windows, etc. */}
                                {position.length >= 1 &&
                                    position.map((value, index) => (
                                        <Fragment key={value.id + value.lat}>
                                            {isUserTrack === false && (
                                                <Marker
                                                    key={value.id}
                                                    onLoad={onLoad}
                                                    icon={{
                                                        url: MarkerGF,
                                                        scaledSize: new window.google.maps.Size(40, 40),
                                                        origin: new window.google.maps.Point(0, 0),
                                                        anchor: new window.google.maps.Point(20, 40),
                                                    }}
                                                    position={{ lat: value.lat, lng: value.lng }}
                                                    onClick={() => handleActiveMarker(value.id, { lat: value.lat, lng: value.lng })}
                                                >
                                                    {activeMarker === value.id && (
                                                        <InfoWindow position={{ lat: value.lat, lng: value.lng }} onCloseClick={() => setActiveMarker(null)}>
                                                            <>
                                                                <p>{value.user}</p>
                                                                <p>Fecha de trackeo: {value.date}</p>
                                                            </>
                                                        </InfoWindow>
                                                    )}
                                                </Marker>
                                            )}
                                            {isUserTrack && index === 0 && (
                                                <Marker
                                                    key={value.id}
                                                    onLoad={onLoad}
                                                    icon={{
                                                        url: StartMarker,
                                                        scaledSize: new window.google.maps.Size(40, 40),
                                                        origin: new window.google.maps.Point(0, 0),
                                                        anchor: new window.google.maps.Point(20, 40),
                                                    }}
                                                    position={{ lat: value.lat, lng: value.lng }}
                                                    onClick={() => handleActiveMarker(value.id, { lat: value.lat, lng: value.lng })}
                                                >
                                                    {activeMarker === value.id && (
                                                        <InfoWindow position={{ lat: value.lat, lng: value.lng }} onCloseClick={() => setActiveMarker(null)}>
                                                            <>
                                                                <p>{value.user}</p>
                                                                <p>Fecha de trackeo: {value.date}</p>
                                                            </>
                                                        </InfoWindow>
                                                    )}
                                                </Marker>
                                            )}
                                            {isUserTrack && index === position.length - 1 && (
                                                <Marker
                                                    key={value.id}
                                                    onLoad={onLoad}
                                                    icon={{
                                                        url: EndMarker,
                                                        scaledSize: new window.google.maps.Size(40, 40),
                                                        origin: new window.google.maps.Point(0, 0),
                                                        anchor: new window.google.maps.Point(20, 40),
                                                    }}
                                                    position={{ lat: value.lat, lng: value.lng }}
                                                    onClick={() => handleActiveMarker(value.id, { lat: value.lat, lng: value.lng })}
                                                >
                                                    {activeMarker === value.id && (
                                                        <InfoWindow position={{ lat: value.lat, lng: value.lng }} onCloseClick={() => setActiveMarker(null)}>
                                                            <>
                                                                <p>{value.user}</p>
                                                                <p>Fecha de trackeo: {value.date}</p>
                                                            </>
                                                        </InfoWindow>
                                                    )}
                                                </Marker>
                                            )}
                                            {isUserTrack && index > 0 && index < position.length - 1 && (
                                                <Marker
                                                    key={value.id + value.lng}
                                                    onLoad={onLoad}
                                                    icon={{
                                                        url: MarkerGF,
                                                        scaledSize: new window.google.maps.Size(40, 40),
                                                        origin: new window.google.maps.Point(0, 0),
                                                        anchor: new window.google.maps.Point(20, 40),
                                                    }}
                                                    position={{ lat: value.lat, lng: value.lng }}
                                                    onClick={() => handleActiveMarker(value.id, { lat: value.lat, lng: value.lng })}
                                                >
                                                    {activeMarker === value.id && (
                                                        <InfoWindow position={{ lat: value.lat, lng: value.lng }} onCloseClick={() => setActiveMarker(null)}>
                                                            <>
                                                                <p>{value.user}</p>
                                                                <p>Fecha de trackeo: {value.date}</p>
                                                            </>
                                                        </InfoWindow>
                                                    )}
                                                </Marker>
                                            )}
                                        </Fragment>
                                    ))}

                                {response.map((route, index) => (
                                    <DirectionsRenderer
                                        key={index}
                                        options={{
                                            directions: route,
                                            markerOptions: { visible: false },
                                            polylineOptions: {
                                                strokeColor: '#D30B0B'  // Cambia el color a rojo (puedes usar códigos hexadecimales, nombres de colores, etc.)
                                            },
                                            preserveViewport: true
                                        }}
                                    />
                                ))}
                            </GoogleMap>
                        )}
                    </div>

                </Row>
            </Container>
        </Fragment>
    )
}

export default Monitoring