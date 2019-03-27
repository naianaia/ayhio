import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';

import '../App.css';
import Selection from './Selection'

const filters = ["art", "code", "design", "film", "photography", "product", "research", "travel"];

class TitleBar extends Component {
    render() {
        return (
            <div className="titleBar">
                <div>
                    <p className="titleText">
                        <a style={{textDecoration: 'none'}} className="titleText filterText" href="http://ayh.io">austin y hou</a> /
                    </p>
                    {this.props.showFilter && 
                        <p className="titleText">
                            <Selection filters={["design"]} text="designer" />
                            &nbsp;+&nbsp;
                            <Selection filters={["code"]} text="engineer" />
                            &nbsp;+&nbsp;
                            <Selection filters={["art", "photography"]} text="artist" />
                        </p>
                    }
                </div>
                {this.props.showFilter && 
                    <div className="filterMenu">
                        <p className="titleText">all filters:</p>

                        <p className="titleText">/&nbsp;
                            {
                                filters.map(filter => {
                                    return (<span key={filter}><Selection filters={[filter]} text={filter} />&nbsp;/&nbsp;</span>)
                                })
                            }
                        </p>
                    </div>
                }
                
            </div>
        );
    }
}

export default connect(null, actions)(TitleBar);
