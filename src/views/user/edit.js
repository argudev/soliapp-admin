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


const EditUser = ({ data, permissions, branchoffices, roles, update, storepermission, reloadinfo }) => {
    const [cSelected, setCSelected] = useState([]);
    const [form, setForm] = useState({
        role: '',
        branch: '',
        name: '',
        username: '',
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
        setCSelected([...cSelected]);
    };

    const updateuser = () => {
        if (form.role && form.branch && form.username) {
            form.permissions = cSelected;
            update(data.id,form, (data) => {
                if (form.permissions.length >= 1) {
                    storepermission(data.id, form.permissions, () => {
                        reloadinfo();
                    });
                } else {
                    reloadinfo();
                }
            });
        }
    }
    const formatdata = () => {
        let permiss = [];
        data.permissions.map((value) => {
            permiss.push(value.permission);
        });
        setForm({
            role: data.role,
            branch: data.branchoffice,
            username: data.user,
            name: data.name,
            permissions: permiss,
        });
        setCSelected(permiss);
    }
    useEffect(() => {
        formatdata();
    }, [])

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
                                        Informacion del usuario a actualizar
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
                                                    return (<Fragment key={value.id}>
                                                        <Col lg="12">
                                                            <h6 className="heading-small text-muted mb-4">
                                                                {value.name}
                                                            </h6>
                                                            <ButtonGroup>
                                                                {
                                                                    value.permissions.map((valueper) => (
                                                                        <Button
                                                                        key={valueper.id}
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
                                            <Col lg="2"><FormGroup><Button color="success" onClick={() => updateuser()}>Actualizar</Button></FormGroup></Col>
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

export default EditUser