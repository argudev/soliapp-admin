import React, { useEffect, useState } from 'react';
import {
    Badge,
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";

const Analytics = ({ payment, debts, business, businessexpenses, budgets, warranty }) => {
    const [analyticdata, setAnalyticdata] = useState({
        balance: {
            cash: 0,
            account: 0,
            inventory: 0,
            wcapital: 0,
            tliabilities: 0,
            patrimony: 0,
        },
        flow: {
            goodsales: 0,
            badsales: 0,
            averagesales: 0,
            daysworked: 0,
        },
        liquidity: {
            salesm: 0,
            costsale: 0,
            expenseb: 0,
            quote: 0,
            liquidity: 0,
            other: 0,
            familyexpenses: 0,
            aviability: 0,
        },
        other: {
            warranty: 0,
            debts: 0
        }

    })
    const calcdata = () => {
        // Balance General
        let totaldebs = getdebts();
        let cash=payment?payment.cash:0;
        let accounts_receivable=payment?payment.accounts_receivable:0;
        let inventary=payment?payment.inventary:0;
        let good_sales=payment?payment.good_sales:0;
        let bad_sales=payment?payment.bad_sales:0;
        let average_sales=payment?payment.average_sales:0;
        let days_worked=payment?payment.days_worked:0;

        
        let total_act = parseFloat(cash) + accounts_receivable + parseFloat(inventary);
        let patrimony = total_act - totaldebs;

        analyticdata.balance.cash = cash;
        analyticdata.balance.account = accounts_receivable;
        analyticdata.balance.inventory = inventary;
        analyticdata.balance.wcapital = total_act;
        analyticdata.balance.tliabilities = totaldebs;
        analyticdata.balance.patrimony = patrimony;

        // Flow
        analyticdata.flow.goodsales = good_sales;
        analyticdata.flow.badsales = bad_sales;
        analyticdata.flow.averagesales = average_sales;
        analyticdata.flow.daysworked = days_worked;

        // Liquidity
        let ecomargin = business.length ? business[0].economic_activity_margin : 0;
        let totalbusinessexpenses = gettotalbusinessexpenses();
        let budget = getbudgets();
        let totalquotedebts = getquotedebts();
        let dwork = days_worked * 4;
        let monthsales = average_sales * dwork;
        let margin = (ecomargin != 0) ? ecomargin / 100 : 0;
        let mc = monthsales * margin;
        let costsales = monthsales - mc;
        let totalbusiness = monthsales - costsales - totalbusinessexpenses - totalquotedebts;
        let total = monthsales + budget.rev - costsales - totalbusinessexpenses - totalquotedebts - budget.exp;


        analyticdata.liquidity.salesm = monthsales;
        analyticdata.liquidity.costsale = costsales;
        analyticdata.liquidity.expenseb = totalbusinessexpenses;
        analyticdata.liquidity.quote = totalquotedebts;
        analyticdata.liquidity.other = budget.rev;
        analyticdata.liquidity.familyexpenses = budget.exp;
        analyticdata.liquidity.liquidity = totalbusiness;
        analyticdata.liquidity.aviability = total;

        // Other information
        analyticdata.other.warranty = getwarranty();
        analyticdata.other.debts = totaldebs;
    }
    const getdebts = () => {
        let total = 0;
        debts.map((value) => {
            total += value.balance;
        })
        return total;
    }
    const gettotalbusinessexpenses = () => {
        let total = 0;
        businessexpenses.map((value) => {
            total += value.amount
        });
        return total;
    }
    const getbudgets = () => {
        let budgetsdata = {
            rev: 0,
            exp: 0
        }
        budgets.map((value) => {
            if (value.type === 'Revenues') {
                budgetsdata.rev += value.amount;
            } else {
                budgetsdata.exp += value.amount;
            }
        });
        return budgetsdata;
    }
    const getquotedebts = () => {
        let total = 0;
        debts.map((value) => {
            if (value.form == 'Diario') {
                total += value.quota * 20;
            } else if (value.form == 'Semanal') {
                total += value.quota * 4;
            } else if (value.form == 'Quincenal') {
                total += value.quota * 2;
            } else if (value.form == 'Mensual') {
                total += value.quota * 1;
            } else {
                total += value.quota;
            }
        });
        return total;
    }
    const getwarranty = () => {
        let total = 0;
        warranty.map((value) => {
            total += value.value;
        });
        return total;
    }
    useEffect(() => {
        calcdata();
    }, []);

    return (
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">Analisis</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <h6 className="heading-small text-muted mb-4">
                    Analisis del cliente
                </h6>
                <div className="pl-lg-4 analisistable">
                    <Row>
                        <Col lg="6">
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Balance General</th>
                                        <th scope="col">C$</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Efectivo</td><td>C${analyticdata.balance.cash}</td></tr>
                                    <tr><td>Cuentas por cobrar</td><td>C${analyticdata.balance.account}</td></tr>
                                    <tr><td>Inventario</td><td>C${analyticdata.balance.inventory}</td></tr>
                                    <tr><td>Activo circulante</td><td>C${analyticdata.balance.wcapital}</td></tr>
                                    <tr><td>Total Pasivo</td><td>C${analyticdata.balance.tliabilities}</td></tr>
                                    <tr><td>Patrimonio</td><td>C${analyticdata.balance.patrimony}</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col lg="6">
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Flujo Efectivo</th>
                                        <th scope="col">C$</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Ventas buenas</td><td>C${analyticdata.flow.goodsales}</td></tr>
                                    <tr><td>Ventas malas</td><td>C${analyticdata.flow.badsales}</td></tr>
                                    <tr><td>Ventas promedio</td><td>C${analyticdata.flow.averagesales}</td></tr>
                                    <tr><td>Dias Trabajados</td><td>{analyticdata.flow.daysworked}</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col lg="6">
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Liquidez del negocio</th>
                                        <th scope="col">C$</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Ventas mensuales</td><td>C${analyticdata.liquidity.salesm}</td></tr>
                                    <tr><td>Costo de venta</td><td>C${analyticdata.liquidity.costsale}</td></tr>
                                    <tr><td>Gastos del negocio</td><td>C${analyticdata.liquidity.expenseb}</td></tr>
                                    <tr><td>Cuotas de prestamos</td><td>C${analyticdata.liquidity.quote}</td></tr>
                                    <tr><td>Liquidez del negocio</td><td>C${analyticdata.liquidity.liquidity}</td></tr>
                                    <tr><td>Otros ingresos</td><td>C${analyticdata.liquidity.other}</td></tr>
                                    <tr><td>Gastos familiares</td><td>C${analyticdata.liquidity.familyexpenses}</td></tr>
                                    <tr><td>Disponibilidad</td><td>C${analyticdata.liquidity.aviability}</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col lg="6">
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Otra informacion</th>
                                        <th scope="col">C$</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Total Garantias</td><td>C${analyticdata.other.warranty}</td></tr>
                                    <tr><td>Total Deudas</td><td>C${analyticdata.other.debts}</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>

            </CardBody>
        </Card>
    )
}

export default Analytics