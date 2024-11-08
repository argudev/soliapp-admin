import React from 'react'
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";


const SimpleCard = ({title,subtitle,footertext,icon,footericontext}) => {
    return (
        <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
                <Row>
                    <div className="col">
                        <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                        >
                            {title}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                            {subtitle}
                        </span>
                    </div>
                    <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            {icon}
                        </div>
                    </Col>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                        {footericontext}
                    </span>{" "}
                    <span className="text-nowrap">{footertext}</span>
                </p>
            </CardBody>
        </Card>
    )
}

export default SimpleCard