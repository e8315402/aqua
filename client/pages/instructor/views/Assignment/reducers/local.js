
const Constants = require('../constants');
const ObjectAssign = require('object-assign');

const initialState = {
  query: {}
};
const reducer = function (state = initialState, action) {

  if (action.type === Constants.STORE_LOCAL_QUERY) {
    return ObjectAssign({}, state, {
      query: action.query
    });
  }

  return state;
};


module.exports = reducer;
