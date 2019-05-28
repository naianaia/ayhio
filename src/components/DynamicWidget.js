import React, { Component } from 'react';
import { connect } from 'react-redux'


import * as actions from '../actions';

import '../App.css';

class DynamicWidget extends Component {
    constructor(props) {
        super(props);
        this.state = { pageData: undefined, prefix: './' } ;
    }
    componentWillMount() {
        var directory = `pages/${this.props.page}/data.json`;
        var prefix = '../../'
        if (this.props.gallery)
            this.setState({ prefix: prefix});
    
        fetch(prefix + directory).then(response => {
            return response.json();
        }).then(data => {
            this.setState({pageData: data})
            console.log(data)
        }).catch(err => {
            console.log("Error Reading data " + err);
        });   
    }
    returnItem(item, key) {
        if (!item || !item.type)
            return
        switch(item.type) {
            case 'heading':
                return <p><a style={{textDecoration: 'none'}} href={`#${item.content}`} className="titleText filterText">{item.content}</a></p>
            default:
                return;
        }
    }
    render() {
        return (
            <div className="dynamicWidget">
                {this.state.pageData && this.state.pageData[0].portfolio && <p className="normalText">____</p>}
                {this.state.pageData && this.state.pageData.map(item => {
                    return this.returnItem(item, Math.random())
                })}
            </div>
        );
    }
}

export default connect(null, actions)(DynamicWidget);
