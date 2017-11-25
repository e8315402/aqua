
const Account = require('./account');
const Admin = require('./admin');
const Async = require('async');
const Bcrypt = require('bcrypt');
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Course extends MongoModels {
    static create(courseName, instructor, classRoom, courseTime, callback) {

        const document = {
            coursename: courseName,
            instructor: {
                _id: instructor.id,
                name: instructor.name
            },
            classroom: classRoom,
            coursetime: courseTime,
            timeCreated: new Date()
        };

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }
            callback(null, docs[0]);
        });
    }

}


Course.collection = 'courses';


Course.schema = Joi.object().keys({
    _id: Joi.object(),
    coursename: Joi.string().required(),
    instructor: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required()
    }),
    student: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required()
    }),
    assignment: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required()
    }),
    classroom: Joi.string().required(),
    coursetime: Joi.string().required(),
    timeCreated: Joi.date()
});


Course.indexes = [
    { key: { coursename: 1, unique: 1 } }
];


module.exports = Course;
