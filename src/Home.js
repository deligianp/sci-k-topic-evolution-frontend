import API from './api';
import TopicTermsCard from "./TopicTermsCard";
import Header from "./Header";
import {Container, Row} from "reactstrap";
import TopicModelForm from "./TopicModelForm";
import React from "react";

class Home extends React.Component {
    state = {
        selectedModel: null,
        models: [],
        modelTopics: []
    }

    loadModels() {
        API.get('models')
            .then(response => {
                if (response.data) {
                    this.setState({
                        models: response.data,
                        selectedModel: response.data[0].name
                    }, this.loadSelectedModelTopics.bind(this));
                } else {
                    this.setState({
                        models: []
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

    loadSelectedModelTopics() {
        const queriedModel = this.state.selectedModel;
        API.get('model-topics', {
            params: {
                name: queriedModel
            }
        })
            .then(response => {
                const topics = response.data.topics;
                this.setState({
                    modelTopics: Object.keys(topics).map(
                        topicIdx => <TopicTermsCard
                            model={queriedModel}
                            topic={topicIdx}
                            termDistributions={topics[topicIdx].map((ttd, idx) => {
                                return {value: ttd.term, count: ttd.value, key: 'key-' + idx}
                            })}
                        />
                    )
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    componentDidMount() {
        this.loadModels();
    }

    handleSelection(selection) {
        const selectedModelName = selection.target.value;
        if (this.state.selectedModel !== selectedModelName) {
            this.setState({
                selectedModel: selectedModelName
            }, this.loadSelectedModelTopics);
        }
    }

    render() {
        return (
            <Container fluid={true}>
                <Row className={'mb-2 justify-content-center'}>
                    {this.state.models &&
                    <TopicModelForm
                        models={this.state.models}
                        current={this.state.selectedModel}
                        handleSelection={this.handleSelection.bind(this)}/>
                    }
                </Row>
                <hr className={'mb-5'}/>
                <Row>
                    {this.state.modelTopics}
                </Row>
            </Container>
        );
    }
}

export default Home;
