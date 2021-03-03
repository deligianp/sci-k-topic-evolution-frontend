import API from './api';
import TopicTermsCard from "./TopicTermsCard";
import {Col, Container, Row, Spinner} from "reactstrap";
import TopicModelForm from "./TopicModelForm";
import React from "react";
import ModalOverlay from "./ModalOverlay";
import InformativeLoadingSpinner from "./InformativeLoadingSpinner";

class Home extends React.Component {
    state = {
        selectedModel: null,
        models: [],
        modelTopics: [],
        loadingTopics: false
    };
    modelSelectionIdx=0;

    loadModels() {
        API.get('models')
            .then(response => {
                if (response.data) {
                    this.setState({
                        models: response.data,
                        selectedModel: response.data[0].name,
                        modelTopics: []
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
            });
    }

    loadSelectedModelTopics(offset = 0) {
        const queriedModel = this.state.selectedModel;
        const limit = 50;
        const modelSelectionIdx=this.modelSelectionIdx;
        API.get('model-topics', {
            params: {
                name: queriedModel,
                offset,
                limit
            }
        })
            .then(response => {
                const topics = response.data.topics;
                const nextOffset = response.data.meta.offset + response.data.meta.limit;
                // if (model )
                if (this.modelSelectionIdx === modelSelectionIdx) {
                    this.setState({
                        modelTopics: [...this.state.modelTopics].concat(Object.keys(topics).map(
                            topicIdx => <TopicTermsCard
                                model={queriedModel}
                                topic={topicIdx}
                                termDistributions={topics[topicIdx].map((ttd, idx) => {
                                    return {value: ttd.term, count: ttd.value, key: 'key-' + idx}
                                })}
                            />
                        ))
                    }, () => {
                        this.loadSelectedModelTopics(nextOffset)
                    });
                }
            })
            .catch(error => {
                this.setState({
                    loadingTopics: false
                })
            });
        this.setState({
            loadingTopics: true
        })
    }

    componentDidMount() {
        this.loadModels();
    }

    handleSelection(selection) {
        const selectedModelName = selection.target.value;
        if (this.state.selectedModel !== selectedModelName) {
            this.modelSelectionIdx++;
            this.setState({
                selectedModel: selectedModelName,
                modelTopics: []
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
                    <ModalOverlay active={this.state.loadingTopics && this.state.modelTopics.length === 0}>
                        <InformativeLoadingSpinner active={true} color={'light'} message={'Loading topics'}/>
                    </ModalOverlay>
                    {this.state.modelTopics}

                </Row>
                {this.state.modelTopics.length > 0 && this.state.loadingTopics &&
                    <Row>
                        <Col className={'text-center'}>
                            <InformativeLoadingSpinner active={true} color={'dark'} message={'Loading topics'}/>
                        </Col>
                    </Row>
                }
            </Container>
        );
    }

}

export default Home;
