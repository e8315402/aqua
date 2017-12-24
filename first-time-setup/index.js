const Async = require('async');
const MongoModels = require('mongo-models');
const Mongodb = require('mongodb');
const Promptly = require('promptly');
const Courses = require('./variables').courses;
const Assignments = require('./variables').assignments;
const Students = require('./variables').students;
const Homeworks = require('./variables').homeworks;
const Instructors = require('./variables').instructors;
const Fs = require('fs');


Async.auto({
  mongodbUri: (done) => {

    const options = {
      default: 'mongodb://localhost:27017/aqua'
    };

    done(null, 'mongodb://localhost:27017/aqua');

    // Promptly.prompt(`MongoDB URI: (${options.default})`, options, done);
  },
  testMongo: ['mongodbUri', (results, done) => {

    Mongodb.MongoClient.connect(results.mongodbUri, {}, (err, db) => {

      if (err) {
        console.error('Failed to connect to Mongodb.');
        return done(err);
      }

      db.close();
      done(null, true);
    });
  }],
  rootEmail: ['testMongo', (results, done) => {
    done(null, 'admin');
    // Promptly.prompt('Root user email:', done);
  }],
  rootPassword: ['rootEmail', (results, done) => {
    done(null, 'admin');
    // Promptly.password('Root user password:', done);
  }],
  setupRootUser: ['rootPassword', (results, done) => {

    const Account = require('../server/models/account');
    const AdminGroup = require('../server/models/admin-group');
    const Admin = require('../server/models/admin');
    const AuthAttempt = require('../server/models/auth-attempt');
    const Session = require('../server/models/session');
    const Status = require('../server/models/status');
    const User = require('../server/models/user');
    const Student = require('../server/models/Student');
    const Course = require('../server/models/course');
    const Homework = require('../server/models/homework');
    const Assignment = require('../server/models/assignment');
    const Instructor = require('../server/models/instructor');

    Async.auto({
      connect: function (done) {

        MongoModels.connect(results.mongodbUri, {}, done);
      },
      clean: ['connect', (dbResults, done) => {

        Async.parallel([
          Account.deleteMany.bind(Account, {}),
          AdminGroup.deleteMany.bind(AdminGroup, {}),
          Admin.deleteMany.bind(Admin, {}),
          AuthAttempt.deleteMany.bind(AuthAttempt, {}),
          Session.deleteMany.bind(Session, {}),
          Status.deleteMany.bind(Status, {}),
          User.deleteMany.bind(User, {}),
          Student.deleteMany.bind(Student, {}),
          Course.deleteMany.bind(Course, {}),
          Homework.deleteMany.bind(Homework, {}),
          Assignment.deleteMany.bind(Assignment, {}),
          Instructor.deleteMany.bind(Instructor, {})

        ], done);
      }],
      adminGroup: ['clean', function (dbResults, done) {

        AdminGroup.create('Root', done);
      }],
      admin: ['clean', function (dbResults, done) {

        const document = {
          _id: Admin.ObjectId('111111111111111111111111'),
          name: {
            first: 'Root',
            middle: '',
            last: 'Admin'
          },
          timeCreated: new Date()
        };

        Admin.insertOne(document, (err, docs) => {

          done(err, docs && docs[0]);
        });
      }],
      user: ['clean', function (dbResults, done) {

        Async.auto({
          passwordHash: User.generatePasswordHash.bind(this, results.rootPassword)
        }, (err, passResults) => {

          if (err) {
            return done(err);
          }

          const document = {
            _id: Admin.ObjectId('000000000000000000000000'),
            isActive: true,
            username: 'root',
            password: passResults.passwordHash.hash,
            email: results.rootEmail.toLowerCase(),
            timeCreated: new Date()
          };

          User.insertOne(document, (err, docs) => {

            done(err, docs && docs[0]);
          });
        });
      }],
      adminMembership: ['admin', function (dbResults, done) {

        const id = dbResults.admin._id.toString();
        const update = {
          $set: {
            groups: {
              root: 'Root'
            }
          }
        };

        Admin.findByIdAndUpdate(id, update, done);
      }],
      linkUser: ['admin', 'user', function (dbResults, done) {

        const id = dbResults.user._id.toString();
        const update = {
          $set: {
            'roles.admin': {
              id: dbResults.admin._id.toString(),
              name: 'Root Admin'
            }
          }
        };

        User.findByIdAndUpdate(id, update, done);
      }],
      linkAdmin: ['admin', 'user', function (dbResults, done) {

        const id = dbResults.admin._id.toString();
        const update = {
          $set: {
            user: {
              id: dbResults.user._id.toString(),
              name: 'root'
            }
          }
        };

        Admin.findByIdAndUpdate(id, update, done);
      }]
    }, (err, dbResults) => {

      if (err) {
        console.error('Failed to setup root user.');
        return done(err);
      }

      done(null, true);
    });
  }],
  setupCourse: ['setupRootUser', (results, done) => {
    const Course = require('../server/models/course');

    Async.auto({
      connect: function (done) {
        MongoModels.connect(results.mongodbUri, {}, done);
      },
      course: ['connect', function (dbResults, done) {
        Async.each(Courses, (course, _cb) => {
          Course.create(course.courseName, course.instructor, course.students, course.classRoom, course.courseTime, course.courseWebsite, _cb);
        }, done);
      }]
    },(err, dbResults) => {

      if (err) {
        console.error('Failed to setup the default course.');
        return done(err);
      }

      done(null, true);
    });
  }],
  setupAssignment: ['setupRootUser', (results, done) => {
    const Assignment = require('../server/models/assignment');

    Async.auto({
      connect: function (done) {
        MongoModels.connect(results.mongodbUri, {}, done);
      },
      course: ['connect', function (dbResults, done) {
        Async.each(Assignments, (assignment, _cb) => {
          Assignment.create(assignment.courseName, assignment.assignmentName, assignment.description, assignment.deadline, _cb);
        }, done);
      }]
    },(err, dbResults) => {

      if (err) {
        console.error('Failed to setup the default assignment.');
        return done(err);
      }

      done(null, true);
    });
  }],
  setupStudent:['setupRootUser', (results, done) => {

    const User = require('../server/models/user');
    const Student = require('../server/models/student');

    Async.auto({
      connect: function (done) {
        MongoModels.connect(results.mongodbUri, {}, done);
      },
      students: ['connect',function (dbResults, done) {
        Async.map(Students, (student, _cb) => {
          Student.create(student.studentId, _cb);
        }, done);
      }],
      users: ['connect', function (dbResults, done) {
        Async.map(Students, (student, _cb) => {
          User.create(student.user.name, student.studentId, 'default@gmail.com', _cb);
        }, done);
      }],
      linkUser: ['students', 'users', function (dbResults, done) {
        Async.eachOf(dbResults.students, (student, index, _cb) => {
          const update = {
            $set: {
              'roles.student': {
                studentId: student.studentId
              }
            }
          };
          User.findByIdAndUpdate(dbResults.users[index]._id, update, _cb);
        }, done);
      }],
      linkStudent: ['students', 'users', function (dbResults, done) {
        Async.eachOf(dbResults.users, (user, index, _cb) => {
          const update = {
            $set: {
              'roles.user': {
                id: user._id.toString(),
                name: user.username
              }
            }
          };
          const filter = { studentId: dbResults.students[index].studentId };
          Student.findOneAndUpdate(filter, update, _cb);
        }, done);
      }]
    }, (err, dbResults) => {
      if (err) {
        console.error('Failed to setup students.');
        return done(err);
      }

      done(null, true);
    });

  }],
  setupHomework: ['setupRootUser', (results, done) => {
    const Homework = require('../server/models/homework');
    Async.auto({
      cleanFiles: function (done) {
        require('rimraf')('./PASS', done);
      },
      createFiles:['cleanFiles', function (dbResults, done) {
        Async.each(Homeworks, (homework, _cb) => {
          const eachFolders = homework.filePath.split('\\');
          eachFolders.shift();
          const file = eachFolders.pop();
          Async.reduce(eachFolders, '.', (parent, each, __cb) => {
            const folderPath = parent + '\\' + each;
            if (!Fs.existsSync(folderPath)) {
              Fs.mkdir(folderPath, (err) => __cb(err, folderPath));
            }
            else {
              __cb(null, folderPath);
            }
          }, (err, folderPath) => {
            if (err) {
              _cb(err);
            }
            else {
              Fs.writeFile(folderPath + '\\' +  file, 'Hey there!', _cb);
            }
          });
        }, done);
      }],
      connect: function (done) {
        MongoModels.connect(results.mongodbUri, {}, done);
      },
      homeworks: ['connect', function (dbResults, done) {
        Async.map(Homeworks, (homework, _cb) => {
          Homework.create(homework.courseName, homework.assignmentName, homework.studentId, homework.studentName, homework.filePath, _cb);
        }, done);
      }],
      addScoreToHomeworks: ['homeworks', (dbResults, done) => {
        const mapping = {};
        Homeworks.forEach((each) => (mapping[`${each.courseName}${each.assignmentName}${each.studentId}`] = each));
        Async.each(dbResults.homeworks, (homework, _cb) => {
          const update = {
            $set:{
              score: mapping[`${homework.courseName}${homework.assignmentName}${homework.studentId}`].score
            }
          };
          Homework.findByIdAndUpdate(homework._id, update, _cb);
        }, done);
      }]
    },(err, dbResults) => {

      if (err) {
        console.error('Failed to setup the default course.');
        return done(err);
      }

      done(null, true);
    });
  }],
  setupInstructor:['setupRootUser',(results,done) => {
    const User = require('../server/models/user');
    const Instructor = require('../server/models/instructor');

    Async.auto({
      connect: function (done) {
        MongoModels.connect(results.mongodbUri, {}, done);
      },
      instructors: ['connect',function (dbResults, done) {
        Async.map(Instructors, (instructor, _cb) => {
          Instructor.create(instructor.instructorId, _cb);
        }, done);
      }],
      users: ['connect', function (dbResults, done) {
        Async.map(Instructors, (instructor, _cb) => {
          User.create(instructor.user.name, instructor.instructorId, 'default@gmail.com', _cb);
        }, done);
      }],
      linkUser: ['instructors', 'users', function (dbResults, done) {
        Async.eachOf(dbResults.instructors, (instructor, index, _cb) => {
          const update = {
            $set: {
              'roles.instructor': {
                instructorId: instructor.instructorId
              }
            }
          };
          User.findByIdAndUpdate(dbResults.users[index]._id, update, _cb);
        }, done);
      }],
      linkInstructor: ['instructors', 'users', function (dbResults, done) {
        Async.eachOf(dbResults.users, (user, index, _cb) => {
          const update = {
            $set: {
              'roles.user': {
                id: user._id.toString(),
                name: user.username
              }
            }
          };
          const filter = { instructorId: dbResults.instructors[index].instructorId };
          Instructor.findOneAndUpdate(filter, update, _cb);
        }, done);
      }]
    }, (err, dbResults) => {
      if (err) {
        console.error('Failed to setup instructors.');
        return done(err);
      }

      done(null, true);
    });
  }]

}, (err, results) => {

  if (err) {
    console.error('Setup failed.');
    console.error(err);
    return process.exit(1);
  }

  console.log('Setup complete.');
  process.exit(0);
});
