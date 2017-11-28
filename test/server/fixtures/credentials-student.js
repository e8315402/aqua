
const Student = require('../../../server/models/student');
const User = require('../../../server/models/user');


const user = new User({
    username: 'James',
    roles: {
        student: {
            id: '105598047'
        }
    },
    _roles: {
        student: new Student({
            _id: '105598047'
        })
    }
});


module.exports = {
    user,
    roles: user._roles,
    scope: Object.keys(user.roles)
};
