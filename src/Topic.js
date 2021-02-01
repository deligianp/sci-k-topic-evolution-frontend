import React from 'react';
import queryString from 'query-string'
import {Redirect} from 'react-router-dom';
import {Container, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import API from './api'
import TopicTable from "./TopicTable";
import './Topic.css'
import TopicVisualizations from "./TopicVisualizations";

class Topic extends React.Component {
    modelName = '';
    topic = '';

    state = {
        activeTab: '',
        topicTerms: []
    }

    getTopicTerms() {
        API.get("model-topics", {
            params: {
                'name': this.modelName,
                'topic': this.topic
            }
        }).then(response => {
            this.setState({
                topicTerms: response.data.topics[this.topic],
                activeTab: 'topic-terms-table'
            });
        })
    }

    componentDidMount() {
        this.getTopicTerms();
    }

    render() {
        if (this.props.location.search) {
            const params = queryString.parse(this.props.location.search);
            this.modelName = params.model;
            this.topic = params.topic;
            if ('model' in params && 'topic' in params) {
                return (
                    <Container>
                        {this.state.topicTerms &&
                        <div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={''+this.state.activeTab==='topic-terms-table'?'active':''}
                                        onClick={() => {
                                            this.setState({activeTab: 'topic-terms-table'})
                                        }}
                                    >Top-50 Terms Table
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={''+this.state.activeTab==='topic-visualizations'?'active':''}
                                        onClick={() => {
                                            this.setState({activeTab: 'topic-visualizations'})
                                        }}
                                    >Visualizations
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent className={'mt-4'} activeTab={this.state.activeTab}>
                                <TabPane tabId="topic-terms-table">
                                    <TopicTable topicTerms={this.state.topicTerms}/>
                                </TabPane>
                                <TabPane tabId="topic-visualizations">
                                    <TopicVisualizations
                                        topicTerms={this.state.topicTerms}
                                        modelName={this.modelName}
                                        topic={this.topic}/>
                                </TabPane>
                            </TabContent>
                        </div>
                        }
                    </Container>
                );
            }
        }
        return <Redirect to={'/'}/>;
    }
}

export default Topic;