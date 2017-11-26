const Course = require('../../../server/models/course');
const Student = require('../../../server/models/student');
const Instructor = require('../../../server/models/instructor');
const User = require('../../../server/models/user');


const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');
const Variables = require('../fixtures/variables');

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
        const instructor = { id: '123456789', name: 'Professor Liu' };
        const students = [
            {
                _id: '105598047'
            },
            {
                _id: '105598055'
            }
        ];

        Course.create('Software Engineering', instructor, students, '宏裕科技大樓 1322', '星期二-第六節, 星期三-第八, 九節', (err, result) => {

            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Course);


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

        const instructor = { id: '123456789', name: 'Professor Liu' };
        const students = [
            {
                _id: '105598047'
            },
            {
                _id: '105598055'
            }
        ];

        Course.create('Software Engineering', instructor, students, '宏裕科技大樓 1322', '星期二-第六節, 星期三-第八, 九節', (err, result) => {

            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();

            Course.insertOne = realInsertOne;

            done();
        });
    });


    lab.test('it returns a result when finding by student', (done) => {
        const studentId = '105598047';

        Async.forEachOf(Variables.courses,(course, key, callback) => {

            Course.create(course.courseName, course.instructor, course.students, course.classRoom, course.courseTime, callback);

        }, (err, results) => {

            if (err) {
                return done(err);
            }

            Course.findByStudentId(studentId, (err, courses) => {

                Code.expect(err).to.not.exist();
                Code.expect(courses).to.be.an.array();
                compareCourse(courses[0], Variables.courses[0]);
                compareCourse(courses[1], Variables.courses[2]);
                done();
            });
        });
    });
});


const compareCourse = function (courseObj, courseDateObj) {
    Code.expect(courseObj.coursename).to.equal(courseDateObj.courseName);
    Code.expect(courseObj.classroom).to.equal(courseDateObj.classRoom);
    Code.expect(courseObj.coursetime).to.equal(courseDateObj.courseTime);
    Code.expect(courseObj.instructor._id).to.equal(courseDateObj.instructor._id);
    Code.expect(courseObj.instructor.name).to.equal(courseDateObj.instructor.name);
};
