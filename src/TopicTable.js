import React from "react";
import {Row, Col, Table} from 'reactstrap';

const TopicTable = props => {

    const topicTermRows = props.topicTerms.map((term, index) => {
        return (
            <tr>
                <th scope={'row'}>{index + 1}</th>
                <td>{term.term}</td>
                <td>{term.value}</td>
            </tr>
        )
    })

    return (
        <Row>
            <Col xs={'12'}>
                <Row>
                    <Col xs={'12'}>
                        <h3>Top 50 terms of topic</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={'12'}>
                        <Table size={'sm'} hover={'true'}>
                            <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Term</th>
                                <th>Probability</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topicTermRows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default TopicTable;