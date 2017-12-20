
const Joi = require('joi');
const MongoModels = require('mongo-models');
const NoteEntry = require('./note-entry');
const StatusEntry = require('./status-entry');


class Instructor extends MongoModels {
  static create(instructorId, callback) {
    const document = {
      instructorId,
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

    const query = { 'instructorId': instructorId };

    this.findOne(query, callback);
  }
}


Instructor.collection = 'instructors';


Instructor.schema = Joi.object().keys({
  _id: Joi.object(),
  instructorId: Joi.string().required(),
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
