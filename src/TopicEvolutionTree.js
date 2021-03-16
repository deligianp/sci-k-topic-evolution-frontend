import React from 'react';
import {Spinner} from "reactstrap";
import {withResizeDetector} from 'react-resize-detector';
import {TwoLevelTree} from './twoleveltree';
import _ from 'lodash';
import API from './api';

class TopicEvolutionTree extends React.Component {
    twoLevelTree = null
    state = {
        dataLoading: false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!(_.isEqual(this.props.data, prevProps.data))) {
            this.twoLevelTree.updateData(this.props.data);
        } else if (this.props.width !== prevProps.width) {
            this.twoLevelTree.visualize();
        }
    }

    componentDidMount() {
        this.twoLevelTree = new TwoLevelTree('svg-parent');
        this.twoLevelTree.updateData(this.props.data);
        this.twoLevelTree.linkLabel = link => "Jaccard score: " + Number.parseFloat(link.label).toFixed(2);
        this.twoLevelTree.nodeLabel = node => {
            const topicPhrase = node.name.split("-").join(" ");
            return topicPhrase[0].toUpperCase() + topicPhrase.substr(1, topicPhrase.length - 1);
        }
        this.twoLevelTree.nodeText = node => {
            if (node.hasOwnProperty("_topic_text")) {
                return node._topic_text;
            } else {
                API.get("model-topics", {
                    params: {
                        name: node.modelName,
                        topic: node.topic
                    }
                }).then(response => {
                        const topTerms = response.data.topics[node.topic].slice(0, 10).map(termDistribution => termDistribution.term);
                        const text = topTerms.join("<br>");
                        node._topic_text = text;
                        this.twoLevelTree.visualize()
                    }
                );
                return "Loading...";
            }
        }
        this.twoLevelTree.nodeTooltipHeading = node => {
            const tooltipLink = document.createElement('a')
            tooltipLink.href = `/show?model=${node.modelName}&topic=${node.topic}`;
            tooltipLink.innerText = this.twoLevelTree.nodeLabel(node);
            tooltipLink.target = '_blank';
            tooltipLink.classList = ['text-white']
            tooltipLink.className = 'text-white';
            return tooltipLink;
        }
    }

    render() {
        return (
            <div id={'svg-parent'} ref={this.svgParentReference}>
            </div>
        )
    }
}

const ResponsiveTopicEvolutionTree = withResizeDetector(TopicEvolutionTree);

export default ResponsiveTopicEvolutionTree;