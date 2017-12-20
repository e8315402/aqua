
module.exports.students = [
  {
    studentId: '105598047',
    user: {
      name: 'james'
    }
  },
  {
    studentId: '105598055',
    user: {
      name: 'joe'
    }
  },
  {
    studentId: '106598054',
    user: {
      name: 'andy'
    }
  }
];

module.exports.instructors = [
  {
    instructorId: '205598047',
    user: {
      name: 'YC Chang'
    }
  },
  {
    instructorId: '205598055',
    user: {
      name: 'CH Liu'
    }
  },
  {
    instructorId: '205598054',
    user: {
      name: 'WK Chen'
    }
  },
];

module.exports.courses = [
  {
    courseName: 'Pattern-Oriented Software Design',
    instructor: { instructorId: '205598047', name : 'YC Chang' },
    students: [
      {
        studentId: '105598047'
      }, {
        studentId: '105598055'
      }
    ],
    classRoom: '宏裕科技大樓 1322',
    courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00',
    courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/'
  },
  {
    courseName: 'Software Engineering',
    instructor: { instructorId: '205598055', name : 'CH Liu' },
    students: [
      {
        studentId: '105598047'
      }, {
        studentId: '105598055'
      }, {
        studentId: '106598054'
      }
    ],
    classRoom: '宏裕科技大樓 1322',
    courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00',
    courseWebsite: 'http://www.cc.ntut.edu.tw/~cliu/courses/se/se.htm'
  },
  {
    courseName: 'Object-Oriented Analysis and Design',
    instructor: { instructorId: '205598054', name : 'WK Chen' },
    students: [
      {
        studentId: '105598047'
      }, {
        studentId: '105598055'
      }
    ],
    classRoom: '宏裕科技大樓 1322',
    courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00',
    courseWebsite: 'http://www.cc.ntut.edu.tw/~wkchen/'
  }
];

module.exports.assignments = [
  {
    courseName: 'Software Engineering',
    assignmentName: 'Assignment 1',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-10-11'
  },
  {
    courseName: 'Software Engineering',
    assignmentName: 'Assignment 2',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-11-07'
  },
  {
    courseName: 'Software Engineering',
    assignmentName: 'Assignment 3',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-12-05'
  },
  {
    courseName: 'Software Engineering',
    assignmentName: 'Assignment 4',
    description: 'This is assignment, this time you need to ...',
    deadline: '2018-01-09'
  },
  {
    courseName: 'Object-Oriented Analysis and Design',
    assignmentName: 'Assignment 1',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-02-29'
  },
  {
    courseName: 'Object-Oriented Analysis and Design',
    assignmentName: 'Assignment 2',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-03-19'
  },
  {
    courseName: 'Object-Oriented Analysis and Design',
    assignmentName: 'Assignment 3',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-04-01'
  },
  {
    courseName: 'Object-Oriented Analysis and Design',
    assignmentName: 'Assignment 4',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-04-22'
  },
  {
    courseName: 'Pattern-Oriented Software Design',
    assignmentName: 'Assignment 1',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-09-21'
  },
  {
    courseName: 'Pattern-Oriented Software Design',
    assignmentName: 'Assignment 2',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-10-06'
  },
  {
    courseName: 'Pattern-Oriented Software Design',
    assignmentName: 'Assignment 3',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-10-19'
  },
  {
    courseName: 'Pattern-Oriented Software Design',
    assignmentName: 'Assignment 4',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-10-27'
  },
  {
    courseName: 'Pattern-Oriented Software Design',
    assignmentName: 'Assignment 5',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-11-09'
  },
  {
    courseName: 'Pattern-Oriented Software Design',
    assignmentName: 'Assignment 6',
    description: 'This is assignment, this time you need to ...',
    deadline: '2017-11-29'
  }
];

module.exports.homeworks = [

  { // 105598047 - Software Engineering - Assignment 1 - 86
    filePath : 'C:/PASS/SoftwareEngineering/assignment1/105598047.txt',
    studentId : '105598047',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 1',
    score: 86
  },
  { // 105598047 - Software Engineering - Assignment 2 - 65
    filePath : 'C:/PASS/SoftwareEngineering/assignment2/105598047.txt',
    studentId : '105598047',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 2',
    score: 65
  },
  { // 105598047 - Software Engineering - Assignment 3 - undefined
    filePath : 'C:/PASS/SoftwareEngineering/assignment3/105598047.txt',
    studentId : '105598047',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 3',
    score: undefined
  },

  { // 105598047 - Object-Oriented Analysis and Design - Assignment 1 - 80
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment1/105598047.txt',
    studentId : '105598047',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 1',
    score: 80
  },
  { // 105598047 - Object-Oriented Analysis and Design - Assignment 2 - 92
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment2/105598047.txt',
    studentId : '105598047',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 2',
    score: 92
  },
  { // 105598047 - Object-Oriented Analysis and Design - Assignment 3 - 83
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment3/105598047.txt',
    studentId : '105598047',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 3',
    score: 83
  },
  { // 105598047 - Object-Oriented Analysis and Design - Assignment 4 - 88
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment4/105598047.txt',
    studentId : '105598047',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 4',
    score: 88
  },

  { // 105598047 - Pattern-Oriented Software Design - Assignment 1 - 50
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment1/105598047.txt',
    studentId : '105598047',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 1',
    score: 50
  },
  { // 105598047 - Pattern-Oriented Software Design - Assignment 2 - 90
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment2/105598047.txt',
    studentId : '105598047',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 2',
    score: 90
  },
  { // 105598047 - Pattern-Oriented Software Design - Assignment 3 - 95
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment3/105598047.txt',
    studentId : '105598047',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 3',
    score: 95
  },
  { // 105598047 - Pattern-Oriented Software Design - Assignment 4 - 94
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment4/105598047.txt',
    studentId : '105598047',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 4',
    score: 94
  },
  { // 105598047 - Pattern-Oriented Software Design - Assignment 5 - 89
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment5/105598047.txt',
    studentId : '105598047',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 5',
    score: 89
  },
  { // 105598047 - Pattern-Oriented Software Design - Assignment 6 - 99
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment6/105598047.txt',
    studentId : '105598047',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 6',
    score: 99
  },

  { // 105598055 - Software Engineering - Assignment 1 - 99
    filePath : 'C:/PASS/SoftwareEngineering/assignment1/105598055.txt',
    studentId : '105598055',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 1',
    score: 99
  },
  { // 105598055 - Software Engineering - Assignment 2 - 75
    filePath : 'C:/PASS/SoftwareEngineering/assignment2/105598055.txt',
    studentId : '105598055',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 2',
    score: 75
  },
  { // 105598055 - Software Engineering - Assignment 3 - undefined
    filePath : 'C:/PASS/SoftwareEngineering/assignment3/105598055.txt',
    studentId : '105598055',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 3',
    score: undefined
  },
  { // 105598055 - Software Engineering - Assignment 4 - undefined
    filePath : 'C:/PASS/SoftwareEngineering/assignment4/105598055.txt',
    studentId : '105598055',
    courseName : 'Software Engineering',
    assignmentName : 'Assignment 4',
    score: undefined
  },

  { // 105598055 - Object-Oriented Analysis and Design - Assignment 1 - 79
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment1/105598055.txt',
    studentId : '105598055',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 1',
    score: 79
  },
  { // 105598055 - Object-Oriented Analysis and Design - Assignment 2 - 75
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment2/105598055.txt',
    studentId : '105598055',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 2',
    score: 75
  },
  { // 105598055 - Object-Oriented Analysis and Design - Assignment 3 - 80
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment3/105598055.txt',
    studentId : '105598055',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 3',
    score: 80
  },
  { // 105598055 - Object-Oriented Analysis and Design - Assignment 4 - 82
    filePath : 'C:/PASS/Object-OrientedAnalysisandDesign/assignment4/105598055.txt',
    studentId : '105598055',
    courseName : 'Object-Oriented Analysis and Design',
    assignmentName : 'Assignment 4',
    score: 82
  },

  { // 105598055 - Pattern-Oriented Software Design - Assignment 1 - 50
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment1/105598055.txt',
    studentId : '105598055',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 1',
    score: 50
  },
  { // 105598055 - Pattern-Oriented Software Design - Assignment 2 - 90
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment2/105598055.txt',
    studentId : '105598055',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 2',
    score: 90
  },
  { // 105598055 - Pattern-Oriented Software Design - Assignment 3 - 93
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment3/105598055.txt',
    studentId : '105598055',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 3',
    score: 93
  },
  { // 105598055 - Pattern-Oriented Software Design - Assignment 4 - 94
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment4/105598055.txt',
    studentId : '105598055',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 4',
    score: 94
  },
  { // 105598055 - Pattern-Oriented Software Design - Assignment 5 - 85
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment5/105598055.txt',
    studentId : '105598055',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 5',
    score: 85
  },
  { // 105598055 - Pattern-Oriented Software Design - Assignment 6 - 96
    filePath : 'C:/PASS/Pattern-OrientedSoftwareDesign/assignment6/105598055.txt',
    studentId : '105598055',
    courseName : 'Pattern-Oriented Software Design',
    assignmentName : 'Assignment 6',
    score: 96
  }
];

