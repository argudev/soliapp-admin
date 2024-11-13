import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Form,
    FormGroup,
    Row,
    Col,
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import { occolumns } from 'variables/columns';
import { customStyles } from 'variables/table';

const OficialAsignModal = ({ data, superv, useroc, store, deleteoc, modal, toggle }) => {
    const [ocdata, setOcdata] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [form, setForm] = useState({
        user: '',
        sub_supervisor: ''
    });

    const formatoficial = (dat) => {
        let usrs = [];
        dat.map((value) => {
            usrs.push({
                id: value.id,
                name: value.name,
                options: <FormGroup className="mb-0">
                    <Button onClick={() => { deleteoc(value.id) }}>
                        <i className="fas fa-trash" />
                    </Button>
                </FormGroup>
            });
        });
        setOcdata(usrs);
        setFilteredData(usrs);
    }
    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue);
        const filteredItems = ocdata.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filteredItems);
    };
    const asignoc = () => {
        if (form.user != '') {
            form.sub_supervisor = superv;
            store(form);
        }
    }
    useEffect(() => {
        formatoficial(data);
    }, [data]);

    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            backdrop={'static'}
            keyboard={true}
            size='lg'
        >
            <ModalHeader toggle={toggle}>Lista de Oficiales asignados</ModalHeader>
            <ModalBody>
                <Row>
                    <Col lg="8">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-users"
                            >
                                Oficial a asignar
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-users"
                                name="user"
                                placeholder="Oficial a asignar"
                                type="select"
                                value={form.user}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona un oficial</option>
                                {
                                    useroc.map((value) => {
                                        return <option key={value.id} value={value.id}>{value.name}</option>

                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="4">
                        <FormGroup className="mb-1">
                            <Button onClick={() => { asignoc() }}>
                                <i className="fas fa-plus" />
                                Asignar
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
                <DataTable
                    columns={occolumns}
                    data={filteredData}
                    title={"Lista de oficiales"}
                    customStyles={customStyles}
                    pagination
                    subHeader
                    subHeaderComponent={
                        <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                            <FormGroup className="mb-0">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fas fa-search" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Buscar..." type="text" value={filterText} onChange={handleSearch} />
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    }
                />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default OficialAsignModal