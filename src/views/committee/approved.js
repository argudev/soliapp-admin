import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Media,
    Container,
    Row,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
} from "reactstrap";
import useCase from 'hooks/useCase';
import { approveddeniedcolumns } from 'variables/columns';
import DataTable from 'react-data-table-component';
import WinBox from 'react-winbox';
import ViewCase from './viewcase';
import { customStyles } from 'variables/table';
import useBroadcast from 'hooks/useBroadcast';

const Approved = () => {
    const {disconnectWebsocket}=useBroadcast()
    const { getcases, getcase, getsinriesgo, getcredithistory, getpdf } = useCase();
    const [committeedata, setCommitteedata] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isOpenModalView, setIsOpenModalView] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Close window
    const handleClose = (id) => {
        setWindows(prevWindows => prevWindows.filter(win => win.id !== id));
    };

    // Open new window
    const openWindow = (windowData) => {
        const idExists = windows.some(win => win.id === windowData.id);
        if (!idExists) {
            setWindows(prevWindows => [...prevWindows, windowData]);
        }
    };
    const getcaseid = (id) => {
        getcase(id, (data) => {
            openWindow(data);

        });
    }


    //Format cases
    const formatcases = (data) => {
        let casesdata = [];
        
        data.map((value) => {
            casesdata.push({
                id: value.id,
                type: value.type === 'New' ? 'Nuevo' : 'Re-Prestamoss',
                customer: value.customer.name,
                department: value.customer.department_name,
                doc: value.customer.document,
                docimg: <Media className="align-items-center">
                    <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            alt="..."
                            src={value.customer.document_image[0]}
                        />
                    </a>
                </Media>,
                amount: value.credit_capacity.length >= 1 ? 'C$ ' + value.credit_capacity[0].amount : 'C$ ' + 0,
                datecase: value.date_last_action,
                date: value.created,
                options: <Button onClick={() => getcaseid(value.id)}>
                    <i className="fas fa-eye" />
                </Button>
            });
        });
        setCommitteedata(casesdata);
        setFilteredData(casesdata);

    }
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setFilterText(searchValue);
        const filteredItems = committeedata.filter((item) => 
            item.customer.toLowerCase().includes(searchValue) ||
            item.doc.toLowerCase().includes(searchValue) ||
            item.datecase.toLowerCase().includes(searchValue) ||
            item.date.toLowerCase().includes(searchValue)
        );
        setFilteredData(filteredItems);
    };
    const reloadcases = () => {
        getcases('cases/approved', formatcases);
    }
    useEffect(() => {
        getcases('cases/approved', formatcases);
        //disconnectWebsocket()
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={approveddeniedcolumns}
                        data={filteredData}
                        title={"Casos Aprobados"}
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
            {isOpenModalView && (
                <Fragment>
                    {
                        windows.map((info, index) => (
                            <WinBox
                                key={info.id}
                                width={1120}
                                height={720}
                                x="center"
                                y={20}
                                onClose={handleClose}
                                index={99999}
                                title={info.customer.name}
                                noFull
                            >
                                <ViewCase setIsOpen={setIsOpenModalView} data={info} reloadinfo={reloadcases} printcase={getpdf} sinriesgo={getsinriesgo} credithistory={getcredithistory} />
                            </WinBox>
                        ))
                    }

                </Fragment>
            )}
        </Fragment>
    )
}

export default Approved