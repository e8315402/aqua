const EscapeRegExp = require('escape-string-regexp');
const Joi = require('joi');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Course = server.plugins['hapi-mongo-models'].Course;

    server.route({
        method: 'GET',
        path: '/courses',
        config: {
            auth: {
                strategy: 'session',
                scope: 'student'
            },
            validate: {
                query: {
                    studentId: Joi.string().length(9).required()
                }
            }
        },
        handler: function (request, reply) {

            Course.findByStudentId(request.query.studentId, (err, results) => {
                if (err) {
                    return reply(err);
                }

                reply(results);
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
    name: 'course'
};
