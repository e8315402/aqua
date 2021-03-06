const Joi = require('joi');
const MongoModels = require('mongo-models');

class Course extends MongoModels {
  static create(courseName, instructor, students, classRoom, courseTime, courseWebsite, callback) {
    const document = {
      courseName,
      instructor: {
        instructorId: instructor.instructorId,
        name: instructor.name
      },
      student: students.map((student) => ({ studentId: student.studentId })),
      classRoom,
      courseTime,
      courseWebsite,
      timeCreated: new Date()
    };

    Course.validate(document, (err, value) => {
      if (err) {
        return callback(err);
      }
      this.insertOne(document, (err, docs) => {
        if (err) {
          return callback(err);
        }
        callback(null, docs[0]);
      });
    });
  }

}


Course.collection = 'courses';


Course.schema = Joi.object().keys({
  _id: Joi.object(),
  courseName: Joi.string().required(),
  instructor: Joi.object().keys({
    instructorId: Joi.string().required(),
    name: Joi.string().required()
  }),
  student: Joi.array().items(
    Joi.object().keys({
      studentId: Joi.string().required()
    })
  ),
  classRoom: Joi.string().required(),
  courseTime: Joi.string().required(),
  courseWebsite: Joi.string().required(),
  timeCreated: Joi.date()
});


Course.indexes = [
  { key: { courseName: 1, unique: 1 } }
];


module.exports = Course;
