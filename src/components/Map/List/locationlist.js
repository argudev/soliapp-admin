import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Alert
} from "reactstrap";

const LocationListItem = ({ date, lat, lng, address, preview,isplaying=false }) => {
    return (
        <Alert color="success" style={{ color: "black", fontSize: "12px" }} onMouseEnter={() => {
            if (!isplaying) {
                preview(lat, lng, date)
            }
        }}>
            {address}
            <p style={{ color: "black", fontSize: "12px" }}>Fecha: {date}<br />Ubicacion: {lat},{lng}</p>
        </Alert>
    )
}

export default LocationListItem