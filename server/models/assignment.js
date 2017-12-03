
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Assignment extends MongoModels {
    static create(assignmentName, description, deadline, callback) {
        const document = {
            assignmentName,
            description,
            deadline,
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


Assignment.collection = 'assignments';


Assignment.schema = Joi.object().keys({
    _id: Joi.object(),
    timeCreated: Joi.date(),
    assignmentName: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.date().required(),
    homework: Joi.object().keys({
        studentId: Joi.string().length(9).required()
    }),
    isExpired: Joi.boolean().default(false)
});


Assignment.indexes = [
    { key: { studentId: 1, unique: 1 } }
];


module.exports = Assignment;
