
const Instructor = require('../../../server/models/instructor');
const Async = require('async');
const Code = require('code');
const Config = require('../../../config');
const Lab = require('lab');


const lab = exports.lab = Lab.script();
const mongoUri = Config.get('/hapiMongoModels/mongodb/uri');
const mongoOptions = Config.get('/hapiMongoModels/mongodb/options');


lab.experiment('Instructor Class Methods', () => {

    lab.before((done) => {

        Instructor.connect(mongoUri, mongoOptions, (err, db) => {

            done(err);
        });
    });


    lab.after((done) => {

        Instructor.deleteMany({}, (err, count) => {

            Instructor.disconnect();
            done(err);
        });
    });


    lab.test('it returns a new instance when create succeeds', (done) => {

        Instructor.create('205598055', (err, result) => {

            Code.expect(err).to.not.exist();
            Code.expect(result).to.be.an.instanceOf(Instructor);

            done();
        });
    });


    lab.test('it returns an error when create fails', (done) => {

        const realInsertOne = Instructor.insertOne;
        Instructor.insertOne = function () {

            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();

            callback(Error('insert failed'));
        };

        Instructor.create('205598055', (err, result) => {

            Code.expect(err).to.be.an.object();
            Code.expect(result).to.not.exist();

            Instructor.insertOne = realInsertOne;

            done();
        });
    });


    lab.test('it returns a result when finding by InstructorId', (done) => {

        Async.auto({
            instructor: function (cb) {

                Instructor.create('205598055', cb);
            },
            instructorUpdated: ['instructor', function (results, cb) {

                const fieldsToUpdate = {
                    $set: {
                        user: {
                            id: '95EP150D35',
                            name: 'Professor Y C chang'
                        }
                    }
                };
                Instructor.findByIdAndUpdate(results.instructor._id, fieldsToUpdate, cb);
            }]
        }, (err, results) => {

            if (err) {
                return done(err);
            }

            Instructor.findById('205598055', (err, instructor) => {

                Code.expect(err).to.not.exist();
                Code.expect(instructor).to.be.an.instanceOf(Instructor);
                done();
            });
        });
    });
});
