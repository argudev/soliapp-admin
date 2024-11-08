import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Media,
    Container,
    Row,
} from "reactstrap";
import useCase from 'hooks/useCase';
import useUser from 'hooks/useUser';
import { precommitteecolumns } from 'variables/columns';
import DataTable from 'react-data-table-component';
import WinBox from 'react-winbox';
import Precommitteeview from './precommittee';
import { customStyles } from 'variables/table';
import { usePermissions } from "context/permission";
import useBroadcast from 'hooks/useBroadcast';


const Precommittee = () => {
    const { connectWebSocket_updates } = useBroadcast();
    const { userdata } = usePermissions();
    const { getcases, getsinriesgo, getcredithistory, getpdf, storesinriesgo, storecredithistory } = useCase();
    const { getoc } = useUser();
    const [committeedata, setCommitteedata] = useState([]);
    const [users, setUsers] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isOpenModalView, setIsOpenModalView] = useState(true);

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

    //Format cases
    const formatcases = (data) => {
        let casesdata = [];
        let dataset = [];

        data.map((value) => {
            casesdata.push({
                id: value.id,
                type: value.type === 'New' ? 'Nuevo' : 'Re-Prestamo',
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
                datecommitte: value.date_committee,
                date: value.created,
                options: <Button onClick={() => openWindow(value)}>
                    <i className="fas fa-eye" />
                </Button>
            });
        });
        if (userdata.role_name == 'Supervisor de Sucursal') {

            if (userdata.branchoffice_name == "Casa matriz") {
                console.log('Funciona', userdata.branchoffice_name);

                const filteredItems = casesdata.filter((item) =>
                    item.department.toLowerCase().includes('managua')
                );
                dataset = filteredItems;

            } else {
                console.log('Funciona');

                const filteredItems = casesdata.filter((item) =>
                    item.department.toLowerCase().includes('masaya')
                );
                dataset = filteredItems;

            }
            setCommitteedata(dataset);


        } else {
            dataset = casesdata;
            setCommitteedata(dataset);

        }


    }
    const reloadcases = () => {
        getcases('cases/pre-evaluating', formatcases);
    }
    useEffect(() => {
        reloadcases();
        getoc(setUsers);
        connectWebSocket_updates('cases-to-precommittee','CaseToPreCommittee',reloadcases);
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={precommitteecolumns}
                        data={committeedata}
                        title={"Casos Pre-comite"}
                        customStyles={customStyles}
                        pagination
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
                                <Precommitteeview setIsOpen={setIsOpenModalView} data={info} users={users} reloadinfo={reloadcases} printcase={getpdf} sinriesgo={getsinriesgo} credithistory={getcredithistory} storesin={storesinriesgo} storehist={storecredithistory} />
                            </WinBox>
                        ))
                    }

                </Fragment>
            )}
        </Fragment>
    )
}

export default Precommittee