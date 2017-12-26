import { Buffer } from 'buffer';
const Path = require('path');
const FS = require('fs');
const Joi = require('joi');
const Async = require('async');
const internals = {};


internals.applyRoutes = function (server, next) {

  const Homework = server.plugins['hapi-mongo-models'].Homework;

  server.route({
    method: 'GET',
    path: '/homeworks',
    config: {
      auth: {
        strategy: 'session',
        scope: ['student', 'instructor']
      },
      validate: {
        query: {
          courseName: Joi.string().required(),
          assignmentName: Joi.string()
        }
      }
    },
    handler: function (request, reply) {
      // console.log(`${JSON.stringify(request.auth.credentials)}`);
      // {"session":{"_id":"5a3514b00d647f1724f459d3","userId":"5a3513764d88c113c49e75da","key":"$2a$10$S0xFSvE1kcz0ykt/CZpdL.rXLXCPtSEXqQ6t/9ANhOurU4Aw9uUKS","time":"2017-12-16T12:42:24.438Z"},"user":{"_id":"5a3513764d88c113c49e75da","isActive":true,"username":"james","password":"$2a$10$cVGpuFYa6dHjzVXAdx/VluLf0M9ZcISqoUkvchotR41Hye7bgTXHi","email":"default@gmail.com","timeCreated":"2017-12-16T12:37:10.793Z","roles":{"student":{"studentId":"105598047"}}},"scope":["student"]}
      const query = { courseName: request.query.courseName };
      if (request.auth.credentials.user.roles.student){
        query.studentId = request.auth.credentials.user.roles.student.studentId;
      }
      if (request.auth.credentials.user.roles.instructor && request.query.assignmentName){ 
        query.assignmentName = request.query.assignmentName;
      }
      Homework.find(query, (err, homeworks) => {
        if (err) {
          return reply(err);
        }
        reply(homeworks);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/homeworks',
    config: {
      auth: {
        strategy: 'session',
        scope: ['student']
      },
      validate: {
        payload: {
          courseName: Joi.string().required(),
          assignmentName: Joi.string().required(),
          data: Joi.any().required(),
          fileName: Joi.string()
        }
      }
    },
    handler: function (request, reply) {
      // const extension = request.payload.fileName.split('.').pop();
      // const name = request.auth.credentials.user.roles.student.studentId + '.' + extension;
      const studentId = request.auth.credentials.user.roles.student.studentId;
      const studentName = request.auth.credentials.user.username;
      const name = request.payload.fileName;
      const path = Path.join('PASS', request.payload.courseName, request.payload.assignmentName, name);
      const file = FS.createWriteStream(path);

      file.on('error', (err) => {
        console.error(err);
      });

      file.on('finish', (err) => {

        if (err) {
          return reply(err);
        };

        Homework.create(request.payload.courseName, request.payload.assignmentName, studentId, studentName, path, (err, result) => {
          if (err) {
            return reply(err);
          }
          reply(result);
        });
      });

      file.write(new Buffer(request.payload.data));
      file.end();
    }
  });

  server.route({
    method: 'POST',
    path: '/homeworks/mark',
    config: {
      auth: {
        strategy: 'session',
        scope: ['instructor']
      }
    },
    handler: function (request, reply) {
      const courseName = request.payload.assignmentInfo.courseName;
      const assignmentName = request.payload.assignmentInfo.assignmentName;

      Async.map(request.payload.scoreTable, (scorePair, _cb) => {
        Homework.marks(courseName, assignmentName, scorePair.studentId, scorePair.score, _cb);
      }, (err, result) => {
        if ( err ) {
          return reply(err);
        }
        reply(result);
      });
    }
  });

  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

  next();
};


exports.register.attributes = {
  name: 'homework'
};
