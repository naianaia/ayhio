import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';

import '../App.css';

class Selection extends Component {

    toggleFilter() {
        if (this.props.selected === this.props.text)
            this.props.filterClear()
        else
            this.props.filterFlow(this.props.filters, this.props.text)
    }

    render() {
        return (
            <span 
                className={
                    (this.props.selected === this.props.text) ? "filterText filterSelected" : "filterText filterNormal"
                } 
                onClick={this.toggleFilter.bind(this)}
            >
                {this.props.text}
            </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        selected: state.flowData.tag,
    }
}

export default connect(mapStateToProps, actions)(Selection);
