
const Account = require('./account');
const Admin = require('./admin');
const Async = require('async');
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Homework extends MongoModels {
    static create(filePath, studentId, courseName, assignmentName, callback) {
        const document = {
            filepath:filePath,
            studentid:studentId,
            coursename:courseName,
            assignmentname:assignmentName
        };

        this.insertOne(document, (err, docs) => {
            if (err) {
                return callback(err);
            }
            callback(null, docs[0]);
        });

    }
    // static expire(id, callback){
    //     this.updateOne({ _id:id }, { $set:{ isExpired: true } });
    // }
    // static grade(score, callback){

    // }
}


Homework.collection = 'homeworks';


Homework.schema = Joi.object().keys({
    _id: Joi.object(),
    timeCreated: Joi.date(),
    filepath: Joi.string().required(),
    studentid: Joi.string().length(9).required(),
    score: Joi.number(),
    isExpired: Joi.boolean().default(false),
    coursename: Joi.string().required(),
    assignmentname: Joi.string().required()
});


Homework.indexes = [
    { key: { studentId: 1, unique: 1 } }
];


module.exports = Homework;
