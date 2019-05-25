import React, { Component } from 'react';

import '../App.css';



class CaseItem extends Component {
    returnCategories() {
        let b = this.props.item.categories.reduce((arr, b) => [...arr, b, '+'], []);
        b.pop()
        return b;
    }
    render() {
        return (
            <div className="caseItemContainer">
                <div className="flowItemA">
                    <a href={this.props.item.link}>
                        <div className="flowItem">
                            {this.props.item.cover && <img className="flowImg" src={`/images/${this.props.item.cover}`} />}
                        </div>
                    </a>
                </div>
                <p className="caseTitle">{this.props.item.name}</p>
                <div style={{height: 16}} />
                <p className="normalText"><span className="titleText">{this.props.item.year}</span> / {this.props.item.description}</p>
                <div style={{height: 16}} />
                <div style={{width: '100%', textAlign: 'right'}}>
                    <a style={{textDecoration: 'none'}} className="titleText filterText" href={this.props.item.link}>View Case Study ></a>
                </div>
            </div>
        );
    }
}

export default CaseItem;
