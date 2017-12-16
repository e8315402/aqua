
const Constants = require('../constants');
const ObjectAssign = require('object-assign');

const initialState = {
    loading: false,
    error: undefined,
    data: []
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_RESULTS) {
        return ObjectAssign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.GET_RESULTS_RESPONSE) {
        return ObjectAssign({}, state, {
            loading: false,
            data: action.response
        });
    }

    return state;
};


module.exports = reducer;
