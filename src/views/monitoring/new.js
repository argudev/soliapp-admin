import { Fragment, useEffect, useState } from 'react';
import LeafletMap from 'components/Map/leafletmap';
import { Container, Row } from "reactstrap";
import { Marker, Popup, Polyline } from 'react-leaflet';

import useDate from 'hooks/useDate';
import useLocation from 'hooks/useLocation';
import useBranchOffice from 'hooks/useBranchOffice';
import useUser from 'hooks/useUser';
import MapFilter from './filters';

const Monitoring = () => {
    const center = [12.1219451, -86.2642218];
    const zoom = 13;
    const { getdatenow } = useDate();
    const { getmarkers, getwaypointsuser } = useLocation();
    const { getbranchoffices } = useBranchOffice();
    const { getuserbranch } = useUser();

    const [branchs, setBranchs] = useState([]);
    const [users, setUsers] = useState([]);
    const [userMarkers, setUserMarkers] = useState([]);
    const [trayectoryUser, setTrayectoryUser] = useState([]);
    const [addressCache, setAddressCache] = useState({}); // Cache para direcciones

    // Función para obtener el nombre de la calle usando Nominatim (OSM)
    const getStreetName = async (lat, lng) => {
        const cacheKey = `${lat},${lng}`;
        if (addressCache[cacheKey]) return addressCache[cacheKey]; // Usar caché si existe

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            
            let address = "Dirección no disponible";
            if (data.address) {
                address = data.address.road || 
                          data.address.pedestrian || 
                          data.address.footway || 
                          "Calle no identificada";
            }

            setAddressCache(prev => ({ ...prev, [cacheKey]: address })); // Guardar en caché
            return address;
        } catch (error) {
            console.error("Error al obtener la dirección:", error);
            return "Error al cargar la dirección";
        }
    };

    // Componente para mostrar la dirección (evita llamadas redundantes)
    const AddressDisplay = ({ lat, lng }) => {
        const [address, setAddress] = useState("Cargando dirección...");

        useEffect(() => {
            const fetchAddress = async () => {
                const street = await getStreetName(lat, lng);
                setAddress(street);
            };
            fetchAddress();
        }, [lat, lng]);

        return <span>{address}</span>;
    };

    // Resto de tus funciones (getTrack, updateuserfilter, etc.)
    const getTrack = async (usr, date) => {
        getwaypointsuser(usr, date, async (data) => {
            let posidata = [];
            let trayectory = [];
            data.map((value) => {
                posidata.push({
                    id: value.id,
                    lat: Number(value.latitude),
                    lng: Number(value.longitude),
                    user: value.user,
                    date: value.date_toshow,
                });
                trayectory.push([Number(value.latitude), Number(value.longitude)]);
            });

            setUserMarkers(posidata);
            setTrayectoryUser(trayectory);
        });
    };

    const updateuserfilter = (id) => {
        getuserbranch(id, setUsers);
    };

    useEffect(() => {
        getbranchoffices(setBranchs);
        getmarkers(getdatenow, (data) => {
            let posidata = [];
            data.map((value) => {
                posidata.push({
                    id: value.id,
                    lat: Number(value.latitude),
                    lng: Number(value.longitude),
                    user: value.user,
                    date: value.date_toshow,
                });
            });
            setUserMarkers(posidata);
        });
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <MapFilter branch={branchs} users={users} getuserbranch={updateuserfilter} gettracks={getTrack} />
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <div style={{ minHeight: '600px', minWidth: '84vw' }}>
                        <LeafletMap center={center} zoom={zoom}>
                            {userMarkers && userMarkers.map((mkslcation) => (
                                <Marker key={mkslcation.id} position={[mkslcation.lat, mkslcation.lng]}>
                                    <Popup>
                                        Usuario: {mkslcation.user}
                                        <br />
                                        Fecha: {mkslcation.date}
                                        <br />
                                        <strong>Dirección:</strong>{" "}
                                        <AddressDisplay lat={mkslcation.lat} lng={mkslcation.lng} />
                                    </Popup>
                                </Marker>
                            ))}
                            {trayectoryUser && trayectoryUser.length > 0 && (
                                <Polyline 
                                    positions={trayectoryUser} 
                                    color="red" 
                                    weight={4}
                                    opacity={0.7}
                                />
                            )}
                        </LeafletMap>
                    </div>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Monitoring;