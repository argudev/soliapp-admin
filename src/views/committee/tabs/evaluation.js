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

const Evaluation = ({ idcase, user, user_assigned, supervisor, credit, committee_comment, paymentTypes, storesin,storehist, reloadinfo }) => {
    const { approvedcommitteecase, deniedcase, updatecommitteecoment } = useCase();
    const [form, setForm] = useState({
        id: '',
        amount: '',
        tax: '',
        time: '',
        payment: '',
        quota: '',
        comment: '',
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
    const getdaypaym = () => {
        let d = 0;
        paymentTypes.map((value) => {
            if (value.id == form.payment) {
                d = value.frecuency;
            }
        });
        return d;
    }
    const getmethodp = () => {
        let mt = '';
        paymentTypes.map((value) => {
            if (value.id == form.payment) {
                mt = value.name;
            }
        });
        return mt;
    }
    const calc = () => {
        let amount = parseFloat(form.amount);
        let time = 0;
        let dayp = getdaypaym();
        let methdo = getmethodp();

        if (methdo === 'Diario') {
            time = form.time * 20;
        }
        if (methdo === 'Semanal') {
            time = form.time * 4;
        }
        if (methdo === 'Quincenal') {
            time = form.time * 2;
        }
        if (methdo === 'Mensual') {
            time = form.time * 1;
        }
        let obj = amount / time;
        let frecuency = parseInt(dayp);
        let totaldays = time * frecuency;
        let interest = parseFloat(form.tax) / 100;
        let taxesmonthly = amount * interest;
        let totalinterest = (taxesmonthly * time) / totaldays;
        let quotacre = obj + totalinterest;
        setForm({
            ...form,
            quota: quotacre.toFixed(2).toString()
        })
    };
    const approved = () => {
        if (form.amount && form.payment && form.quota && form.tax && form.time) {
            approvedcommitteecase(idcase, form, () => {
                reloadinfo();
            });
        }
    }
    const denied = () => {
        if (form.amount) {
            deniedcase(idcase, form, () => {
                reloadinfo();
            });
        }
    }
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
    const changecomment = () => {
        updatecommitteecoment(idcase, form.comment);
    }
    useEffect(() => {
        setForm({
            id: credit ? credit.id : '',
            amount: credit ? credit.amount : 0,
            tax: credit ? credit.interest_rate : 0,
            time: credit ? credit.deadline : 0,
            payment: credit ? credit.payment_type : 0,
            quota: credit ? credit.quota : 0,
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
                        Informacion solicitante
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
                                        htmlFor="input-amount_approved"
                                    >
                                        Monto
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-amount_approved"
                                        name="amount"
                                        placeholder="Monto"
                                        type="text"
                                        value={form.amount}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-tax_approved"
                                    >
                                        Tasa de Interés
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-tax_approved"
                                        name="tax"
                                        placeholder="Tasa de Interés"
                                        type="text"
                                        value={form.tax}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-time_approved"
                                    >
                                        Plazo (Meses)
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-time_approved"
                                        name="time"
                                        placeholder="Plazo (Meses)"
                                        type="text"
                                        value={form.time}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-payment_approved"
                                    >
                                        Frecuencia
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-payment_approved"
                                        name="payment"
                                        placeholder="Frecuencia"
                                        type="select"
                                        value={form.payment}
                                        onChange={handleInputChange}
                                    >
                                        {
                                            paymentTypes.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.name}</option>

                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-quota_approved"
                                    >
                                        Cuota
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-quota_approved"
                                        name="quota"
                                        placeholder="Cuota"
                                        type="text"
                                        value={form.quota}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <Button onClick={() => calc()}>Calcular</Button>
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
                                        onBlur={changecomment}
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

export default Evaluation