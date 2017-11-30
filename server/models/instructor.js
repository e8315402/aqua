
const Joi = require('joi');
const MongoModels = require('mongo-models');
const NoteEntry = require('./note-entry');
const StatusEntry = require('./status-entry');


class Instructor extends MongoModels {
    static create(id, callback) {

        const document = {
            id,
            timeCreated: new Date()
        };

        this.insertOne(document, (err, docs) => {

            if (err) {
                return callback(err);
            }
            callback(null, docs[0]);
        });
    }

    static findById(instructorId, callback) {

        const query = { 'id': instructorId };

        this.findOne(query, callback);
    }
}


Instructor.collection = 'students';


Instructor.schema = Joi.object().keys({
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

Instructor.indexes = [
    { key: { 'user.id': 1 } },
    { key: { 'user.name': 1 } }
];


module.exports = Instructor;
