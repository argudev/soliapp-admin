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
import { userscolumns } from 'variables/columns';
import useUser from 'hooks/useUser';

const Activities = () => {
    const { getusers } = useUser();

    const [usersdata, setUsersdata] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [modal, setModal] = useState(false);

    const formatuser = (data) => {
        let usrs = [];
        data.map((value) => {
            usrs.push({
                id: value.id,
                role: value.role,
                role_name: value.role_name,
                business_id: value.business_id,
                branchoffice: value.branchoffice,
                branchoffice_name: value.branchoffice_name,
                name: value.name,
                user: value.user,
                permissions: value.permissions,
                options: (<FormGroup className="mb-0">
                    <Button onClick={() => {  }}>
                        <i className="fas fa-pencil" />
                    </Button>
                    {value.role_name == "Analista de credito junior" ? (
                        <Button onClick={() => { }}>
                            <i className="fas fa-money-bill-transfer" />
                        </Button>
                    ) : null}
                    <Button onClick={() => { }}>
                        <i className="fas fa-trash" />
                    </Button>
                </FormGroup>)
            });
        });
        setUsersdata(usrs);
        setFilteredData(usrs);
    }
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue);
        const filteredItems = usersdata.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filteredItems);
    };
    const reloadinfo = () => {
        getusers(formatuser);
    }

    const toggle = () => setModal(!modal);

    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={userscolumns}
                        data={filteredData}
                        title={"Usuarios"}
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
                                    <Button onClick={() => {}}>
                                        <i className="fas fa-plus" />
                                        Agregar
                                    </Button>
                                </FormGroup>
                            </Form>
                        }
                    />
                </Row>
            </Container>
        </Fragment>
    )
}

export default Activities