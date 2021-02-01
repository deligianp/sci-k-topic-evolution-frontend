import React, {useEffect, useState, useRef} from "react";
import {Line} from 'react-chartjs-2';
import {Row, Col} from 'reactstrap';
import TopicTermsCloud from "./TopicTermsCloud";
import {TwoLevelTree} from "./twoleveltree";
import {useResizeDetector} from 'react-resize-detector';
import TopicEvolutionTree from "./TopicEvolutionTree";
import ResponsiveTopicEvolutionTree from "./TopicEvolutionTree";
import API from './api'

const TopicVisualizations = props => {
    const terms = [];
    const probabilities = [];
    const [evolutionData, setEvolutionData] = useState(null)
    const [evolutionHeaders, setEvolutionHeaders] = useState(["", ""])
    const [loading, setLoading] = useState(false);
    // console.log(props.topicTerms);
    props.topicTerms.forEach(topicTerm => {
        const term = topicTerm.term;
        const probability = topicTerm.value;
        terms.push(term)
        probabilities.push(probability);
    });
    useEffect(() => {
        API.get("topic-evolution", {
            params: {
                name: props.modelName,
                topic: props.topic
            }
        }).then(response => {
            console.log("Response of topic-evo call: ");
            console.log(response.data);
            setEvolutionHeaders([response.data.model0_description, response.data.model1_description]);
            setEvolutionData(response.data.parents);
            setLoading(false);
        });
        setLoading(true);
    }, [false])

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
                    {
                        loading ? 'Loading...' :
                            (evolutionData && evolutionData.length === 0) ? 'No evolution could be inferred for this value' :
                                <div>
                                    <Row>
                                        <Col xs={12} className={'my-3 text-center'}>
                                            <h3>Topic evolution tree</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} className={'text-center'}><h4>{evolutionHeaders[0]}</h4></Col>
                                        <Col xs={6} className={'text-center'}><h4>{evolutionHeaders[1]}</h4></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <ResponsiveTopicEvolutionTree data={evolutionData}/>
                                        </Col>
                                    </Row>
                                </div>
                    }
                </Col>
            </Row>
        </div>
    );
}

export default TopicVisualizations;