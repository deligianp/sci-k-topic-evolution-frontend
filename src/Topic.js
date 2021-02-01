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
                            <TopicVisualizations
                                topicTerms={this.state.topicTerms}
                                modelName={this.modelName}
                                topic={this.topic}/>
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