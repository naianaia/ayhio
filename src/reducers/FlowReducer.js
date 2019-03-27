import flowData from '../data/flow.json';

function fillData(flowData) {
    while (flowData.length % 3 !== 0) {
        flowData = [...flowData, {"name": "test","id": Math.random()}];
    }
    return flowData;
}

const INITIAL_STATE = {
    "filter": null,
    "tag": null,
    "data": fillData(flowData)
};

var d = new Date();

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_data':
            var newState = INITIAL_STATE;
            newState.data = fillData(newState.data);
            return newState;
        case 'filter_data':
            
            var newState = flowData.filter((item) => {
                return (item.categories && action.payload.filters.some(el => item.categories.includes(el)))
            });
            newState = fillData(newState);

            return {
                "filter": action.payload.filters,
                "tag": action.payload.tag,
                "data": newState
            };
        default:
            return state;
    }
};