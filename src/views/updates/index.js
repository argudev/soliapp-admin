import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Container,
    Row,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
} from "reactstrap";
import DataTable from 'react-data-table-component';
import { customStyles } from 'variables/table';
import { clientscasecolumns } from 'variables/columns';
import useClient from 'hooks/useClient';
import FilterClient from './filter';

const UpdateData = () => {
    const [clients, setClients] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const { getclientbydoc, getclientbyname } = useClient();

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue);
        const filteredItems = clients.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filteredItems);
    };
    const formatdata = (data) => {
        let clientsdb = [];
        data.map((item) => {
            clientsdb.push({
                id: item.id,
                name: item.name,
                doc: item.document,
            });
        });
        setClients(clientsdb);
        setFilteredData(clientsdb);
    }
    const handlefind = (type, text, setfindingbutton) => {
        if (type === "Cedula") {
            getclientbydoc((data) => {
                setfindingbutton(false);
                formatdata(data);
            }, text);
        } else {
            getclientbyname((data) => {
                setfindingbutton(false);
                formatdata(data);
            }, text);
        }
    }


    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <FilterClient handlefind={handlefind} />
            </div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={clientscasecolumns}
                        data={filteredData}
                        title={"Clientes"}
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
                </Row>
            </Container>
        </Fragment>
    );
}

export default UpdateData