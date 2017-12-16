import ApiActions from 'actions/api';
import Constants from './constants';
import Store from './store';
// import Qs from 'qs';

class Actions {
    static getResults() {

        ApiActions.get(
            '/api/courses',
            null,
            Store,
            Constants.GET_RESULTS,
            Constants.GET_RESULTS_RESPONSE
        );
    }
}


module.exports = Actions;
