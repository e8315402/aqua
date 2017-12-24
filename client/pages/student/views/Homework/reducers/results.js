
const Constants = require('../constants');
const ObjectAssign = require('object-assign');

const initialState = {
  loading: false,
  error: undefined,
  homeworks: undefined,
  assignments: undefined,
  homeworkTable: undefined
};
const reducer = function (state = initialState, action) {

  if (action.type === Constants.GET_RESULTS) {
    return ObjectAssign({}, state, {
      loading: true
    });
  }

  if (action.type === Constants.GET_ASSIGNMENTS_RESULTS_RESPONSE) {
    return ObjectAssign({}, state, {
      assignments: action.response
    });
  }

  if (action.type === Constants.GET_HOMEWORKS_RESULTS_RESPONSE) {
    return ObjectAssign({}, state, {
      homeworks: action.response
    });
  }

  if (action.type === Constants.MERGE_RESULTS) {
    const table = {
      Headers: ['#','Assignment','Due Date','Status','Score','File']
    };

    table.Rows = state.assignments.map((each) => (
      {
        'Assignment': each.assignmentName,
        'Due Date':  each.deadline,
        'isExpired': new Date(each.deadline) < new Date()
      }
    )).sort((a, b) => (new Date(a['Due Date']) - new Date(b['Due Date'])));

    const homeworkMapping = {};
    state.homeworks.forEach((each) => (homeworkMapping[each.assignmentName] = each));

    table.Rows.forEach((each, index) => {
      table.Rows[index]['#'] = (index + 1);
      table.Rows[index].Status = (homeworkMapping[each.Assignment]) ? 'v' : 'x';
      table.Rows[index].Status += (each.isExpired) ?  '' : '-sub';
      if (homeworkMapping[each.Assignment]) {
        if (homeworkMapping[each.Assignment].score) {
          table.Rows[index].Score = homeworkMapping[each.Assignment].score;
        }
        else {
          table.Rows[index].Score = '-';
        }
        table.Rows[index].File = homeworkMapping[each.Assignment].filePath;
      }
      else {
        table.Rows[index].Score = '-';
        table.Rows[index].File = '-';
      }
    });

    return ObjectAssign({}, state, {
      loading: false,
      homeworkTable: table
    });
  }

  return state;
};


module.exports = reducer;
