import React from "react";
import {Line} from 'react-chartjs-2';
import {Row, Col} from 'reactstrap';
import Canvas from 'react-responsive-canvas'
import TopicTermsCloud from "./TopicTermsCloud";

const TopicVisualizations = props => {
    const terms = [];
    const probabilities = [];
    console.log(props.topicTerms);
    props.topicTerms.forEach(topicTerm => {
        const term = topicTerm.term;
        const probability = topicTerm.value;
        terms.push(term)
        probabilities.push(probability);
    })
    return (
        <div>
            <Row className={'align-items-stretch'}>
                <Col xs={12} md={6}>
                    <Row>
                        <Col xs={12}>
                            <h3>Top-50 terms probability decrease</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Line
                                data={{
                                    labels: terms,
                                    datasets: [
                                        {
                                            backgroundColor: 'rgba(77,163,255,0.5)',
                                            borderColor: 'rgb(0,123,255,1)',
                                            data: probabilities
                                        }
                                    ]
                                }}
                                legend={{display: false}}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6}>
                    <Row>
                        <Col xs={12}>
                            <h3>Term cloud</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TopicTermsCloud termDistributions={props.topicTerms.map(topicTerm => {
                                return {value: topicTerm.term, count: topicTerm.value}
                            })}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={'justify-content-center'}>
                <Col xs={'12'}>
                    Topic evolution tree to be added
                </Col>
            </Row>
        </div>
    );
}

export default TopicVisualizations;