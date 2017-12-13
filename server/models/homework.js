
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Homework extends MongoModels {
    static create(courseName, assignmentName, filePath, studentId, callback) {
        const document = {
            courseName,
            assignmentName,
            filePath,
            studentId,
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


Homework.collection = 'homeworks';


Homework.schema = Joi.object().keys({
    _id: Joi.object(),
    courseName: Joi.string().required(),
    assignmentName: Joi.string().required(),
    timeCreated: Joi.date(),
    filePath: Joi.string().required(),
    studentId: Joi.string().length(9).required(),
    score: Joi.number(),
    isExpired: Joi.boolean().default(false)
});


Homework.indexes = [
    { key: { studentId: 1 } }
];


module.exports = Homework;
