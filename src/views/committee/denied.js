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
import ViewCase from './viewcase';
import { customStyles } from 'variables/table';


const Denied = () => {
    const { getcases, getcase, getsinriesgo, getcredithistory, getpdf } = useCase();
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
                options: <Button onClick={() => getcaseid(value.id)}>
                    <i className="fas fa-eye" />
                </Button>
            });
        });
        setCommitteedata(casesdata);

    }
    const reloadcases = () => {
        getcases('cases/denied', formatcases);
    }
    useEffect(() => {
        getcases('cases/denied', formatcases);
    }, []);

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={committeecolumns}
                        data={committeedata}
                        title={"Casos Denegados"}
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
                                <ViewCase setIsOpen={setIsOpenModalView} data={info} reloadinfo={reloadcases} printcase={getpdf} sinriesgo={getsinriesgo} credithistory={getcredithistory} />
                            </WinBox>
                        ))
                    }

                </Fragment>
            )}
        </Fragment>
    )
}

export default Denied