import React, { Component } from 'react';
import * as actions from '../actions';

import { connect } from 'react-redux'

import CaseItem from './CaseItem';

import '../App.css';

import caseData from '../data/cases.json'

class CaseStudies extends Component {
    render() {
        return (
            <div className="cases">
                {caseData.map(caseItem => {
                    return <CaseItem item={caseItem} key={caseItem.name+caseItem.id}/>
                })}
            </div>
        );
    }
}

export default connect(null, actions)(CaseStudies);
