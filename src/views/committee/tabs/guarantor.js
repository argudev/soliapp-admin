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
} from "reactstrap";

const Guarantor = ({ data }) => {
    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Datos</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Datos del Fiador
                    </h6>
                    <div className="pl-lg-4">
                        <Row>

                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-names"
                                    >
                                        Nombres
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-names"
                                        name="names"
                                        placeholder="Nombres"
                                        type="text"
                                        value={data?data.first_name + ' ' + data.second_name:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-lastnames"
                                    >
                                        Apellidos
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-lastnames"
                                        name="lastnames"
                                        placeholder="Apellidos"
                                        type="text"
                                        value={data?data.first_lastname + ' ' + data.second_lastname:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-typeguarantor"
                                    >
                                        Tipo
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-typeguarantor"
                                        name="typeguarantor"
                                        placeholder="Tipo"
                                        type="text"
                                        value={data?data.type:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-documentg"
                                    >
                                        Document
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-documentg"
                                        name="documentg"
                                        placeholder="Document"
                                        type="text"
                                        value={data?data.document:''}
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
                                        Direccion
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-address"
                                        name="address"
                                        placeholder="Direccion"
                                        type="text"
                                        value={data?data.address:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-telephone"
                                    >
                                        Celular
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-telephone"
                                        name="telephone"
                                        placeholder="Celular"
                                        type="text"
                                        value={data?data.telephone:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Guarantor