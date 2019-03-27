import { combineReducers } from 'redux';

import FlowReducer from './FlowReducer';

export default combineReducers({
    flowData: FlowReducer
});