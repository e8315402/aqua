const EscapeRegExp = require('escape-string-regexp');
// const Joi = require('joi');


const internals = {};


internals.applyRoutes = function (server, next) {

    const Course = server.plugins['hapi-mongo-models'].Course;

    server.route({
        method: 'GET',
        path: '/courses',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            }
        },
        handler: function (request, reply) {

            const filter = {
                coursename: 'Software Engineering'
            };

            Course.find(filter, (err, results) => {
                if (err) {
                    return reply(err);
                }
                console.log(`\x1b[34m${JSON.stringify(results, null ,2)}\x1b[0m`);
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
