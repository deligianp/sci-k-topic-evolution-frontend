import React from "react";
import {Col, Row, Spinner} from "reactstrap";

const InformativeLoadingSpinner = props => {
    return (
        props.active
            ? <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} className={'text-center'}>
                            <Spinner color={props.color || 'primary'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className={'text-center'+props.color?' text-'+props.color:''}>
                            {props.message}
                        </Col>
                    </Row>
                </Col>
            </Row>
            : <></>
    )
}

export default InformativeLoadingSpinner;