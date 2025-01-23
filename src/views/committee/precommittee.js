import React, { Fragment, useState,useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import Profileclient from './tabs/profileclient';
import Datatab from './tabs/datatab';
import Guarantor from './tabs/guarantor';
import Budget from './tabs/budget';
import Reference from './tabs/reference';
import CustomerBusiness from './tabs/business';
import Debt from './tabs/debts';
import Warranty from './tabs/warranty';
import Gallery from './tabs/gallery';
import Analytics from './tabs/analytics';
import Preevaluation from './tabs/preevaluation';


const Precommitteeview = ({ data, users, sinriesgo, credithistory, printcase, reloadinfo, storesin, storehist }) => {
    const [activeTab, setActiveTab] = useState('1');
    const [currentimagelist, setCurrentimagelist] = useState([]);
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [imageViewerindex, setImageViewerindex] = useState(0);
    const [validatedata, setValidatedata] = useState({
        budget: false,
        business: false,
        warranty: false,
        analytics: false,
        evaluation: false,
    })

    const imgviewersetindex = (index, imglist) => {
        setCurrentimagelist(imglist);
        setImageViewerindex(index);
        setOpenImageViewer(true);
    }

    const validate = () => {
        let budgets = data.budgets ? data.budgets : [],
            business = data.customer_business ? data.customer_business : [],
            warranties = data.warranty ? data.warranty : [],
            analytics = data.warranty ? data.warranty : [],
            evaluation = data.credit_capacity ? data.credit_capacity : [];

        setValidatedata({
            budget: budgets.length >= 1 ? true : false,
            business: business.length >= 1 ? true : false,
            warranty: warranties.length >= 1 ? true : false,
            analytics: analytics.length >= 1 ? true : false,
            evaluation: evaluation.length >= 1 ? true : false,
        });
        console.log({
            budget: budgets.length >= 1 ? true : false,
            business: business.length >= 1 ? true : false,
            warranty: warranties.length >= 1 ? true : false,
            analytics: analytics.length >= 1 ? true : false,
            evaluation: evaluation.length >= 1 ? true : false,
        });
        
    }

    useEffect(() => {
        validate();
    }, [data])
    
    return (
        <Fragment>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "200px",
                    backgroundImage:
                        "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
            </div>
            {/* Page content */}

            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Profileclient caseid={data.id} customer={data.customer} credit={data.credit_capacity[0]} promocomment={data.promotor_comment} spvcomment={data.supervisor_comment} comcomment={data.committee_comment} printcase={printcase} sinriesgo={sinriesgo} credithistory={credithistory} imgset={imgviewersetindex} />
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                    Datos
                                </NavLink>
                            </NavItem>
                            {data.guarantor ? <NavItem>
                                <NavLink className={activeTab === '10' ? 'active' : ''} onClick={() => setActiveTab('10')}>
                                    Fiador
                                </NavLink>
                            </NavItem> : null}
                            <NavItem>
                                <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                    Presupuesto
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                    Referencias
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '4' ? 'active' : ''} onClick={() => setActiveTab('4')}>
                                    Negocio
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '5' ? 'active' : ''} onClick={() => setActiveTab('5')}>
                                    Deudas
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '6' ? 'active' : ''} onClick={() => setActiveTab('6')}>
                                    Garantias
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '7' ? 'active' : ''} onClick={() => setActiveTab('7')}>
                                    Galeria
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '8' ? 'active' : ''} onClick={() => setActiveTab('8')}>
                                    Analisis
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={activeTab === '9' ? 'active' : ''} onClick={() => setActiveTab('9')}>
                                    Evaluacion
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                {data && (<Datatab customer={data.customer} spouse={data.customer_spouse[0]} />)}
                            </TabPane>
                            <TabPane tabId="10">
                                {
                                    data && data.guarantor ? <Guarantor data={data.customer_guarantor[0]} /> : null
                                }
                            </TabPane>
                            <TabPane tabId="2">
                                {data && <Budget budgets={data.budgets} />}
                            </TabPane>
                            <TabPane tabId="3">
                                {data && <Reference famrefer={data.family_reference} socialrefer={data.social_reference} />}
                            </TabPane>
                            <TabPane tabId="4">
                                {data && <CustomerBusiness business={data.customer_business[0]} expenses={data.customer_business_expenses} />}
                            </TabPane>
                            <TabPane tabId="5">
                                {data && <Debt debts={data.customer_debts} />}
                            </TabPane>
                            <TabPane tabId="6">
                                {data && <Warranty warranties={data.warranty} openphoto={imgviewersetindex} />}
                            </TabPane>
                            <TabPane tabId="7">
                                {data && <Gallery images={data.customer_media} callback={imgviewersetindex} />}
                            </TabPane>
                            <TabPane tabId="8">
                                {data && <Analytics payment={data.payment_capacity[0]} debts={data.customer_debts} business={data.customer_business} businessexpenses={data.customer_business_expenses} budgets={data.budgets} warranty={data.warranty} />}
                            </TabPane>
                            <TabPane tabId="9">
                                {data && <Preevaluation idcase={data.id} request_promotor={data.user} users={users} credit={data.credit_capacity[0]} validations={validatedata} storesin={storesin} storehist={storehist} reloadinfo={() => reloadinfo()} />}
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>

            {openImageViewer && (
                <Lightbox images={currentimagelist} startIndex={imageViewerindex} onClose={() => setOpenImageViewer(false)} />
            )}
        </Fragment>
    )
}

export default Precommitteeview