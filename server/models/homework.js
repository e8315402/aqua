
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Homework extends MongoModels {
    static create(filePath, studentId, courseName, assignmentName, callback) {
        const document = {
            filePath,
            studentId,
            courseName,
            assignmentName,
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
    timeCreated: Joi.date(),
    filePath: Joi.string().required(),
    studentId: Joi.string().length(9).required(),
    score: Joi.number(),
    isExpired: Joi.boolean().default(false),
    courseName: Joi.string().required(),
    assignmentName: Joi.string().required()
});


Homework.indexes = [
    { key: { studentId: 1, unique: 1 } }
];


module.exports = Homework;
