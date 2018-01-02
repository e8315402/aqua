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
          filePath: Joi.string().required()
        }
      }
    },
    handler: function (request, response) {
      const filePathSilce = request.query.filePath.split('\\');
      const filePath = Path.join(...filePathSilce);
      response.file(filePath, { filename: request.query.filePath.split('/').pop(), mode: 'attachment' });
    }
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
