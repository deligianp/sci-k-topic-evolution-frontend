import React from "react";
import {Card, CardHeader, Button, CardBody, Row, Col} from "reactstrap";
import TopicTermsCloud from "./TopicTermsCloud";
import {Link} from "react-router-dom";

const TopicTermsCard = (props) => {

    return (
        <Col xs={12} sm={6} md={4} className={'py-2'} style={{height: "400px"}}>
            <Card style={{height: "100%"}}>
                <CardHeader>
                    <Row className={'justify-content-between'}>
                        <h3>{`Topic ${props.topic}`}</h3>
                        <Link
                            className={'btn btn-dark react-router-link'}
                            to={`/show?model=${props.model}&topic=${props.topic}`}
                        >Show topic</Link>
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