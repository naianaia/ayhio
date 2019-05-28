import React, { Component } from 'react';

import '../App.css';



class FlowItem extends Component {
    returnCategories() {
        let b = this.props.item.categories.reduce((arr, b) => [...arr, b, '+'], []);
        b.pop()
        return b;
    }
    render() {
        return (
            <div className="flowItemContainer">
                <div className="flowItemA">
                    <div className="flowItem">
                        {this.props.item.cover && <img className="flowImg" src={`/images/${this.props.item.cover}`} />}
                    </div>
                    {this.props.item.name !== "test" && 
                        <a href={this.props.item.link}>
                            <div className="flowItemOverlay">
                                <p className="titleText">{this.props.item.name}</p>
                                <p className="normalText">{this.props.item.byline}</p>
                                <div style={{display: "flex", flexDirection: 'row'}}>
                                    <p className="lightText">
                                    {this.props.item.categories && this.returnCategories().map( category => {
                                        return <span key={category+Math.random()}>{category}</span>
                                    })}
                                    </p>
                                </div>
                            </div>
                        </a>
                    }
                </div>
                {this.props.item.name !== "test" && 
                    <div className="flowMobile">
                        <p className="titleText">{this.props.item.name}</p>
                        <p className="normalText">{this.props.item.byline}</p>
                    </div>
                }
            </div>
        );
    }
}

export default FlowItem;
