import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";

const Debt = ({ debts }) => {
    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Deudas del cliente</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <h6 className="heading-small text-muted mb-4">
                    Deudas
                </h6>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Entidad</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Plazo</th>
                            <th scope="col">Cuota</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Frecuencia de pago</th>
                            <th scope="col">Fecha de cancelacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            debts.map((value) => {
                                return (<tr key={value.id}>
                                    <td>{value.supplier}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.deadline}</td>
                                    <td>C${value.quota}</td>
                                    <td>C${value.balance}</td>
                                    <td>{value.form}</td>
                                    <td>{value.date_show}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default Debt