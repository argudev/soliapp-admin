import React, { useState, useEffect, Fragment } from 'react';
import {
    APIProvider,
    Map,
    useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';
import { Container, Row } from "reactstrap";
import useLocation from 'hooks/useLocation';
import MarkerWithInfowindow from 'components/Map/Markers/markerwithinfoview';
import useBranchOffice from 'hooks/useBranchOffice';
import useUser from 'hooks/useUser';
import MapFilter from './filters';
import Direction from 'components/Map/Directions/direction';
import ListTrack from './listtrack';

const Monitoring = () => {
    const API_KEY = process.env.REACT_APP_MAP_KEY;
    const { getmarkers, getwaypointsuser} = useLocation();
    const { getbranchoffices } = useBranchOffice();
    const { getuserbranch } = useUser();
    const [userMarkers, setUserMarkers] = useState([]);
    const [IsUserTrack, setIsUserTrack] = useState(false);
    const [shomap, setShomap] = useState(true);
    const [branchs, setBranchs] = useState([]);
    const [users, setUsers] = useState([]);
    const [listLocation, setListLocation] = useState([]);
    const [waypoints, setWaypoints] = useState([]);
    const [minWeight, setMinWeight] = useState('70vw');
    const [markerpreview, setMarkerpreview] = useState({});

    const formatedDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }

    useEffect(() => {
        getbranchoffices(setBranchs);
        getmarkers(formatedDate, (data) => {
            let posidata = [];
            data.map((value) => {
                posidata.push({
                    id: value.id,
                    lat: Number(value.latitude),
                    lng: Number(value.longitude),
                    user: value.user,
                    date: value.date_toshow,
                })
            });
            setUserMarkers(posidata);

        });
    }, []);

    const getTrack = (usr, date) => {
        setIsUserTrack(false);
        setWaypoints([])
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
                    id: value.id,
                    location: { lat: Number(value.latitude), lng: Number(value.longitude) },
                    stopover: false,
                    date: value.date_toshow,
                });
            });
            setWaypoints(waypoints);
            if (data.length >= 1) {
                firstposition = { lat: Number(data[0].latitude), lng: Number(data[0].longitude) };
                lastposition = { lat: Number(data[data.length - 1].latitude), lng: Number(data[data.length - 1].longitude) };
            }
            setUserMarkers(posidata);
            setIsUserTrack(true);
            setMinWeight('60vw');
        });
    }
    const updateuserfilter = (id) => {
        getuserbranch(id, setUsers);
    }
    const setshowmarker = (lat, lng, date) => {
        setMarkerpreview({
            lat: Number(lat),
            lng: Number(lng),
            user: "Preview",
            date: date,
        });
    }

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <MapFilter branch={branchs} users={users} getuserbranch={updateuserfilter} gettracks={getTrack} />

            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <div style={{
                        minHeight: '600px',
                        minWidth: minWeight
                    }}>
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                mapId={'sds4f4sdgs44fs4df'}
                                defaultCenter={{ lat: 12.1219451, lng: -86.2642218 }}
                                defaultZoom={12}
                                gestureHandling={'greedy'}
                                
                                fullscreenControl={true}>
                                {!IsUserTrack ?
                                    userMarkers && userMarkers.map((mkslcation) => (
                                        <MarkerWithInfowindow key={mkslcation.id} date={mkslcation.date} lat={mkslcation.lat} lng={mkslcation.lng} title={mkslcation.user} />
                                    ))
                                    : null}
                                {IsUserTrack && userMarkers && userMarkers.map((mkslcation, index) => {
                                    if (index === 0) {
                                        return <MarkerWithInfowindow key={mkslcation.id} date={mkslcation.date} lat={mkslcation.lat} lng={mkslcation.lng} title={mkslcation.user} iconview={{
                                            background: '#11f322',
                                            borderColor: '#1e89a1',
                                            glyphColor: '#0f677a'
                                        }} />
                                    } else if (index === userMarkers.length - 1) {
                                        return <MarkerWithInfowindow key={mkslcation.id} date={mkslcation.date} lat={mkslcation.lat} lng={mkslcation.lng} title={mkslcation.user} iconview={{
                                            background: '#22ccff',
                                            borderColor: '#1e89a1',
                                            glyphColor: '#0f677a'
                                        }} />
                                    } else {

                                    }
                                })}

                                {markerpreview.lat && <MarkerWithInfowindow date={markerpreview.date} lat={markerpreview.lat} lng={markerpreview.lng} title={markerpreview.user} />}
                                {IsUserTrack && <Direction waypoints={waypoints} setaddresslist={setListLocation}  ></Direction>}

                            </Map>
                        </APIProvider>
                    </div>
                    {IsUserTrack && <ListTrack markers={listLocation} showmarker={setshowmarker} />}

                </Row>
            </Container>
        </Fragment>
    )
}

export default Monitoring