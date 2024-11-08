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
import { supervisorcolumns } from 'variables/columns';
import useUser from 'hooks/useUser';
import OficialAsignModal from './list';

const Supervisor = () => {
    const { getsupervisors,getoc,storeuserasign,deleteocasign } = useUser();
    const [supervisorsdata, setSupervisorsdata] = useState([]);
    const [useroc, setUseroc] = useState([]);
    const [supervSelected, setSupervSelected] = useState(null);
    const [oficials, setOficials] = useState([]);
    const [modal, setModal] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const formatuser = (data) => {
        let usrs = [];
        console.log(data);
        
        data.map((value) => {
            usrs.push({
                id: value.id,
                role_name: value.role_name,
                branchoffice_name: value.branchoffice_name,
                name: value.name,
                options: <FormGroup className="mb-0">
                    <Button onClick={() => {openmodal(value.id,value.ocs)}}>
                        <i className="fas fa-list" />
                    </Button>
                </FormGroup>
            });
        });
        setSupervisorsdata(usrs);
        setFilteredData(usrs);
    }
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue);
        const filteredItems = supervisorsdata.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filteredItems);
    };

    const openmodal=(id,ocs)=>{
        console.log(id,ocs);
        setSupervSelected(id);
        setOficials(ocs);
        setModal(true)
    }

    const reloadinfo = () => {
        getsupervisors(formatuser);
        
    }
    const toggle = () => setModal(!modal);
    const asignoficial=(data)=>{
        storeuserasign(data,(dat)=>{
            reloadinfo();
            setModal(false);
        });
    }
    const deloficialasig=(id)=>{
        deleteocasign(id,()=>{
            reloadinfo();
            setModal(false);
        });
    }
    useEffect(() => {
        getsupervisors(formatuser);
        getoc(setUseroc);
    }, [])

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={supervisorcolumns}
                        data={filteredData}
                        title={"Supervisores"}
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
            <OficialAsignModal data={oficials} store={asignoficial} deleteoc={deloficialasig} superv={supervSelected} useroc={useroc} modal={modal} toggle={toggle} />
        </Fragment>
    )
}

export default Supervisor