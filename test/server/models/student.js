
const Student = require('../../../server/models/student');
const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');


const lab = exports.lab = Lab.script();
const mongoUri = Config.get('/hapiMongoModels/mongodb/uri');
const mongoOptions = Config.get('/hapiMongoModels/mongodb/options');


lab.experiment('Student Class Methods', () => {

    lab.before((done) => {

        Student.connect(mongoUri, mongoOptions, (err, db) => {

            done(err);
        });
    });


    lab.after((done) => {

        Student.deleteMany({}, (err, count) => {

            Student.disconnect();
            done(err);
        });
    });


    lab.test('it returns a new instance when create succeeds', (done) => {

        Student.create('105598055', (err, result) => {

            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Student);

            done();
        });
    });


    lab.test('it returns an error when create fails', (done) => {

        const realInsertOne = Student.insertOne;
        Student.insertOne = function () {

            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();

            callback(Error('insert failed'));
        };

        Student.create('105598055', (err, result) => {

            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();

            Student.insertOne = realInsertOne;

            done();
        });
    });


    lab.test('it returns a result when finding by studentId', (done) => {

        Async.auto({
            student: function (cb) {

                Student.create('105598055', cb);
            },
            studentUpdated: ['student', function (results, cb) {

                const fieldsToUpdate = {
                    $set: {
                        user: {
                            id: '95EP150D35',
                            name: 'Joe'
                        }
                    }
                };
                Student.findByIdAndUpdate(results.student._id, fieldsToUpdate, cb);
            }]
        }, (err, results) => {

            if (err) {
                return done(err);
            }

            Student.findById('105598055', (err, student) => {

                Code.expect(err).to.not.exist();
                Code.expect(student).to.be.an.instanceOf(Student);
                done();
            });
        });
    });
});
