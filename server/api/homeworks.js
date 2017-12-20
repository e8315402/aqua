const Joi = require('joi');

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
          courseName: Joi.string().required()
        }
      }
    },
    handler: function (request, reply) {
      // console.log(`${JSON.stringify(request.auth.credentials)}`);
      // {"session":{"_id":"5a3514b00d647f1724f459d3","userId":"5a3513764d88c113c49e75da","key":"$2a$10$S0xFSvE1kcz0ykt/CZpdL.rXLXCPtSEXqQ6t/9ANhOurU4Aw9uUKS","time":"2017-12-16T12:42:24.438Z"},"user":{"_id":"5a3513764d88c113c49e75da","isActive":true,"username":"james","password":"$2a$10$cVGpuFYa6dHjzVXAdx/VluLf0M9ZcISqoUkvchotR41Hye7bgTXHi","email":"default@gmail.com","timeCreated":"2017-12-16T12:37:10.793Z","roles":{"student":{"studentId":"105598047"}}},"scope":["student"]}
      let query = { courseName: request.query.courseName };
      if(request.auth.credentials.user.roles.student){
        query.studentId = request.auth.credentials.user.roles.student.studentId
      }
      
      Homework.find(query, (err, homeworks) => {
        if (err) {
          return reply(err);
        }
        reply(homeworks);
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
