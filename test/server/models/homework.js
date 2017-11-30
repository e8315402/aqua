const Homework = require('../../../server/models/homework');

const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');
const Variables = require('../fixtures/variables');
const lab = exports.lab = Lab.script();
const mongoUri = Config.get('/hapiMongoModels/mongodb/uri');
const mongoOptions = Config.get('/hapiMongoModels/mongodb/options');
const MakeMockModel = require('../fixtures/make-mock-model');


lab.experiment('Homework Class Methods', () => {

    lab.before((done) => {
        Homework.connect(mongoUri, mongoOptions, (err, db) => {
            done(err);
        });

    });

    lab.afterEach((done) => {
        Homework.deleteMany({}, (err, count) => {
            done(err);
        });
    });

    lab.after((done) => {
        Homework.disconnect();
        done();
    });

    lab.test('it returns a new instance when create succeeds', (done) => {
        const filePath = 'C:/PASS/SoftwareEngineering/assignment1/105598067.txt';
        const studentId = '105598067';
        const courseName = 'SoftwareEngineering';
        const assignmentName = 'assignment1';
        Homework.create(filePath, studentId, courseName, assignmentName, (err, result) => {
            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Homework);
            done();
        });
    });

    lab.test('it returns an error when create fails', (done) => {
        const filePath = 'C:/PASS/SoftwareEngineering/assignment1/105598067.txt';
        const studentId = '105598067';
        const courseName = 'SoftwareEngineering';
        const assignmentName = 'assignment1';
        const realInsertOne = Homework.insertOne;
        Homework.insertOne = function () {
            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();
            callback(Error('insert failed'));
        };

        Homework.create(filePath, studentId, courseName, assignmentName, (err, result) => {
            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();
            Homework.insertOne = realInsertOne;
            done();
        });
    });

    lab.test('it returns a result when finding by studentId, courseName and assignmentName', (done) => {
        Async.auto({
            homework: function (cb) {
                Homework.create(Variables.homeworks[0].filePath, Variables.homeworks[0].studentId, Variables.homeworks[0].courseName, Variables.homeworks[0].assignmentName, cb);
            }
        }, (err, results) => {
            if (err) {
                return done(err);
            }
            const query = {
                studentId: Variables.homeworks[0].studentId,
                courseName: Variables.homeworks[0].courseName,
                assignmentName: Variables.homeworks[0].assignmentName
            };
            Homework.find(query, (err, homework) => {
                Code.expect(err).to.not.exist();
                Code.expect(homework[0]).to.be.an.instanceOf(Homework);
                compareHomework(homework[0],Variables.homeworks[0]);

                done(err);
            });
        });
    });

});

const compareHomework = function (homeworkObj, homeworkDateObj) {
    Code.expect(homeworkObj.filePath).to.equal(homeworkDateObj.filePath);
    Code.expect(homeworkObj.studentId).to.equal(homeworkDateObj.studentId);
    Code.expect(homeworkObj.courseName).to.equal(homeworkDateObj.courseName);
    Code.expect(homeworkObj.assignmentName).to.equal(homeworkDateObj.assignmentName);

};
