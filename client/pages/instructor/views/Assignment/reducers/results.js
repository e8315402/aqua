
const Constants = require('../constants');
const ObjectAssign = require('object-assign');

const initialState = {
  loading: false,
  error: undefined,
  homeworks: undefined,
  assignments: undefined,
  assignmentTable: undefined,
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

    //To Format
    const table = {
      Headers: ['#','Assignment','Due Date','Status','Score']
    };
    table.CourseName = state.assignments[0].courseName
    table.Rows = state.assignments.map((each,index) => (
      {
        'Assignment': each.assignmentName,
        'Due Date':  each.deadline,
        'Status': new Date(each.deadline) < new Date() ? 'close' : 'open',
        'Score': true
      }
    )).sort((a, b) => (new Date(a['Due Date']) - new Date(b['Due Date'])));
    let unScoreAss = []
    state.homeworks.forEach((each)=>{
      if(each.score === null){
        unScoreAss.push(each.assignmentName)
      }
    })
    table.Rows.forEach((eachAss,index)=>{
      eachAss['#'] = (index + 1)
      if(unScoreAss.indexOf(eachAss['Assignment']) !== -1){
        eachAss['Score'] = false
      }
    })    

    return ObjectAssign({}, state, {
      loading: false,
      assignmentTable: table
    });
  }

  return state;
};


module.exports = reducer;
