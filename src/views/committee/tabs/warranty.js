import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";

const Warranty = ({ warranties,openphoto }) => {
    const [images, setimages] = useState([]);
    
    const formatimages=(data)=>{
        let images = [];
        data.map((value, index) => {
            images.push({
                url: value.image,
                title: "Garantias " + index
            });
        });
        setimages(images);
    }

    useEffect(() => {
        formatimages(warranties)
    }, [])
    
    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Garantias</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <h6 className="heading-small text-muted mb-4">
                    Garantias del cliente
                </h6>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Imagen</th>
                            <th scope="col">Informacion del articulo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            warranties.map((value,index) => {
                                return (<tr key={value.id}>
                                    <td> <img src={value.image} alt='Garantia' width="150px" onClick={()=>{openphoto(index,images)}}></img> </td>
                                    <td className="warranty_info">
                                        <p><b>Articulo</b>: <span>{value.product}</span></p>
                                        <p><b>Marca</b>: <span>{value.brand}</span></p>
                                        <p><b>Modelo</b>: <span>{value.model}</span></p>
                                        <p><b>Color</b>: <span>{value.color}</span></p>
                                        <p><b>Año</b>: <span>{value.year}</span></p>
                                        <p><b>Estado</b>: <span>{value.status}</span></p>
                                        <p><b>Lugar</b>: <span>{value.place}</span></p>
                                        <p><b>Comentario</b>: <span>{value.comment}</span></p>
                                        <p><b>Valor</b>: <span>C$ <b>{value.value}</b></span></p>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default Warranty