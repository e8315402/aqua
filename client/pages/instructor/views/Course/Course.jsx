const React = require('react');
const Actions = require('./actions');
const Store = require('./store');
const Results = require('./results.jsx');

class Course extends React.Component {
  constructor(props) {
    super(props);
    Actions.getResults();
    this.state = Store.getState();
  }
  componentDidMount() {
    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  onStoreChange() {
    this.setState(Store.getState());
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <Results {...this.state.results} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Course;
