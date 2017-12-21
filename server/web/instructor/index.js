


const internals = {};


internals.applyRoutes = function (server, next) {

  server.route({
    method: 'GET',
    path: '/instructor/{glob*}',
    config: {
      auth: {
        strategy: 'session',
        scope:'instructor'
      }
    },
    handler: function (request, reply) {
      reply.view('instructor/index');
    }
  });


  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

  next();
};


exports.register.attributes = {
  name: 'web/instructor'
};
