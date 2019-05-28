import React, { Component } from 'react';
import { connect } from 'react-redux'


import * as actions from '../actions';

import '../App.css';

class DynamicPage extends Component {
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
        }).catch(err => {
            console.log("Error Reading data " + err);
        });   
    }
    returnItem(item, key) {
        if (!item || !item.type)
            return
        switch(item.type) {
            case 'title':
                return <p key={key} className="dynamicTitleText">{item.content}</p>
            case 'spacing':
                return <div key={key} style={{height: 64}} />
            case 'spacingLarge':
                    return <div key={key} style={{height: 192}} />
            case 'imageFull':
                return <img key={key} src={this.state.prefix + `pages/${this.props.page}/${item.content}`} alt="" className="dynamicImageFull"/>
            case 'imageWide':
                return <img key={key} src={this.state.prefix + `pages/${this.props.page}/${item.content}`} alt="" className="dynamicImageGallery"/>
            case 'imageGallery':
                return (
                    item.content.map(image => {
                        return (
                            <div>
                                <img key={key+Math.random()} src={this.state.prefix + `pages/${this.props.page}/${image}`} alt="" className="dynamicImageGallery"/>
                                <div key={key+Math.random()} style={{height: 64}} />
                            </div>
                        )
                    })
                )
            case 'text':
                return <p key={key} className="normalText" style={item.bold ? {fontWeight: 600, marginBottom: 8} : {marginBottom: 8}}>{item.content}</p>
            case 'listNum':
                return (
                    <ol className="normalText">
                        {item.content.map(line => {
                            return <li key={key+Math.random()} style={{marginBottom: 8}}>{line}</li>
                        })}
                    </ol>
                )
            case 'listBullet':
                return (
                    <ul className="normalText">
                        {item.content.map(line => {
                            return <li key={key+Math.random()} style={{marginBottom: 8}}>{line}</li>
                        })}
                    </ul>
                )
            case 'heading':
                return <p key={key} id={item.content} className="dynamicHeadingText">{item.content}</p>
            case 'caption':
                return <p key={key} className="dynamicCaptionText">{item.content}</p>
            case 'video':
                return <video key={key} controls="controls" class='dynamicVideo' name={item.content} src={this.state.prefix + `pages/${this.props.page}/${item.content}`} />
            case 'caseProblemOutcome':
                return (
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style={{width: '45%'}}>
                            <p className="dynamicHeadingText">Problem</p>
                            <p key={key} className="normalText" style={item.bold ? {fontWeight: 600, marginBottom: 8} : {marginBottom: 8}}>{item.content[0]}</p>
                        </div>
                        <div style={{width: '45%'}}>
                            <p className="dynamicHeadingText">Outcome</p>
                            <p key={key} className="normalText" style={item.bold ? {fontWeight: 600, marginBottom: 8} : {marginBottom: 8}}>{item.content[1]}</p>
                        </div>
                    </div>
                )
            default:
                return <p key={key}/>;
        }
    }
    render() {
        return (
            <div className="dynamicPage">
                {this.state.pageData && this.state.pageData.map(item => {
                    return this.returnItem(item, Math.random())
                })}
            </div>
        );
    }
}

export default connect(null, actions)(DynamicPage);
