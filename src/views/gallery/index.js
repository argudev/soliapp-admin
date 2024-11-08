// reactstrap components
import React, { Fragment, useState, useRef, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
} from "reactstrap";
import ClientModal from './clients';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { photoscolumns } from 'variables/columns';
import { customStyles } from 'variables/table';
import useNotification from 'hooks/useNotification';

const UploadGallery = () => {
    const { notification } = useNotification();
    const inputFilegalleryRef = useRef(null);
    const [images, setImages] = useState([]);
    const [imagelist, setImagelist] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [customerselected, setCustomerselected] = useState(null);
    const [customernameselected, setCustomernameselected] = useState('');
    const [modal, setModal] = useState(false);


    const imagesselected = (event) => {
        const filesSelected = event.target.files;
        const filelist = Array.from(filesSelected);
        const imglist = [];
        filelist.map((value, index) => {
            let filePreviewUrl = URL.createObjectURL(value);
            imglist.push({ name: value.name, image: <img src={filePreviewUrl} width={'150px'} /> });
        });
        setImages(filelist);
        setImagelist(imglist);
    };
    const handleSelectedClient = (id, name) => {
        setCustomernameselected(name);
        setCustomerselected(id);
        setModal(false);
    }
    const getcustomers = () => {
        axios.post('customers/list')
            .then((res) => {
                let getdata = res.data;
                if (getdata.success) {
                    let data = getdata.data;
                    let clidata = [];
                    data.map((value) => {
                        clidata.push({
                            name: value.name,
                            options: <Button color="success" onClick={() => handleSelectedClient(value.id, value.name)}>Seleccionar cliente</Button>
                        })
                    });
                    setCustomers(clidata);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const toggle = () => setModal(!modal);
    const sendimages = () => {
        if (images.length >= 1) {
            const uploadPromises = images.map(async (items) => {
                try {
                    const formData = new FormData();
                    formData.append('customer', customerselected);
                    formData.append('type', 'Negocio');
                    formData.append('image', items);
                    const response = await axios.post('customer-media/store', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return { items, success: true, response: response.data };
                } catch (error) {
                    return { items, success: false, error };
                }
            });
            Promise.all(uploadPromises)
                .then((results) => {
                    notification("Success", "Imagenes subida con exito")
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    useEffect(() => {
        getcustomers();
    }, [])

    return (
        <Fragment>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Enviar Imagenes</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <input
                                                    type="file"
                                                    ref={inputFilegalleryRef}
                                                    name="images[]"
                                                    multiple
                                                    onChange={imagesselected}
                                                    style={{ display: "none" }}
                                                />
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-client"
                                                        >
                                                            Cliente seleccionado
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-client"
                                                            name="client"
                                                            placeholder="Cliente seleccionado"
                                                            type="text"
                                                            value={customernameselected}
                                                        >
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="2"><FormGroup><Button color="success" onClick={() => { toggle() }}>Seleccionar cliente</Button></FormGroup></Col>
                                                <Col lg="2"><FormGroup><Button color="success" onClick={() => { inputFilegalleryRef.current.click(); }}>Seleccionar fotos</Button></FormGroup></Col>
                                                <Col lg="2"><FormGroup><Button color="success" onClick={() => { sendimages() }}>Enviar</Button></FormGroup></Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <DataTable
                        columns={photoscolumns}
                        data={imagelist}
                        title={"Fotos seleccionadas"}
                        customStyles={customStyles}
                    />

                </Row>
            </Container>
            <ClientModal data={customers} modal={modal} toggle={toggle} />
        </Fragment>
    )
}

export default UploadGallery