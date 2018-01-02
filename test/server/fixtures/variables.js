const _studentsA = [
    {
        _id: '105598047',
        user: {
            id: '95EP150D35',
            name: 'james'
        }
    },
    {
        _id: '105598055',
        user: {
            id: '95EP13523D',
            name: 'joe'
        }
    }
];
const _studentsB = [
    {
        _id: '105598001',
        user: {
            id: '65EP150AH5',
            name: 'andy'
        }
    },
    {
        _id: '105598002',
        user: {
            id: '32EP135DSD',
            name: 'claire'
        }
    }
];

module.exports.courses = [
    {
        courseName: 'Pattern-Oriented Software Design',
        instructor: { instructorId: '205598120', name : 'YC Chang' },
        students: [
            { studentId: '105598001'},
            { studentId: '105598002' }
        ],
        classRoom: '宏裕科技大樓 1322',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00',
        courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/'
    },
    {
        courseName: 'Software Engineering',
        students: [
            { studentId: '105598001' },
            { studentId: '105598002' }
        ],
        instructor: { instructorId: '505598121', name : 'CH Liu' },
        classRoom: '宏裕科技大樓 1322',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00',
        courseWebsite: 'http://www.cc.ntut.edu.tw/~cliu/courses/se/se.htm'
    },
    {
        courseName: 'Object-Oriented Analysis and Design',
        instructor: { instructorId: '805598122', name : 'WK Chen' },
        students: [
            { studentId: '105598001' },
            { studentId: '105598002' }
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
        deadline: new Date()
    },
    {
        courseName: 'Software Engineering',
        assignmentName: 'Assignment 2',
        description: 'This is assignment, this time you need to ...',
        deadline: new Date()
    },
    {
        courseName: 'Software Engineering',
        assignmentName: 'Assignment 3',
        description: 'This is assignment, this time you need to ...',
        deadline: new Date()
    },
    {
        courseName: 'Object-Oriented Analysis and Design',
        assignmentName: 'Assignment 1',
        description: 'This is assignment, this time you need to ...',
        deadline: new Date()
    },
    {
        courseName: 'Object-Oriented Analysis and Design',
        assignmentName: 'Assignment 2',
        description: 'This is assignment, this time you need to ...',
        deadline: new Date()
    },
    {
        courseName: 'Pattern-Oriented Software Design',
        assignmentName: 'Assignment 1',
        description: 'This is assignment, this time you need to ...',
        deadline: new Date()
    }
];

module.exports.homeworks = [
    {
        filePath : 'C:/PASS/SoftwareEngineering/assignment1/105598067.txt',
        studentId : '105598067',
        studentName: 'Claire',
        courseName : 'Software Engineering',
        assignmentName : 'Assignment 1',
        score: 86
    },
    {
        filePath : 'C:/PASS/SoftwareEngineering/assignment1/105598077.txt',
        studentId : '105598077',
        studentName: 'Joe',
        courseName : 'Software Engineering',
        assignmentName : 'Assignment 1',
        score: 65
    },
    {
        filePath : 'C:/PASS/SoftwareEngineering/assignment1/105598088.txt',
        studentId : '105598088',
        studentName: 'James',
        courseName : 'Software Engineering',
        assignmentName : 'Assignment 1',
        score: 94
    }
];

