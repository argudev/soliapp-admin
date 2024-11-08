import React from 'react';
import {
    Badge,
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";

const Budget = ({ budgets }) => {
    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Presupuesto</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
            <h6 className="heading-small text-muted mb-4">
                        Gastos y Ingresos
                    </h6>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Tipo</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                budgets.map((value) => {
                                    return (<tr key={value.id}>
                                        <td>
                                            <Badge color="" className="badge-dot mr-4">
                                                <i className={value.type==="Expenses"?"bg-danger":"bg-success"} />
                                                {value.type==="Expenses"?"Gasto":"Ingreso"}
                                            </Badge>
                                        </td>
                                        <td>{value.family_budget_name}</td>
                                        <td>C${value.amount}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
            </CardBody>
        </Card>
    )
}

export default Budget