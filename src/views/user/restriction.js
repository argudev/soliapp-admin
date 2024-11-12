import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Row,
    Col,
} from 'reactstrap';

const RestrictionUser = ({ data, iduser, store, update, modal, toggle }) => {
    const [form, setForm] = useState({
        id: '',
        user: '',
        new: '',
        relend: '',
    });

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };
    const formatform = () => {
        if (data.length >= 1) {
            let values = data[0].restrictions
            setForm({
                ...form,
                id: data[0].id,
                new: values.New,
                relend: values.Relend,
            });

        }
    }
    const save = () => {
        if (form.new && form.relend) {
            form.user = iduser;
            if (!form.id) {
                store(form);
            } else {
                update(form);
            }
        }
    }
    useEffect(() => {
        formatform();
    }, [data]);

    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            backdrop={'static'}
            keyboard={true}
            size='lg'
        >
            <ModalHeader toggle={toggle}>Restricciones de aprobacion</ModalHeader>
            <ModalBody>
                <Row>
                    <p>El usuario puede aprobar casos menos a</p>
                </Row>
                <Row>
                    <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-name"
                            >
                                Nuevos
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-new"
                                name="new"
                                placeholder="Nuevos"
                                type="number"
                                value={form.new}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-name"
                            >
                                Renovaciones
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-relend"
                                name="relend"
                                placeholder="Renovaciones"
                                type="number"
                                value={form.relend}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup className="mb-1">
                            <Button onClick={() => { save() }}>
                                <i className="fas fa-plus" />
                                Asignar
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default RestrictionUser