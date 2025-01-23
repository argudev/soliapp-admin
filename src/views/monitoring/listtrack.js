import React, { useState, useEffect, Fragment } from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from "reactstrap";
import LocationListItem from 'components/Map/List/locationlist';

const ListTrack = ({ markers, showmarker }) => {
    const [items, setItems] = useState([]);
    const [routecontroller, setRoutecontroller] = useState(null);
    const [isplaying, setIsplaying] = useState(false);
    const formatdata = () => {
        let dtmk = markers.sort((a, b) => a.id - b.id);
        setItems(dtmk);
    }

    const playroute = () => {
        const newController = deleayexec( 
            items,
            (item) => {
                console.log("Procesando elemento:", item);
                showmarker(item.lat, item.lng, item.date);
            },
            500,
            () => console.log("Todos los elementos han sido procesados.")
        );
        setRoutecontroller(newController);
    }

    const deleayexec = (array, callback, interval, onComplete = () => { }) => {
        let index = 0;
        let running = true;

        const exec = () => {
            if (!running) return;
            if (index < array.length) {
                callback(array[index]);
                index++;
                setTimeout(exec, interval);
            } else {
                onComplete();
            }
        }

        exec();
        return {
            stop: () => {
                running = false;
            },
        };
    }

    useEffect(() => {
        formatdata();
    }, [markers]);

    return (
        <Card className="bg-secondary shadow" style={{ minWidth: "25%", maxHeight: "600px", overflowY: 'scroll' }}>
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Lista de ubicaciones</h3>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col xs="8">
                        <Button color="success" onClick={() => {playroute();setIsplaying(true)}}><i className="fa-solid fa-play" /></Button>
                        <Button color="danger" onClick={() => {
                            if (routecontroller) {
                                routecontroller.stop();
                                setIsplaying(false);
                            }
                        }}><i className="fa-solid fa-stop" /></Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                {items.map((value) => (<LocationListItem key={value.id} date={value.date} address={value.address} lat={value.lat} lng={value.lng} preview={showmarker} isplaying={isplaying} />))}
            </CardBody>
        </Card>
    )
}

export default ListTrack