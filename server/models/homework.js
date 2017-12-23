
const Joi = require('joi');
const MongoModels = require('mongo-models');


class Homework extends MongoModels {
  static create(courseName, assignmentName, studentId,studentName, filePath, callback) {
    const document = {
      courseName,
      assignmentName,
      filePath,
      studentId,
      studentName,
      timeCreated: new Date()
    };

    this.insertOne(document, (err, docs) => {
      if (err) {
        return callback(err);
      }
      callback(null, docs[0]);
    });

  }

  static marks(courseName, assignmentName, studentId, score, cb) {
    const filter = {
      courseName,
      assignmentName,
      studentId
    };
    const update = {
      $set: {
        score
      }
    };
    this.findOneAndUpdate(filter, update, cb);
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
  studentName: Joi.string().required(),  
  score: Joi.number().min(0).max(100)
});


Homework.indexes = [
  { key: { studentId: 1 } }
];


module.exports = Homework;
