import React from 'react';
import Header from './Header';
import queryString from 'query-string'
import { Redirect } from 'react-router-dom';

class Table extends React.Component {
    render() {
        if (this.props.location.search) {
            const params = queryString.parse(this.props.location.search);
            if ('model' in params && 'topic' in params) {
                return (
                    <div></div>
                );
            }
        }
        return <Redirect to={'/'}/>;
    }
}

export default Table;