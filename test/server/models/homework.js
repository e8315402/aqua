const Homework = require('../../../server/models/homework');

const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');
const homeworks = require('../fixtures/variables').homeworks;
const assignments = require('../fixtures/variables').assignments;
const courses = require('../fixtures/variables').courses;
const lab = exports.lab = Lab.script();
const mongoUri = Config.get('/hapiMongoModels/mongodb/uri');
const mongoOptions = Config.get('/hapiMongoModels/mongodb/options');

lab.experiment('Homework Class Methods', () => {

    lab.before((done) => {
        Homework.connect(mongoUri, mongoOptions, (err, db) => {
            done(err);
        });

    });

    lab.beforeEach((done) => {
        Homework.deleteMany({}, (err, count) => {
            done(err);
        });
    });

    lab.after((done) => {
        Homework.disconnect();
        done();
    });

    lab.test('it returns a new instance when create succeeds', (done) => {
        Homework.create(homeworks[0].courseName, homeworks[0].assignmentName, homeworks[0].studentId, homeworks[0].filePath, (err, result) => {
            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Homework);
            compareHomework(result, homeworks[0]);
            done();
        });
    });

    lab.test('it returns an error when create fails', (done) => {
        const realInsertOne = Homework.insertOne;
        Homework.insertOne = function () {
            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();
            callback(Error('insert failed'));
        };

        Homework.create(homeworks[0].filePath, homeworks[0].studentId, homeworks[0].courseName, homeworks[0].assignmentName, (err, result) => {
            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();
            Homework.insertOne = realInsertOne;
            done();
        });
    });

    lab.test('it returns a result when finding by studentId, courseName and assignmentName', (done) => {
        Async.auto({
            homework: function (cb) {
                Homework.create(homeworks[0].courseName, homeworks[0].assignmentName, homeworks[0].studentId, homeworks[0].filePath, cb);
            }
        }, (err, results) => {
            if (err) {
                return done(err);
            }
            const query = {
                studentId: homeworks[0].studentId,
                courseName: homeworks[0].courseName,
                assignmentName: homeworks[0].assignmentName
            };
            Homework.find(query, (err, homework) => {
                Code.expect(err).to.not.exist();
                Code.expect(homework[0]).to.be.an.instanceOf(Homework);
                compareHomework(homework[0],homeworks[0]);
                done(err);
            });
        });
    });

    lab.test('it returns homeworks through the specific assignment', (done) => {
        Async.auto({
            homeworks: function (cb) {
                Async.concat(homeworks, (homework, _cb) => {
                    Homework.create(homework.courseName, homework.assignmentName, homework.studentId, homework.filePath, _cb);
                }, cb);
            }
        }, (err, results) => {
            if (err) {
                return done(err);
            }
            const filter = {
                courseName: courses[1].courseName,
                assignmentName: assignments[0].assignmentName
            };
            Homework.find(filter, (err, resHomeworks) => {
                Code.expect(err).to.not.exist();
                Code.expect(resHomeworks).to.be.an.array();
                compareHomework(resHomeworks[0], homeworks[0]);
                done();
            });
        });
    });

    lab.test('it should have score after marking it', (done) => {
        Async.auto({
            homework: function (cb) {
                Homework.create(homeworks[0].courseName, homeworks[0].assignmentName, homeworks[0].studentId, homeworks[0].filePath, cb);
            },
            marks: ['homework', function (results, cb) {
                Homework.marks(results.homework.courseName, results.homework.assignmentName, results.homework.studentId, homeworks[0].score, cb);
            }]
        }, (err, results) => {
            if (err) {
                return done(err);
            }
            const filter = {
                courseName: homeworks[0].courseName,
                assignmentName: homeworks[0].assignmentName,
                studentId: homeworks[0].studentId
            };
            Homework.find(filter, (err, resHomeworks) => {
                Code.expect(err).to.not.exist();
                Code.expect(resHomeworks).to.be.an.array();
                compareHomework(resHomeworks[0], homeworks[0]);
                done();
            });
        });
    });

});

const compareHomework = function (homeworkObj, homeworkDateObj) {
    Code.expect(homeworkObj.filePath).to.equal(homeworkDateObj.filePath);
    Code.expect(homeworkObj.studentId).to.equal(homeworkDateObj.studentId);
    Code.expect(homeworkObj.courseName).to.equal(homeworkDateObj.courseName);
    Code.expect(homeworkObj.assignmentName).to.equal(homeworkDateObj.assignmentName);
    if (homeworkObj.score) {
        Code.expect(homeworkObj.score).to.equal(homeworkDateObj.score);
    }
};
