const Redux = require('redux');
const Results = require('./reducers/results');
const Local = require('./reducers/local');

module.exports = Redux.createStore(
  Redux.combineReducers({
    results: Results,
    local: Local
  })
);
