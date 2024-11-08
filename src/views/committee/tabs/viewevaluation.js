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

const Visualization = ({ user, user_assigned,supervisor, credit,committee_comment}) => {
    const [form, setForm] = useState({
        id: '',
        amount: '',
        tax: '',
        time: '',
        payment: '',
        quota: '',
        comment: ''
    });
    useEffect(() => {
        setForm({
            id: credit.id,
            amount: credit.amount,
            tax: credit.interest_rate,
            time: credit.deadline,
            payment: credit.payment_type,
            quota: credit.quota,
            comment: committee_comment
        });        
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
                                        value={supervisor.name}
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
                                        value={user_assigned.name}
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
                                        value={credit.amount}
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
                                        value={credit.interest_rate}
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
                                        value={credit.deadline}
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
                                        value={credit.payment_type_name}
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
                                        value={credit.quota}
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

export default Visualization