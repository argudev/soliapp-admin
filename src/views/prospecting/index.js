import React, { useState, useEffect, Fragment } from 'react';

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import useBranchOffice from 'hooks/useBranchOffice';
import useUser from 'hooks/useUser';
import useCase from 'hooks/useCase';
import ProspectingFilter from './filter';
import { customStyles } from 'variables/table';
import DataTable from 'react-data-table-component';
import { prospectionscolumns } from 'variables/columns';

const Prospecting = () => {
    const { getbranchoffices } = useBranchOffice();
    const { getuserbranch } = useUser();
    const { getprospect } = useCase();
    const [branchs, setBranchs] = useState([]);
    const [users, setUsers] = useState([]);
    const [prospections, setProspections] = useState([]);

    const filter = (form) => {
        getprospect(form, (data) => {
            let prospect=[];
            data.map((value)=>{
                prospect.push({
                    id:value.id,
                    name:value.complete_name,
                    phone:value.phone,
                    address:value.address,
                    date:value.date,
                })
            });
            setProspections(prospect);
        })
    }
    const updateuserfilter = (id) => {
        getuserbranch(id, setUsers);
    }
    useEffect(() => {
        getbranchoffices(setBranchs);
    }, [])

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-12">
                <ProspectingFilter branch={branchs} users={users} getuserbranch={updateuserfilter} filterprospect={filter} />
            </div>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                <DataTable
                        columns={prospectionscolumns}
                        data={prospections}
                        title={"Prospecciones"}
                        customStyles={customStyles}
                        pagination
                    />

                </Row>
            </Container>
        </Fragment>
    )
}

export default Prospecting