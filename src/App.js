import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactGA from 'react-ga';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'

import TitleBar from './components/TitleBar'
import Flow from './components/Flow';

import logo from './logo.svg';
import './App.css';
import DynamicPage from './components/DynamicPage';
import CaseStudies from './components/CaseStudies';

function initializeReactGA() {
    ReactGA.initialize('UA-137107594-1');
    ReactGA.pageview('/home');
}

function configureStore(initialState) {
    const store = createStore(reducers, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const store = configureStore({});

class App extends Component {
    constructor () {
        super()
    }
    
    componentWillMount() {
        document.title = 'austin y hou'
        initializeReactGA();
    }
    render() {
        return (
            <div>
                <Provider store={store}>
                    <div style={{width: '100%', position: 'relative'}}>
                        <Router>
                            <Route exact path="/portfolio" render={(props)=>{
                                return <TitleBar showFilter={false} showCases={true}/>
                            }} />
                            <Route path="/:page" render={(props)=>{
                                return <TitleBar showFilter={false}/>
                            }}/>
                            <Route exact path="/" render={(props)=>{
                                return <TitleBar showFilter={true}/>
                            }}/>
                            
                        </Router>
                        <Router>
                            <Route exact path="/gallery/:page" render={(props)=>{
                                return <DynamicPage gallery={true} page={"photography/" + props.match.params.page}/>
                            }}/>
                            <Route exact path="/portfolio" component={CaseStudies} />
                            <Route exact path="/:page" render={(props)=>{
                                return <DynamicPage page={props.match.params.page}/>
                            }}/>
                            <Route exact path="/" component={Flow} />
                        </Router>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
