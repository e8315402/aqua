'use strict';


const internals = {};


internals.applyRoutes = function (server, next) {

    server.route({
        method: 'GET',
        path: '/account/{glob*}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'student'
            }
        },
        handler: function (request, reply) {

            reply.view('account/index');
        }
    });


    next();
};


exports.register = function (server, options, next) {

    server.dependency(['auth', 'hapi-mongo-models'], internals.applyRoutes);

    next();
};


exports.register.attributes = {
    name: 'web/account'
};
