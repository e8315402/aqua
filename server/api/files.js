const Joi = require('joi');
const Path = require('path');

const internals = {};


internals.applyRoutes = function (server, next) {

  server.route({
    method: 'GET',
    path: '/files',
    config: {
      auth: {
        strategy: 'session',
        scope: ['student', 'instructor']
      },
      validate: {
        query: {
          // courseName: Joi.string().required(),
          // assignmentName: Joi.string().required(),
          filePath: Joi.string().required()
        }
      }
    },
    handler: function (request, response) {
      // const filePath = Path.join('PASS', request.query.courseName, request.query.assignmentName, )
      response.file(request.query.filePath, { filename: request.query.filePath.split('/').pop(), mode: 'attachment' });
    }
    // handler(request, h) {
    // }
  });

  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

  next();
};


exports.register.attributes = {
  name: 'files'
};
