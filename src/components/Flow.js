import React, { Component } from 'react';
import * as actions from '../actions';

import { connect } from 'react-redux'

import '../App.css';

import FlowItem from './FlowItem';

class Flow extends Component {
    render() {
        return (
            <div className="flow">
                {this.props.flowData.data.map(flowItem => {
                    return <FlowItem item={flowItem} key={flowItem.name+flowItem.id}/>
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        flowData: state.flowData,
    }
}
export default connect(mapStateToProps, actions)(Flow);
