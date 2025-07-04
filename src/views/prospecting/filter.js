import React, { Fragment, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
} from "reactstrap";

const ProspectingFilter = ({ branch, users, getuserbranch,filterprospect }) => {
    const [form, setForm] = useState({
        branch: '',
        user: '',
        datestart: new Date(),
        dateend: new Date()
    });
    const handleInputChange = (event) => {
        if (event.target.name === 'branch') {
            getuserbranch(event.target.value);
        }
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };
    const sendform=()=>{
        if (form.user !='' && form.branch !='' && form.datestart && form.dateend) {
        filterprospect(form);
        }
    }
    return (
        <Container className="mt--7" fluid>
            <Row>
                <Col className="order-xl-1" xl="8">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Filtros</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-branch"
                                                >
                                                    Sucursal
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-branch"
                                                    name="branch"
                                                    placeholder="Sucursal"
                                                    type="select"
                                                    value={form.branch}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecciona una sucursal</option>
                                                    {
                                                        branch.map((value) => {
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
                                                    htmlFor="input-user"
                                                >
                                                    Usuario
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-user"
                                                    name="user"
                                                    placeholder="Rol"
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
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-datestart"
                                                >
                                                    Fecha
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-datestart"
                                                    name="datestart"
                                                    placeholder="Fecha"
                                                    type="date"
                                                    value={form.datestart}
                                                    onChange={handleInputChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-dateend"
                                                >
                                                    Hasta
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-dateend"
                                                    name="dateend"
                                                    placeholder="Fecha"
                                                    type="date"
                                                    value={form.dateend}
                                                    onChange={handleInputChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className="my-4" />
                                <div className="pl-lg-4">
                                    <Row>
                                        <Col lg="2"><FormGroup><Button color="success" onClick={() => sendform()}>Filtrar</Button></FormGroup></Col>
                                    </Row>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProspectingFilter