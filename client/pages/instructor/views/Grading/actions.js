import ApiActions from 'actions/api';
import Constants from './constants';
import Store from './store';

class Actions {
  static getResults(query) {

    ApiActions.get(
      '/api/homeworks',
      query,
      Store,
      Constants.GET_RESULTS,
      Constants.GET_RESULTS_RESPONSE
    );
  }
  static mark(assignmentInfo,scoreTable){
    const content = {
      assignmentInfo,
      scoreTable
    }
    ApiActions.post(
      '/api/homeworks/mark',
      content,
      Store,
      Constants.MARK,
      Constants.MARK_RESPONSE
    );
  }
}


module.exports = Actions;
