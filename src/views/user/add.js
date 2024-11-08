import React, { Fragment, useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    ButtonGroup,
    Form,
    Input,
} from "reactstrap";


const AddUser = ({ permissions, branchoffices, roles, store, storepermission,reloadinfo }) => {
    const [cSelected, setCSelected] = useState([]);
    const [form, setForm] = useState({
        role: '',
        branch: '',
        username: '',
        password: '',
        passwordc: '',
        permissions: [],
    });

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };
    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        console.log(selected);

        setCSelected([...cSelected]);
    };

    const storeuser = () => {
        if (form.role && form.branch && form.username && form.password) {
            if (form.password == form.passwordc) {
                form.permissions = cSelected;
                console.log(form);
                store(form, (data) => {
                    if (form.permissions.length >= 1) {
                        storepermission(data.id, form.permissions, () => {
                            reloadinfo();
                        });
                    }
                });
            }
        }
    }

    return (
        <Fragment>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "200px",
                    backgroundImage:
                        "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
            </div>
            {/* Page content */}

            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Dato del usuario</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Informacion del usuario a crear
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-name"
                                                    >
                                                        Nombre Completo
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        name="name"
                                                        placeholder="Nombre Completo"
                                                        type="text"
                                                        value={form.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
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
                                                            branchoffices.map((value) => {
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
                                                        htmlFor="input-role"
                                                    >
                                                        Rol
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-role"
                                                        name="role"
                                                        placeholder="Rol"
                                                        type="select"
                                                        value={form.role}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Selecciona un rol</option>
                                                        {
                                                            roles.map((value) => {
                                                                return <option key={value.id} value={value.id}>{value.name}</option>

                                                            })
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-username"
                                                    >
                                                        Usuario
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-username"
                                                        name="username"
                                                        placeholder="Usuario"
                                                        type="text"
                                                        value={form.username}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-password"
                                                    >
                                                        Contraseña
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-password"
                                                        name="password"
                                                        placeholder="Contraseña"
                                                        type="password"
                                                        value={form.password}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-passwordc"
                                                    >
                                                        Confirmar Contraseña
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-passwordc"
                                                        name="passwordc"
                                                        placeholder="Confirmar Contraseña"
                                                        type="password"
                                                        value={form.passwordc}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Permisos
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            {
                                                permissions.map((value) => {
                                                    return (<Fragment>
                                                        <Col lg="12" key={value.id}>
                                                            <h6 className="heading-small text-muted mb-4">
                                                                {value.name}
                                                            </h6>
                                                            <ButtonGroup>
                                                                {
                                                                    value.permissions.map((valueper) => (
                                                                        <Button
                                                                            color="primary"
                                                                            outline
                                                                            onClick={() => onCheckboxBtnClick(valueper.id)}
                                                                            active={cSelected.includes(valueper.id)}
                                                                        >
                                                                            {valueper.name}
                                                                        </Button>
                                                                    ))
                                                                }

                                                            </ButtonGroup>
                                                        </Col>
                                                        <hr className="my-4" />
                                                    </Fragment>)
                                                })
                                            }
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="2"><FormGroup><Button color="success" onClick={() => storeuser()}>Agregar</Button></FormGroup></Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default AddUser