import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Media,
    Container,
    Row,
} from "reactstrap";
import useCase from 'hooks/useCase';
import { committeecolumns } from 'variables/columns';
import DataTable from 'react-data-table-component';
import WinBox from 'react-winbox';
import Committeeview from './committee';
import { customStyles } from 'variables/table';
import useBroadcast from 'hooks/useBroadcast';

const Committee = () => {
    const { connectWebSocket_updates } = useBroadcast();
    const { getcases, getpaymentypes, getsinriesgo, getcredithistory, getpdf, storesinriesgo, storecredithistory } = useCase();
    const [committeedata, setCommitteedata] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isOpenModalView, setIsOpenModalView] = useState(true);
    const [paymentyTypesdata, setPaymentyTypesdata] = useState([]);

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
        let typeuser = localStorage.getItem('user_level');
        let getrestriction = localStorage.getItem('user_credit_restriction');
        let restriction = getrestriction ? JSON.parse(getrestriction) : [];
        data.map((value) => {
            let creditamount = value.credit_capacity.length >= 1 ? value.credit_capacity[0].amount : 0;
            let datatoadd = {
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
            };
            if (typeuser != 'Analista de credito junior') {
                casesdata.push(datatoadd);
            } else {
                if (value.type === 'New' && creditamount > 0 && creditamount <= restriction.New) {
                    casesdata.push(datatoadd);
                } else if (value.type === 'Re-lend' && creditamount > 0 && creditamount <= restriction.Relend) {
                    casesdata.push(datatoadd);
                } else { }
            }
        });
        setCommitteedata(casesdata);

    }
    const reloadcases = () => {
        getcases('cases', formatcases);
    }

    useEffect(() => {
        reloadcases();
        getpaymentypes((values) => {
            setPaymentyTypesdata(values);
        });
        connectWebSocket_updates('cases-to-committee', 'CaseToCommittee', reloadcases);
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={committeecolumns}
                        data={committeedata}
                        title={"Casos Comite"}
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
                                <Committeeview setIsOpen={setIsOpenModalView} paymentTypes={paymentyTypesdata} data={info} reloadinfo={reloadcases} printcase={getpdf} sinriesgo={getsinriesgo} credithistory={getcredithistory} storesin={storesinriesgo} storehist={storecredithistory} />
                            </WinBox>
                        ))
                    }

                </Fragment>
            )}
        </Fragment>
    )
}

export default Committee