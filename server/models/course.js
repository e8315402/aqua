
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Course extends MongoModels {
    static create(courseName, instructor, students, classRoom, courseTime, callback) {
        const document = {
            courseName,
            instructor: {
                _id: instructor._id,
                name: instructor.name
            },
            student: students.map((student) => ({ _id: student._id })),
            classRoom,
            courseTime,
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
    courseName: Joi.string().required(),
    instructor: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required()
    }),
    student: Joi.object().keys({
        _id: Joi.string().required()
    }),
    assignment: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required()
    }),
    classRoom: Joi.string().required(),
    courseTime: Joi.string().required(),
    timeCreated: Joi.date()
});


Course.indexes = [
    { key: { courseName: 1, unique: 1 } }
];


module.exports = Course;
