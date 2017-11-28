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
                scope: ['student', 'instructor']
            },
            validate: {
                query: {
                    id: Joi.string().length(9).required(),
                    type:Joi.string().regex(/(student|instructor)$/).required()
                }
            }
        },
        handler: function (request, reply) {
            const filter = request.query.type === 'student' ? {
                'student._id': request.query.id
            } : {
                'instructor.id': request.query.id
            };
            Course.find(filter, reply);
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
