import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../App.css';
import Selection from './Selection'

const filters = ["art", "code", "design", "film", "photography", "product", "research", "travel"];

class TitleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilters: false,
            pageData: null,
            pageTitle: null
        }
    }
    componentWillMount() {
        if (this.props.showTitle) {
            var directory = `pages/${this.props.page}/data.json`;
            var prefix = '../../'
        
            fetch(prefix + directory).then(response => {
                return response.json();
            }).then(data => {
                this.setState({pageData: data, pageTitle: data && data[0].content})
            }).catch(err => {
                console.log("no page data.json");
            });   
        }
    }
    toggleFilters() {
        this.setState({ showFilters: !this.state.showFilters })
    }
    render() {
        return (
            <div className="titleBar">
                <div>
                    <p className="titleText">
                        <a style={{textDecoration: 'none'}} className="titleText filterText" href="http://ayh.io">austin y hou</a> /
                    </p>
                    {this.props.showCases &&
                        <p className="titleText">case studies</p>
                    }
                    {this.props.showTitle && 
                        <p className="titleText">{this.state.pageTitle}</p>
                    }
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
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            {false && 
                                <p className="titleText">
                                    <a className="filterText filterNormal" href="portfolio">view portfolio</a>&nbsp;/&nbsp;
                                </p>
                            }
                            <p className="titleText filterText filterNormal" onClick={this.toggleFilters.bind(this)}>filter {
                                this.state.showFilters ? <span style={{fontSize: 12}}>▲</span> : <span style={{fontSize: 12}}>▼</span>
                            }</p>
                        </div>
                        {this.state.showFilters && 
                            <p className="titleText">/&nbsp;
                                { 
                                    filters.map(filter => {
                                        return (<span key={filter}><Selection filters={[filter]} text={filter} />&nbsp;/&nbsp;</span>)
                                    })
                                }
                            </p>
                        }
                    </div>
                }
                
            </div>
        );
    }
}

export default connect(null, actions)(TitleBar);
