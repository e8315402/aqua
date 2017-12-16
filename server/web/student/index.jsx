
const React = require('react');


class AdminPage extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <title>Student</title>
                </head>
                <body>
                    <div id="root"></div>
                    <script src="/public/core.min.js"></script>
                    <script src="/public/pages/student.min.js"></script>
                </body>
            </html>
        );
    }
}


module.exports = AdminPage;
