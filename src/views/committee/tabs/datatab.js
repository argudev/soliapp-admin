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

const Datatab = ({ customer, spouse, images, openviewimage }) => {
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
                        Informacion del cliente
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
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
                                        readOnly
                                        value={customer.name}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-document"
                                    >
                                        Numero de cedula
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-document"
                                        name="document"
                                        placeholder="Tipo de Documento"
                                        type="text"
                                        value={customer.document}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-academic"
                                    >
                                        Nivel Academico
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-academic"
                                        name="academic"
                                        placeholder="Nivel Academico"
                                        type="text"
                                        value={customer.academic_level_name}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-department"
                                    >
                                        Departamento
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-department"
                                        name="department"
                                        placeholder="Departamento"
                                        type="text"
                                        value={customer.department_name}
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
                                        value={customer.address}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-genre"
                                    >
                                        Género
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-genre"
                                        name="genre"
                                        placeholder="Género"
                                        type="text"
                                        value={customer.genre}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-maritalstatus"
                                    >
                                        Estado Civil
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-maritalstatus"
                                        name="maritalstatus"
                                        placeholder="Estado Civil"
                                        type="text"
                                        value={customer.marital_status_name}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-tenureplace"
                                    >
                                        Tenencia
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-tenureplace"
                                        name="tenureplace"
                                        placeholder="Tenencia"
                                        type="text"
                                        value={customer.tenure_place_name}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-dependence"
                                    >
                                        Dependientes
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-dependence"
                                        name="dependence"
                                        placeholder="Dependientes"
                                        type="text"
                                        value={customer.dependence}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-residence_time"
                                    >
                                        Tiempo de Residencia
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-residence_time"
                                        name="residence_time"
                                        placeholder="Tiempo de Residencia"
                                        type="text"
                                        value={customer.residence_time}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-telephone1"
                                    >
                                        Telefono {customer.telephone_companie2_name}
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-telephone1"
                                        name="telephone1"
                                        placeholder="Telefono"
                                        type="text"
                                        value={customer.telephone1}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-telephone2"
                                    >
                                        Telefono {customer.telephone_companie1_name}
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-telephone2"
                                        name="telephone2"
                                        placeholder="Telefono"
                                        type="text"
                                        value={customer.telephone2}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                        Datos del conyugue
                    </h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-spousename"
                                    >
                                        Nombre Completo
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-spousename"
                                        name="spousename"
                                        placeholder="Nombre Completo"
                                        type="text"
                                        value={spouse?spouse.name:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-spousedocument"
                                    >
                                        Numero de Documento
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-spousedocument"
                                        name="spousedocument"
                                        placeholder="Numero de Documento"
                                        type="text"
                                        value={spouse?spouse.document:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-profession"
                                    >
                                        Profesion
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-profession"
                                        name="profession"
                                        placeholder="Profesion"
                                        type="text"
                                        value={spouse?spouse.profession_name:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-spouseacademic_level_name"
                                    >
                                        Nivel Academico
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-spouseacademic_level_name"
                                        name="spouseacademic_level_name"
                                        placeholder="Nivel Academico"
                                        type="text"
                                        value={spouse?spouse.academic_level_name:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-office"
                                    >
                                        Oficio
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-office"
                                        name="office"
                                        placeholder="Oficio"
                                        type="text"
                                        value={spouse?spouse.office:''}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-contribution"
                                    >
                                        Contribucion
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-contribution"
                                        name="contribution"
                                        placeholder="Contribucion"
                                        type="text"
                                        value={spouse?spouse.contribution:''}
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

export default Datatab