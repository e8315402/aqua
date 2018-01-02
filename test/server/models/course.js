const Course = require('../../../server/models/course');

const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');
const Courses = require('../fixtures/variables').courses;

const lab = exports.lab = Lab.script();
const mongoUri = Config.get('/hapiMongoModels/mongodb/uri');
const mongoOptions = Config.get('/hapiMongoModels/mongodb/options');


lab.experiment('Course Class Methods', () => {

    lab.before((done) => {
        Course.connect(mongoUri, mongoOptions, (err, db) => {
            done(err);
        });
    });

    lab.afterEach((done) => {
        Course.deleteMany({}, (err, count) => {
            done(err);
        });
    });

    lab.after((done) => {
        Course.disconnect();
        done();
    });

    lab.test('it returns a new instance when create succeeds', (done) => {
        Course.create(...Object.keys(Courses[0]).map((each) => Courses[0][each]), (err, result) => {
            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Course);
            compareCourse(result, Courses[0]);
            done();
        });
    });


    lab.test('it returns an error when create fails', (done) => {

        const realInsertOne = Course.insertOne;
        Course.insertOne = function () {

            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();

            callback(Error('insert failed'));
        };

        Course.create(...Object.keys(Courses[0]).map((each) => Courses[0][each]), (err, result) => {

            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();

            Course.insertOne = realInsertOne;

            done();
        });
    });


    lab.test('it returns a result when finding by student', (done) => {
        const studentId = '105598047';

        Async.forEachOf(Courses,(course, key, callback) => {

            Course.create(course.courseName, course.instructor, course.students, course.classRoom, course.courseTime, course.courseWebsite, callback);

        }, (err, results) => {

            if (err) {
                return done(err);
            }

            const filter = { 'student._id': studentId };

            Course.find(filter, (err, courses) => {

                Code.expect(err).to.not.exist();
                Code.expect(courses).to.be.an.array();
                // compareCourse(courses[0], Courses[0]);
                // compareCourse(courses[1], Courses[2]);
                done();
            });
        });
    });
});


const compareCourse = function (courseObj, courseDateObj) {
    Code.expect(courseObj.courseName).to.equal(courseDateObj.courseName);
    Code.expect(courseObj.classRoom).to.equal(courseDateObj.classRoom);
    Code.expect(courseObj.courseTime).to.equal(courseDateObj.courseTime);
    Code.expect(courseObj.courseWebsite).to.equal(courseDateObj.courseWebsite);
    Code.expect(courseObj.instructor._id).to.equal(courseDateObj.instructor._id);
    Code.expect(courseObj.instructor.name).to.equal(courseDateObj.instructor.name);
};
