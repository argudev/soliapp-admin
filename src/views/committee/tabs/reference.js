import React from 'react';
import {
    Badge,
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";

const Reference = ({ famrefer,socialrefer }) => {
    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Referencias</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <h6 className="heading-small text-muted mb-4">
                    Referencias Familiares
                </h6>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Referencia</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            famrefer.map((value) => {
                                return (<tr key={value.id}>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            <i className={value.type === "Bad" ? "bg-danger" : "bg-success"} />
                                            {value.type === "Bad"?"Mala":"Buena"}
                                        </Badge>
                                    </td>
                                    <td>{value.name}</td>
                                    <td>{value.telephone}</td>
                                    <td>{value.address}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                    Referencias Sociales
                </h6>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Referencia</th>
                            <th scope="col">Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            socialrefer.map((value) => {
                                return (<tr key={value.id}>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            <i className={value.type === "Bad" ? "bg-danger" : "bg-success"} />
                                            {value.type === "Bad"?"Mala":"Buena"}
                                        </Badge>
                                    </td>
                                    <td>{value.comment}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default Reference