const Joi = require('joi');

const internals = {};


internals.applyRoutes = function (server, next) {

  const Assignment = server.plugins['hapi-mongo-models'].Assignment;

  server.route({
    method: 'GET',
    path: '/assignments',
    config: {
      auth: {
        strategy: 'session',
        scope: ['student', 'instructor']
      },
      validate: {
        query: {
          courseName: Joi.string().required()
        }
      }
    },
    handler: function (request, reply) {
      // console.log(`${JSON.stringify(request.auth.credentials)}`);
      // {"session":{"_id":"5a3283bdd747da37ac643e88","userId":"5a3274ce0093d43da8a2948f","key":"$2a$10$7SI5dODU1jbMqU3K61r.V.8XX4KCP0rUV6qcCqYf/6CedN5hS/sXa","time":"2017-12-14T13:59:25.498Z"},"user":{"_id":"5a3274ce0093d43da8a2948f","isActive":true,"username":"joe","password":"$2a$10$NygZ7MQisJoxM/UkRIq1IOE7DXqpu8seOU7FMjQ4O4UFYTMXNGoAK","email":"joe@gma.com","timeCreated":"2017-12-14T12:55:42.239Z","roles":{"student":{"id":"5a3274ce0093d43da8a29490"}}},"scope":["student"]}

      const query = {
        courseName: request.query.courseName
      };

      Assignment.find(query, (err, assignments) => {
        if (err) {
          return reply(err);
        }
        reply(assignments);
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
  name: 'assignment'
};
