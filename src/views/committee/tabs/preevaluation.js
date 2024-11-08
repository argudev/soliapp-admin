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
import useCase from 'hooks/useCase';


const Preevaluation = ({ idcase, request_promotor,users, credit,storesin,storehist, reloadinfo }) => {
    const { approvedtoverifiying, deniedcase } = useCase();
    const [form, setForm] = useState({
        id: '',
        user: '',
        comment: ''
    });
    const [filesdata, setFilesdata] = useState({
        sinriesgo:[],
        history:[],
    })
    const [fileselected, setFileselected] = useState({
        sinriesgo:[],
        history:[],
    });

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };
    const handleChange = (event) => {
        setFileselected({
            ...fileselected,
            [event.target.name]: event.target.files[0]
        });
        setFilesdata({
            ...filesdata,
            [event.target.name]: event.target.value
        });
    }
    const approved = () => {
        if (form.user && form.comment) {
            approvedtoverifiying(idcase, form, () => {
                reloadinfo();
            });
        }
    }
    const denied = () => {
        if (form.comment) {
            deniedcase(idcase, form, () => {
                reloadinfo();
            });
        }
    }
    useEffect(() => {
        setForm({
            id: credit?credit.id:'',
            user: '',
            comment: ''
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
                        Informacion solicitante
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
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
                                        value={request_promotor.name}
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
                                        value={credit?credit.amount:0}
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
                                        value={credit?credit.interest_rate:0}
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
                                        value={credit?credit.deadline:0}
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
                                        value={credit?credit.payment_type_name:""}
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
                                        value={credit?credit.quota:0}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                        Formulario de aprobacion
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-users"
                                    >
                                        Usuario a asignar
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-users"
                                        name="user"
                                        placeholder="Usuario a asignar"
                                        type="select"
                                        value={form.user}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Selecciona un usuario</option>
                                        {
                                            users.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.name}</option>

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="12">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-comment"
                                    >
                                        Comentario
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-comment"
                                        name="comment"
                                        placeholder="Comentario"
                                        type="text"
                                        value={form.comment}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="2"><FormGroup><Button color="success" onClick={() => approved()}>Aprobar</Button></FormGroup></Col>
                            <Col lg="2"><FormGroup><Button color="danger" onClick={() => denied()}>Denegar</Button></FormGroup></Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Files */}
                    <h6 className="heading-small text-muted mb-4">
                        Archivos
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-sinriesgo"
                                    >
                                        Sinriesgo
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-sinriesgo"
                                        name="sinriesgo"
                                        placeholder="Sinriesgo"
                                        type="file"
                                        value={filesdata.sinriesgo}
                                        accept="application/pdf"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <Button onClick={() => storesin(idcase,fileselected.sinriesgo)}>Subir</Button>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-history"
                                    >
                                        Historial de credito
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-history"
                                        name="history"
                                        placeholder="history"
                                        type="file"
                                        value={filesdata.history}
                                        accept="application/pdf"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <Button onClick={() => storehist(idcase,fileselected.history)}>Subir</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

export default Preevaluation