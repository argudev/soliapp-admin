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

const FilterClient = ({handlefind}) => {
    const [form, setForm] = useState({
        by:'Cedula',
        text:''
    });
    const [findingbutton, setfindingbutton] = useState(false);
    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };
    const handleFilter = () => {
        setfindingbutton(true);
        handlefind(form.by,form.text,setfindingbutton);
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
                                        <Col lg="3">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-by"
                                                >
                                                    Filtrar por
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-by"
                                                    name="by"
                                                    placeholder="Rol"
                                                    type="select"
                                                    value={form.by}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecciona un usuario</option>
                                                    <option value="Cedula">Cedula</option>
                                                    <option value="Nombre">Nombre</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-text"
                                                >
                                                    {form.by}
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-text"
                                                    name="text"
                                                    placeholder={form.by}
                                                    type="text"
                                                    value={form.text}
                                                    onChange={handleInputChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3">
                                            <FormGroup><Button color="success" onClick={handleFilter} disabled={findingbutton}>Filtrar</Button></FormGroup>
                                        </Col>
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

export default FilterClient