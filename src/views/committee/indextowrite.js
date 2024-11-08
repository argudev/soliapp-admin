import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Media,
    Container,
    Row,
} from "reactstrap";
import useCase from 'hooks/useCase';
import { writercolumns } from 'variables/columns';
import DataTable from 'react-data-table-component';
import WinBox from 'react-winbox';
import ViewCase from './viewcase';
import { customStyles } from 'variables/table';


const ToWrite = () => {
    const { getcases, getsinriesgo, getcredithistory, getpdf,casetyped } = useCase();
    const [committeedata, setCommitteedata] = useState([]);
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
        data.map((value) => {
            casesdata.push({
                id: value.case.id,
                type: value.case.type === 'New' ? 'Nuevo' : 'Re-Prestamo',
                customer: value.case.customer.name,
                department: value.case.customer.department_name,
                doc: value.case.customer.document,
                docimg: <Media className="align-items-center">
                    <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            alt="..."
                            src={value.case.customer.document_image[0]}
                        />
                    </a>
                </Media>,
                amount: value.case.credit_capacity.length >= 1 ? 'C$ ' + value.case.credit_capacity[0].amount : 'C$ ' + 0,
                datecommitte: value.case.date_last_action,
                date: value.case.created,
                options: <Button onClick={() => openWindow(value)}>
                    <i className="fas fa-eye" />
                </Button>
            });
        });
        setCommitteedata(casesdata);

    }
    const reloadcases = () => {
        getcases('to-write',formatcases);
    }
    useEffect(() => {
        getcases('to-write',formatcases);
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={writercolumns}
                        data={committeedata}
                        title={"Casos A digitacion"}
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
                                title={info.case.customer.name}
                                noFull
                            >
                                <ViewCase setIsOpen={setIsOpenModalView} casetyped={()=>casetyped(info.case.id,()=>{
                                    reloadcases()
                                })} data={info.case} reloadinfo={reloadcases} printcase={getpdf} sinriesgo={getsinriesgo} credithistory={getcredithistory} />
                            </WinBox>
                        ))
                    }

                </Fragment>
            )}
        </Fragment>
    )
}

export default ToWrite