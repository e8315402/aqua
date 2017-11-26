const _studentsA = [
    {
        id: '105598047',
        user: {
            id: '95EP150D35',
            name: 'james'
        }
    },
    {
        id: '105598055',
        user: {
            id: '95EP13523D',
            name: 'joe'
        }
    }
];
const _studentsB = [
    {
        id: '105598001',
        user: {
            id: '65EP150AH5',
            name: 'andy'
        }
    },
    {
        id: '105598002',
        user: {
            id: '32EP135DSD',
            name: 'claire'
        }
    }
];

module.exports.courses = [
    {
        courseName: 'Pattern-Oriented Software Design',
        instructor: {
            id: '123456789',
            name:'Professor Y C Cheng'
        },
        students: _studentsA,
        // courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00'
    },
    {
        courseName: 'Software Engineering',
        instructor: {
            id: '22224568',
            name:'Professor Chien-Hung Liu'
        },
        students: _studentsB,
        // courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00'
    },
    {
        courseName: 'Object-Oriented Analysis and Design',
        instructor: {
            id: '99999999',
            name:'Professor Woei-Kae Chen'
        },
        students: _studentsA,
        // courseWebsite: 'http://www.cc.ntut.edu.tw/~yccheng/',
        courseTime: 'Wed 09:00 ~ 10:00, Fri 10:00 ~ 12:00'
    }
];

