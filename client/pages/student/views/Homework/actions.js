import ApiActions from 'actions/api';
import Constants from './constants';
import Store from './store';
import Async from 'async';
import Cookie from 'cookie';

class Actions {

  static getHomeworks(query, callback) {
    ApiActions.get(
      'api/homeworks',
      query,
      Store,
      Constants.GET_RESULTS,
      Constants.GET_HOMEWORKS_RESULTS_RESPONSE,
      callback
    );
  }

  static getAssignments(query, callback) {
    ApiActions.get(
      'api/assignments',
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

  static updateHomeworksTable(query) {
    Async.applyEachSeries([Actions.getHomeworks, Actions.getAssignments, Actions.mergeResults], query, () => {});
  }

  static downloadFile(filePath) {
    const query = { filePath };
    const cookies = Cookie.parse(document.cookie);
    const oReq = new XMLHttpRequest();
    oReq.open('GET', '/api/files?' + require('qs').stringify(query));
    oReq.setRequestHeader('X-CSRF-Token', cookies.crumb);
    oReq.responseType = 'blob';

    oReq.onreadystatechange = function () {
      if (oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
        const downloadEle = document.createElement('a');
        downloadEle.href = window.URL.createObjectURL(oReq.response); // xhr.response is a blob
        downloadEle.download = filePath.split('\\').pop();
        // a.style.display = 'none';
        // document.body.appendChild(a);
        downloadEle.click();
      }
    };

    oReq.send();
  }

  static saveQuery(query) {
    Store.dispatch({ type: Constants.STORE_LOCAL_QUERY, query });
  }
}


module.exports = Actions;
