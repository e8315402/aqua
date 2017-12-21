
const React = require('react');


class InstructorPage extends React.Component {
  render() {

    return (
      <html>
        <head>
          <title>Programming Assignment Submission System</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/public/core.min.js"></script>
          <script src="/public/pages/instructor.min.js"></script>
        </body>
      </html>
    );
  }
}


module.exports = InstructorPage;
