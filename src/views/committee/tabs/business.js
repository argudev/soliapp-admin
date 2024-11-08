import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Table,
    Badge
} from "reactstrap";

const CustomerBusiness = ({ business,expenses }) => {
    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Informacion del negocio</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Informacion del cliente
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-ecosector"
                                    >
                                        Sector economico
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-ecosector"
                                        name="ecosector"
                                        placeholder="Sector economico"
                                        type="text"
                                        readOnly
                                        value={business?business.economic_sector_name:''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-economic_activity_name"
                                    >
                                        Actividad
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-economic_activity_name"
                                        name="economic_activity_name"
                                        placeholder="Actividad"
                                        type="text"
                                        value={business?business.economic_activity_name:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>

                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-name"
                                    >
                                        Nombre
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-name"
                                        name="name"
                                        placeholder="Nombre"
                                        type="text"
                                        value={business?business.name:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-description"
                                    >
                                        Descripcion
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-description"
                                        name="description"
                                        placeholder="Descripcion"
                                        type="text"
                                        value={business?business.description:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-address"
                                    >
                                        Dirección
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-address"
                                        name="address"
                                        placeholder="Dirección"
                                        type="text"
                                        value={business?business.address:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-time"
                                    >
                                        Tiempo del negocio
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-time"
                                        name="time"
                                        placeholder="Tiempo del negocio"
                                        type="text"
                                        value={business?business.time:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                </Form>
                <h6 className="heading-small text-muted mb-4">
                    Gastos del negocio
                </h6>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses.map((value) => {
                                return (<tr key={value.id}>
                                    <td>
                                        <Badge color="" className="badge-dot mr-4">
                                            <i className="bg-danger" />
                                            {value.type}
                                        </Badge>
                                    </td>
                                    <td>C${value.amount}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default CustomerBusiness