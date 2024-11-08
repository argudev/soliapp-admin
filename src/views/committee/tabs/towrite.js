import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

const ToWritetab = ({ user, user_assigned, supervisor, credit, deletetowrite }) => {
    useEffect(() => {
    }, []);

    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Evaluacion</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Informacion Aprobada
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="8">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-supervisor"
                                    >
                                        Supervisor
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-supervisor"
                                        name="supervisor"
                                        placeholder="Usuario Solicitante"
                                        type="text"
                                        readOnly
                                        value={supervisor?supervisor.name:""}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-user"
                                    >
                                        Usuario Solicitante
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-user"
                                        name="user"
                                        placeholder="Usuario Solicitante"
                                        type="text"
                                        readOnly
                                        value={user.name}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-user_assigned"
                                    >
                                        Usuario Asignado
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-user_assigned"
                                        name="user_assigned"
                                        placeholder="Usuario Asignado"
                                        type="text"
                                        readOnly
                                        value={user_assigned?user_assigned.name:""}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-amount"
                                    >
                                        Monto
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-amount"
                                        name="amountproposed"
                                        placeholder="Monto"
                                        type="text"
                                        readOnly
                                        value={credit ? credit.amount : 0}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-tax"
                                    >
                                        Tasa de Interés
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-tax"
                                        name="taxproposed"
                                        placeholder="Tasa de Interés"
                                        type="text"
                                        readOnly
                                        value={credit ? credit.interest_rate : 0}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-time"
                                    >
                                        Plazo (Meses)
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-time"
                                        name="timeproposed"
                                        placeholder="Plazo (Meses)"
                                        type="text"
                                        readOnly
                                        value={credit ? credit.deadline : 0}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-payment"
                                    >
                                        Frecuencia
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-payment"
                                        name="paymentproposed"
                                        placeholder="Frecuencia"
                                        type="text"
                                        readOnly
                                        value={credit ? credit.payment_type_name : 0}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-quota"
                                    >
                                        Cuota
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-quota"
                                        name="quotaproposed"
                                        placeholder="Cuota"
                                        type="text"
                                        readOnly
                                        value={credit ? credit.quota : 0}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="2"><FormGroup><Button color="success" onClick={() => deletetowrite()}>Digitado</Button></FormGroup></Col>
                        </Row>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

export default ToWritetab