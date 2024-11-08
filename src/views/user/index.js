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
import DataTable from 'react-data-table-component';
import WinBox from 'react-winbox';
import { customStyles } from 'variables/table';
import { userscolumns } from 'variables/columns';
import useUser from 'hooks/useUser';
import useBranchOffice from 'hooks/useBranchOffice';
import AddUser from './add';
import EditUser from './edit';
import { usePermissions } from 'context/permission';

const Users = () => {
    const { getuser, getusers, getpermissions, getroles, storeuser, storeuserpermissions, updateuser } = useUser();
    const { getbranchoffices } = useBranchOffice();
    const { permissions } = usePermissions();

    const [usersdata, setUsersdata] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissionsdata, setPermissionsdata] = useState([]);
    const [branch, setBranch] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isOpenModalView, setIsOpenModalView] = useState(true);

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
                options: <FormGroup className="mb-0">
                    <Button onClick={() => { edituser(value.id) }}>
                        <i className="fas fa-pencil" />
                    </Button>
                    <Button onClick={() => { }}>
                        <i className="fas fa-trash" />
                    </Button>
                </FormGroup>
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
    const genidadd = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const reloadinfo = () => {
        getusers(formatuser);
    }
    const edituser = (id) => {
        getuser(id, (data) => {
            openWindow({
                id: id,
                title: "Actualizar usuario",
                type: 'Edit',
                data: data
            })
        });
    }
    useEffect(() => {
        getroles(setRoles);
        getusers(formatuser);
        getpermissions(setPermissionsdata);
        getbranchoffices(setBranch);

    }, [])

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
                                    <Button onClick={() => openWindow({
                                        id: genidadd(1, 2000),
                                        title: "Agregar usuario",
                                        type: 'Add',
                                        data: []
                                    })}>
                                        <i className="fas fa-plus" />
                                        Agregar
                                    </Button>
                                </FormGroup>
                            </Form>
                        }
                    />
                </Row>
            </Container>
            {isOpenModalView && (
                <Fragment>
                    {
                        windows.map((info, index) => {
                            return (<WinBox
                                key={info.id}
                                width={1120}
                                height={720}
                                x="center"
                                y={20}
                                onClose={handleClose}
                                index={99999}
                                title={info.title}
                                noFull
                            >
                                {
                                    info.type == 'Add' ? (<AddUser permissions={permissionsdata} branchoffices={branch} roles={roles} store={storeuser} storepermission={storeuserpermissions} reloadinfo={reloadinfo} />) :
                                        (<EditUser data={info.data} permissions={permissionsdata} branchoffices={branch} roles={roles} update={updateuser} storepermission={storeuserpermissions} reloadinfo={reloadinfo} />)
                                }

                            </WinBox>)
                        })
                    }

                </Fragment>
            )}
        </Fragment>
    )
}

export default Users