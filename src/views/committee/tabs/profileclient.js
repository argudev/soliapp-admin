import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Row,
    Col,
} from "reactstrap";

const Profileclient = ({ caseid,customer, credit, promocomment, spvcomment, comcomment,printcase,sinriesgo,credithistory,imgset}) => {
    const [images, setimages] = useState([]);
    const formatimages = (data) => {
        let images = [];
        data.map((value, index) => {
            images.push({
                id: index+'imgco+'+index,
                url: value,
                title: "Documento de identificacion " + index
            });
        });
        setimages(images);
    }
    useEffect(() => {
        formatimages(customer.document_image);
        
    }, []);
    
    return (
        <Card className="card-profile shadow">
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                {images.map((value, index) => (
                    <img
                        key={value.id}
                        alt={value.title}
                        className=""
                        src={value.url}
                        onClick={() => imgset(index, images)}
                        width="250px"
                        height="200px"
                    />
                ))}
            </CardHeader>
            <CardBody className="pt-0 pt-md-4" style={{ margin: '40px' }}>
                <Row>
                    <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                            <div>
                                <span className="heading">C${credit?credit.amount:0}</span>
                                <span className="description">Solicitado</span>
                            </div>
                            <div>
                                <span className="heading">{credit?credit.deadline:0}</span>
                                <span className="description">Plazo(Meses)</span>
                            </div>
                            <div>
                                <span className="heading">C${credit?credit.quota:0}</span>
                                <span className="description">Cuota (%{credit?credit.interest_rate:0})</span>
                            </div>
                        </div>
                    </div>
                </Row>
                <div className="text-center">
                    <h3>
                        {customer.name}
                        <span className="font-weight-light"></span>
                    </h3>
                    <div className="h5">
                        <i className="ni location_pin mr-2" />
                        {customer.document}
                    </div>
                    <div className="h5">
                        <i className="ni location_pin mr-2" />
                        {customer.telephone_companie1_name} {customer.telephone1}
                    </div>
                    <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {customer.address}
                    </div>
                    <hr className="my-4" />
                    <div>
                        <i className="ni education_hat mr-2" />
                        Comentario del promotor
                    </div>
                    <p>{promocomment}</p>
                    <hr className="my-4" />
                    <div>
                        <i className="ni education_hat mr-2" />
                        Comentario del supervisor
                    </div>
                    <p>{spvcomment}</p>
                    <hr className="my-4" />
                    <div>
                        <i className="ni education_hat mr-2" />
                        Comentario del verificador
                    </div>
                    <p>{comcomment}</p>
                </div>
                <hr className="my-4" />
                <div className="d-flex justify-content-between">
                    <Row>
                        <Col lg="4"><Button color="info" size="sm" onClick={() => { printcase(caseid) }}>Imprimir</Button></Col>
                        <Col lg="4"><Button color="info" size="sm" onClick={() => { sinriesgo(caseid) }}>Sinriesgo</Button></Col>
                        <Col lg="4"><Button color="info" size="sm" onClick={() => { credithistory(caseid) }}>Historial crediticio</Button></Col>
                    </Row>
                </div>

            </CardBody>
        </Card>
    )
}

export default Profileclient