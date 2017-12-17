const Redux = require('redux');
const Results = require('./reducers/results');
const Thunk = require('redux-thunk').default;
module.exports = Redux.createStore(
    Redux.combineReducers({
        results: Results
    }),
    Redux.applyMiddleware(Thunk)
);
