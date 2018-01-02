
const CoursePlugin = require('../../../server/api/courses');
const AuthPlugin = require('../../../server/auth');
const AuthenticatedStudent = require('../fixtures/credentials-student');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const HapiAuth = require('hapi-auth-cookie');
const Lab = require('lab');
const MakeMockModel = require('../fixtures/make-mock-model');
const Manifest = require('../../../manifest');
const Path = require('path');
const Proxyquire = require('proxyquire');


const lab = exports.lab = Lab.script();
let request;
let server;
let stub;


lab.before((done) => {
    stub = {
        Course: MakeMockModel(),
        Status: MakeMockModel(),
        User: MakeMockModel()
    };

    const proxy = {};
    proxy[Path.join(process.cwd(), './server/models/course')] = stub.Course;
    proxy[Path.join(process.cwd(), './server/models/status')] = stub.Status;
    proxy[Path.join(process.cwd(), './server/models/user')] = stub.User;

    const ModelsPlugin = {
        register: Proxyquire('hapi-mongo-models', proxy),
        options: Manifest.get('/registrations').filter((reg) => {

            if (reg.plugin &&
                reg.plugin.register &&
                reg.plugin.register === 'hapi-mongo-models') {

                return true;
            }

            return false;
        })[0].plugin.options
    };

    const plugins = [HapiAuth, ModelsPlugin, AuthPlugin, CoursePlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});


lab.after((done) => {
    server.plugins['hapi-mongo-models'].MongoModels.disconnect();
    done();
});


lab.experiment('Courses Plugin Result List', () => {

    lab.beforeEach((done) => {
        request = {
            method: 'GET',
            url: '/courses',
            credentials: AuthenticatedStudent
        };
        done();
    });

    lab.test('it returns an error when find fails', (done) => {

        stub.Course.find = function () {

            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();

            callback(Error('find failed'));
        };
        request.url += '?type=student&id=105598067';
        server.inject(request, (response) => {
            Code.expect(response.statusCode).to.equal(500);
            done();
        });
    });

    lab.test('it returns an array of courses of the student', (done) => {

        const realFindByStudentId = stub.Course.findByStudentId;

        stub.Course.find = function () {

            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();

            callback(null, { data: [{}, {}, {}] });
        };

        request.url += '?type=student&id=105598067';

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result.data).to.be.an.array();
            Code.expect(response.result.data[0]).to.be.an.object();
            Code.expect(response.result.data[1]).to.be.an.object();
            Code.expect(response.result.data[2]).to.be.an.object();

            stub.Course.findByStudentId = realFindByStudentId;

            done();
        });
    });

    lab.test('it returns an array of course of the instructor', (done) => {
        const realFindByStudentId = stub.Course.findByStudentId;

        stub.Course.find = function () {

            const args = Array.prototype.slice.call(arguments);
            const callback = args.pop();

            callback(null, { data: [{}, {}, {}] });
        };

        request.url += '?type=instructor&id=105598067';

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result.data).to.be.an.array();
            Code.expect(response.result.data[0]).to.be.an.object();
            Code.expect(response.result.data[1]).to.be.an.object();
            Code.expect(response.result.data[2]).to.be.an.object();

            stub.Course.findByStudentId = realFindByStudentId;

            done();
        });
    });
});
