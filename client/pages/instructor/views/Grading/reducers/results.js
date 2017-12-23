
const Constants = require('../constants');
const ObjectAssign = require('object-assign');
const Async = require('async');
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
  if (action.type === Constants.MARK_RESPONSE){
    window.location.href = '/instructor#/assignments?courseName=' + action.response[0].courseName;
  }

  return state;
};


module.exports = reducer;
