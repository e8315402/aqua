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
        students: _studentsA,
        classRoom: '宏裕科技大樓 1322',
        instructor: { _id: '205598120', name : 'YC Chang' },

        // courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00'
    },
    {
        courseName: 'Software Engineering',
        students: _studentsB,
        classRoom: '宏裕科技大樓 1322',
        instructor: { _id: '505598121', name : 'CH Liu' },
        // courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00'
    },
    {
        courseName: 'Object-Oriented Analysis and Design',
        students: _studentsA,
        classRoom: '宏裕科技大樓 1322',
        instructor: { _id: '805598122', name : 'WK Chen' },

        // courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00'
    }
];

