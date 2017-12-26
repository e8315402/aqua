import ApiActions from 'actions/api';
import Constants from './constants';
import Store from './store';
import Cookie from 'cookie';

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
    };
    ApiActions.post(
      '/api/homeworks/mark',
      content,
      Store,
      Constants.MARK,
      Constants.MARK_RESPONSE
    );
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
}


module.exports = Actions;
