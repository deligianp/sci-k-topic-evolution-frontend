import React from "react";
import Header from "./Header";
import {Button, Col, Container, Form, FormGroup, Input, Row, Spinner, InputGroup, InputGroupAddon} from "reactstrap";
import API from './api';
import {Pie} from "react-chartjs-2";

class TextAnalysis extends React.Component {

    state = {
        text: "",
        editable: true,
        loading: false,
        topics: null,
        models: [],
        selectedModel: null
    }

    handleTextChange(text) {
        this.setState({
            text: text.target.value
        })
    }

    handleAnalysisRequest() {
        this.setState({
            loading: true
        }, () => {
            API.post('analyze-text', {
                text: this.state.text,
                model_name: this.state.selectedModel
            })
                .then(response => {
                    const topics = [[], []]
                    response.data.forEach(topic => {
                        topics[0].push(topic[0])
                        topics[1].push(Number.parseFloat((topic[1] * 100).toFixed(2)))
                    })
                    this.setState({
                        loading: false,
                        topics: topics
                    })
                })
                .catch()
        })

    }

    componentDidMount() {
        API.get('models')
            .then(response => {
                if (response.data) {
                    this.setState({
                        models: response.data,
                        selectedModel: response.data[0].name
                    });
                } else {
                    this.setState({
                        models: [],
                        selectedModel: null
                    })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    handleSelection(e) {
        this.setState({
            selectedModel: e.target.value
        });
    }

    render() {
        const models = this.state.models.map(model => <option value={model.name}>{model.description}</option>);
        return (
            <div>
                <Header/>
                <Container>
                    <Form>
                        <FormGroup>
                            <Input enabled={this.state.editable} type={'textarea'}
                                   onChange={this.handleTextChange.bind(this)} rows={10}/>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button color={'dark'} onClick={this.handleAnalysisRequest.bind(this)}>
                                        Analyze topics with
                                    </Button>
                                </InputGroupAddon>
                                {models &&
                                <Input type={'select'} onChange={this.handleSelection.bind(this)}>
                                    {models}
                                </Input>
                                }
                            </InputGroup>

                        </FormGroup>
                    </Form>
                    <div>
                        {this.state.loading &&
                        <Row style={{height: "400px"}} className={'mt-6 justify-content-center align-items-center'}>
                            <Spinner style={{width: '5rem', height: '5rem'}}/>
                        </Row>
                        }
                        {!this.state.loading && this.state.topics &&
                        <Row className={'justify-content-center'}>
                            <Col xs={12} sm={10} md={8}>
                                <Pie
                                    data={{
                                        datasets: [{
                                            data: this.state.topics[1].concat([Number.parseFloat((100 - this.state.topics[1].reduce((a, b) => a + b, 0)).toFixed(2))]),
                                            backgroundColor: this.state.topics[1].map((topic, idx) => {
                                                return ["#007bff", "#4da3ff", "#99caff"][idx]
                                            }).concat(["#AAA"])
                                        }],

                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                        labels: this.state.topics[0].map(topic => `Topic ${topic}`).concat(['Rest of the topics'])
                                    }}

                                    options={{
                                        legend: {
                                            position: 'right'
                                        },
                                        tooltips: {
                                            enabled: true,
                                            mode: 'single',
                                            callbacks: {
                                                label: function (tooltipItem, data) {
                                                    var index = tooltipItem.index;
                                                    return data.labels[index] + ': ' + data.datasets[0].data[index] + "%";
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default TextAnalysis;