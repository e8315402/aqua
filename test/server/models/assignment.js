const Course = require('../../../server/models/course');
const Assignment = require('../../../server/models/assignment');

const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');
const assignments = require('../fixtures/variables').assignments;
const courses = require('../fixtures/variables').courses;
const lab = exports.lab = Lab.script();
const mongoUri = Config.get('/hapiMongoModels/mongodb/uri');
const mongoOptions = Config.get('/hapiMongoModels/mongodb/options');


const modelConnect = function (cb) {
    Assignment.connect(mongoUri, mongoOptions, (err, db) => {
        if (err) {
            cb(err);
        }
        Course.connect(mongoUri, mongoOptions, (err, db) => {
            cb(err);
        });
    });
};

const modelClean = function (cb) {
    Assignment.deleteMany({}, (err, count) => {
        if (err){
            cb(err);
        }
        Course.deleteMany({}, (err, count) => {
            cb(err);
        });
    });
};

lab.experiment('Assignment Class Methods', () => {

    lab.before((done) => {
        modelConnect((err) => {
            if (err){
                done(err);
            };
            modelClean(done);
        });
    });

    // lab.afterEach(modelClean);

    lab.after((done) => {
        Assignment.disconnect();
        Course.disconnect();
        done();
    });

    lab.test('it returns a new instance when create succeeds', (done) => {
        Assignment.create(assignments[0].courseName, assignments[0].assignmentName, assignments[0].description, assignments[0].deadline, (err, result) => {
            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Assignment);
            compareAssignment(result, assignments[0]);
            done();
        });
    });

    lab.test('it returns an error when create fails', (done) => {
        const realInsertOne = Assignment.insertOne;
        Assignment.insertOne = function () {
            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();
            callback(Error('insert failed'));
        };
        Assignment.create(assignments[0].courseName, assignments[0].assignmentName, assignments[0].description, assignments[0].deadline, (err, result) => {
            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();
            Assignment.insertOne = realInsertOne;
            done();
        });
    });

    lab.test('it returns results through the specific course', (done) => {
        Async.auto({
            assignment: function (cb) {
                Assignment.create(assignments[0].courseName, assignments[0].assignmentName, assignments[0].description, assignments[0].deadline, cb);
            }
        }, (err, results) => {
            if (err) {
                return done(err);
            }
            const filter = {
                courseName: assignments[0].courseName
            };
            Assignment.find(filter, (err, resAssignments) => {
                Code.expect(err).to.not.exist();
                Code.expect(resAssignments).to.be.an.array();
                compareAssignment(resAssignments[0], assignments[0]);
                done(err);
            });
        });
    });

    lab.test('it should be expired after deadline', (done) => {
        Async.auto({
            assignment: function (cb) {
                Assignment.create(assignments[0].courseName, assignments[0].assignmentName, assignments[0].description, assignments[0].deadline, cb);
            }
        }, (err, results) => {
            if (err) {
                return done(err);
            }
            const filter = {
                courseName: assignments[0].courseName
            };
            const update = {
                $set: {
                    isExpired: true
                }
            };
            Assignment.findOneAndUpdate(filter, update, (err, resAssignments) => {
                Code.expect(err).to.not.exist();
                Code.expect(resAssignments).to.be.an.object();
                Code.expect(resAssignments.isExpired).to.equal(true);
                done(err);
            });
        });
    });

});

const compareAssignment = function (assignmentObj, assignmentDateObj) {
    Code.expect(assignmentObj.courseName).to.equal(assignmentDateObj.courseName);
    Code.expect(assignmentObj.assignmentName).to.equal(assignmentDateObj.assignmentName);
    Code.expect(assignmentObj.description).to.equal(assignmentDateObj.description);
    Code.expect(assignmentObj.deadline).to.equal(assignmentDateObj.deadline);
};
