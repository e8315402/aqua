import ApiActions from 'actions/api';
import Constants from './constants';
import Store from './store';
import Async from 'async';

class Actions {

  static createAssignment(query) {
    ApiActions.post(
      '/api/assignments',
      query,
      Store,
      Constants.CREATE_NEW,
      Constants.CREATE_NEW_RESPONSE,
      (err, response) => {
        if (!err) {
          Actions.updateAssignmentsTable(Store.getState().local.query);
        }
      }
    );
  }

  static updateAssignmentsTable(query) {
    Async.applyEachSeries([Actions.getHomeworks, Actions.getAssignments, Actions.mergeResults], query, () => {});
  }

  static getHomeworks(query, callback) {
    ApiActions.get(
      '/api/homeworks',
      query,
      Store,
      Constants.GET_RESULTS,
      Constants.GET_HOMEWORKS_RESULTS_RESPONSE,
      callback
    );
  }

  static getAssignments(query, callback) {
    ApiActions.get(
      '/api/assignments',
      query,
      Store,
      Constants.GET_RESULTS,
      Constants.GET_ASSIGNMENTS_RESULTS_RESPONSE,
      callback
    );
  }

  static mergeResults() {
    Store.dispatch({ type: Constants.MERGE_RESULTS });
  }

  static saveQuery(query) {
    Store.dispatch({ type: Constants.STORE_LOCAL_QUERY, query });
  }

}


module.exports = Actions;
