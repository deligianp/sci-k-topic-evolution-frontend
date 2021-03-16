import React from "react";
import {Card, CardHeader, Button, CardBody, Row, Col} from "reactstrap";
import TopicTermsCloud from "./TopicTermsCloud";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faBahai} from "@fortawesome/free-solid-svg-icons";
import './TopicTermsCard.css';

const TopicTermsCard = (props) => {

    return (
        <Col xs={12} sm={6} md={4} className={'py-2'} style={{height: "400px"}}>
            <Card style={{height: "100%"}}>
                <CardHeader>
                    <Row className={'justify-content-between'}>
                        <Col xs={8}>
                            <h3>{`Topic ${props.topic}`} {props.isNovel &&
                            <span title='New topic' className="badge badge-pill badge-warning badge-sidenote"><FontAwesomeIcon
                                icon={faBahai}/>New topic</span>}</h3>
                        </Col>
                        <Col xs={4}>
                            <Link
                                className={'btn btn-dark react-router-link'}
                                to={`/show?model=${props.model}&topic=${props.topic}`}
                            >Show topic</Link>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className={'py-1 row align-items-center'}>
                    <TopicTermsCloud termDistributions={props.termDistributions}/>
                </CardBody>
            </Card>
        </Col>
    )
}

export default TopicTermsCard;
