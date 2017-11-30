
const Joi = require('joi');
const MongoModels = require('mongo-models');
const NoteEntry = require('./note-entry');
const StatusEntry = require('./status-entry');


class Student extends MongoModels {
    static create(studentId, callback) {

        const document = {
            id: studentId,
            timeCreated: new Date()
        };

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }
            callback(null, docs[0]);
        });
    }

    static findById(studentId, callback) {

        const query = { 'id': studentId };

        this.findOne(query, callback);
    }
}


Student.collection = 'students';


Student.schema = Joi.object().keys({
    _id: Joi.object(),
    user: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().lowercase().required()
    }),
    status: Joi.object().keys({
        current: StatusEntry.schema,
        log: Joi.array().items(StatusEntry.schema)
    }),
    notes: Joi.array().items(NoteEntry.schema),
    timeCreated: Joi.date()
});

Student.indexes = [
    { key: { 'user.id': 1 } },
    { key: { 'user.name': 1 } }
];


module.exports = Student;
