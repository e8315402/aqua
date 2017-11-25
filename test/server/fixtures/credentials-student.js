
const Student = require('../../../server/models/student');
const User = require('../../../server/models/user');


const user = new User({
    username: 'stimpy',
    roles: {
        account: {
            id: '5250W35',
            name: 'Stimpson J Cat'
        }
    },
    _roles: {
        student: new Student({
            _id: '5250W35',
            name: {
                first: 'Stimpson',
                middle: 'J',
                last: 'Cat'
            }
        })
    }
});


module.exports = {
    user,
    roles: user._roles,
    scope: Object.keys(user.roles)
};
