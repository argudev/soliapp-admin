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
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import { clientscolumns } from 'variables/columns';
import { customStyles } from 'variables/table';

const ClientModal = ({ data, modal, toggle }) => {
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue);
        const filteredItems = data.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filteredItems);
    };
    useEffect(() => {
        setFilteredData(data);
    }, [data])

    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
            backdrop={'static'}
            keyboard={true}
            size='lg'
        >
            <ModalHeader toggle={toggle}>Lista de clientes</ModalHeader>
            <ModalBody>
                <DataTable
                    columns={clientscolumns}
                    data={filteredData}
                    title={"Lista de clientes"}
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

export default ClientModal