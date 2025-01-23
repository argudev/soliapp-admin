import React, { useState, useEffect, Fragment } from 'react';
import {
    useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';

const Direction = ({ waypoints, setaddresslist }) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState([]);
    const [directionsRenderers, setDirectionsRenderers] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    const calculateRoute = async (waypoints) => {
        if (!directionsService) return;
        let getrngcolor = getRandomColor();
        let routes = [];
        const promises = [];
        const promisesaddress = [];
        let listaddress = [];
        
        clearAllRoutes();

        const calc = async (origin, destination) => {
            return new Promise((resolve) => {
                directionsService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: 'WALKING',
                    optimizeWaypoints: false,
                }).then((response) => {
                    if (response.status === 'OK') {
                        routes.push(response);
                    } else {
                        console.error(`Error al calcular la ruta: ${response.status}`);
                    }
                    resolve();
                });
            });
        };
        const calcaddres = async (id, origin, date) => {
            return new Promise((resolve) => {
                directionsService.route({
                    origin: origin,
                    destination: origin,
                    travelMode: 'WALKING',
                    optimizeWaypoints: false,
                }).then((response) => {
                    if (response.status === 'OK') {
                        console.log(response.routes[0].summary);
                        console.log(origin, origin);
                        listaddress.push({
                            id: id,
                            address: response.routes[0].summary,
                            date: date,
                            lat: origin.lat,
                            lng: origin.lng
                        });
                        routes.push(response);
                    } else {
                        console.error(`Error al calcular la ruta: ${response.status}`);
                    }
                    resolve();
                });
            });
        };

        // Iterar sobre los waypoints
        for (let i = 0; i < waypoints.length - 1; i++) {
            const origin = waypoints[i].location;
            const destination = waypoints[i + 1].location;
            promises.push(calc(origin, destination));
        }
        for (let i = 0; i < waypoints.length - 1; i++) {
            const origin = waypoints[i].location;
            promisesaddress.push(calcaddres(waypoints[i].id, origin, waypoints[i].date));
        }

        await Promise.all(promises);
        await Promise.all(promisesaddress);

        // Renderizar todas las rutas
        routes.forEach((route) => {
            const renderer = new google.maps.DirectionsRenderer({
                map: map,
                markerOptions: { visible: false },
                preserveViewport: true,
                polylineOptions: {
                    strokeColor: getrngcolor,
                    strokeWeight: 5,
                },
            });
            renderer.setDirections(route);
            directionsRenderers.push(renderer);
        });
        setaddresslist(listaddress);

        return () => {
            directionsRenderers.forEach(renderer => renderer.setMap(null));
        };
    };
    
    const clearAllRoutes = () => {
        
        directionsRenderers.forEach((renderer) => {
        renderer.setDirections({ routes: [] });
            renderer.setMap(null);
        });
        setDirectionsRenderers([]);
    };
    
    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;
        calculateRoute(waypoints);
    }, [directionsService, directionsRenderer]);

    if (!leg) return null;

    return (<></>);
}

export default Direction