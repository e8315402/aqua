import ApiActions from 'actions/api';
import Constants from './constants';
import Store from './store';
import JsonFetch from '../../../../helpers/json-fetch';

const JsonFetchP = (_request) => {
  return new Promise((resolve, reject) => {
    JsonFetch(_request, (err, response) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(response);
      }
    });
  });
};

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
          Store.dispatch(this.updateAssignmentsTable(Store.getState().local.query));
        }
      }
    );
  }

  static getHomeworks(query) {
    return (dispatch, getState) => {

      const request = { method: 'GET', url: '/api/homeworks', query };
      dispatch({
        type: Constants.GET_RESULTS,
        request
      });

      return JsonFetchP(request).then((response) =>
        dispatch({
          type: Constants.GET_HOMEWORKS_RESULTS_RESPONSE,
          err: null,
          response
        })
      ).catch((err) =>
        dispatch({
          type: Constants.GET_HOMEWORKS_RESULTS_RESPONSE,
          err
        })
      );
    };
  }

  static getAssignments(query) {
    return (dispatch) => {

      const request = { method: 'GET', url: '/api/assignments', query };
      dispatch({
        type: Constants.GET_RESULTS,
        request
      });

      return JsonFetchP(request).then((response) =>
        dispatch({
          type: Constants.GET_ASSIGNMENTS_RESULTS_RESPONSE,
          err: null,
          response
        })
      ).catch((err) =>
        dispatch({
          type: Constants.GET_ASSIGNMENTS_RESULTS_RESPONSE,
          err
        })
      );
    };
  }

  static mergeResults() {
    return (dispatch) => dispatch({ type: Constants.MERGE_RESULTS });
  }

  static updateAssignmentsTable(query) {
    return (dispatch, getState) => {
      return dispatch(Actions.getHomeworks(query))
        .then(() => dispatch(Actions.getAssignments(query)))
        .then(() => dispatch(Actions.mergeResults()));
    };
  }

  static saveQuery(query) {
    return (dispatch) => dispatch({ type: Constants.STORE_LOCAL_QUERY, query });
  }
}


module.exports = Actions;
