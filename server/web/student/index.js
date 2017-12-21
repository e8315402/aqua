


const internals = {};


internals.applyRoutes = function (server, next) {

  server.route({
    method: 'GET',
    path: '/student/{glob*}',
    config: {
      auth: {
        strategy: 'session',
        scope: 'student'
      }
    },
    handler: function (request, reply) {

      reply.view('student/index');
    }
  });


  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

  next();
};


exports.register.attributes = {
  name: 'web/student'
};
