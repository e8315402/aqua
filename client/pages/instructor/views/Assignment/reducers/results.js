
const Constants = require('../constants');
const ObjectAssign = require('object-assign');
const Moment = require('moment');

const initialState = {
  loading: false,
  error: undefined,
  homeworks: undefined,
  assignments: undefined,
  assignmentTable: undefined
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

    const dueDateFormatter = (deadline) => {
      const _now = Moment();
      const _deadline = Moment(deadline);
      return _now.isAfter(_deadline) ? _deadline.calendar() : `${_deadline.calendar()} (${_deadline.from(_now)})`;
    };

    const table = {
      Headers: ['#','Assignment','Due Date','Status','All Marked']
    };
    table.CourseName = state.assignments[0].courseName;
    table.Rows = state.assignments.map(function(each,index){
      return {
        'Assignment': each.assignmentName,
        'Due Date':  dueDateFormatter(each.deadline),
        'Status': new Date(each.deadline) < new Date() ? 'Close' : 'Open',
        'All Marked': true
      }
    }).sort((a, b) => (new Date(a['Due Date']) - new Date(b['Due Date'])));
    const unScoreAss = [];

    // state.homeworks.forEach((each) => {
    //   if (each.score === undefined || each.score ==="" && unScoreAss.indexOf(each.assignmentName)=== -1){
    //     unScoreAss.push(each.assignmentName);
    //   }
    // });
// //
    table.Rows.forEach((each)=>{
      let isNotfound = true
      state.homeworks.forEach((eachH,index)=>{
        if (eachH.score === undefined || eachH.score ==="" && unScoreAss.indexOf(eachH.assignmentName)=== -1){
          unScoreAss.push(eachH.assignmentName);
        }
        if(each.Assignment === eachH.assignmentName){
          isNotfound = false
        }
      })
      if(isNotfound){
        unScoreAss.push(each.Assignment);
      }
    })
//
    table.Rows.forEach((eachAss,index) => {
      eachAss['#'] = (index + 1);
      if (unScoreAss.indexOf(eachAss.Assignment) !== -1){
        table.Rows[index]['All Marked'] = false
      }
    });
    return ObjectAssign({}, state, {
      loading: false,
      assignmentTable: table
    });
  }

  return state;
};

module.exports = reducer;
