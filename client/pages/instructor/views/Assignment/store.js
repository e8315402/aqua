const Redux = require('redux');
const Results = require('./reducers/results');
const Local = require('./reducers/local');
const Thunk = require('redux-thunk').default;
module.exports = Redux.createStore(
  Redux.combineReducers({
    results: Results,
    local: Local
  }),
  Redux.applyMiddleware(Thunk)
);
