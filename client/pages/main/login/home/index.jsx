
// import logo from '../../../../assets/img/homework256.png';
// const logo = require('../../../../assets/img/homework256.png');
const Actions = require('../actions');
const Button = require('../../../../components/form/button.jsx');
const ControlGroup = require('../../../../components/form/control-group.jsx');
const React = require('react');
const ReactHelmet = require('react-helmet');
const ReactRouter = require('react-router-dom');
const Spinner = require('../../../../components/form/spinner.jsx');
const Store = require('./store');
const TextControl = require('../../../../components/form/text-control.jsx');


const Helmet = ReactHelmet.Helmet;
const Link = ReactRouter.Link;


class LoginPage extends React.Component {
  constructor(props) {

    super(props);

    Actions.getUserCreds();

    this.input = {};
    this.state = Store.getState();
  }

  componentDidMount() {

    this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));

    if (this.input.username) {
      this.input.username.focus();
    }
  }

  componentWillUnmount() {

    this.unsubscribeStore();
  }

  onStoreChange() {

    this.setState(Store.getState());
  }

  handleSubmit(event) {

    event.preventDefault();
    event.stopPropagation();

    Actions.login({
      username: this.input.username.value(),
      password: this.input.password.value()
    });
  }

  render() {

    const alerts = [];

    if (this.state.success) {
      alerts.push(<div key="success" className="alert alert-success">
                Success. Redirecting...
      </div>);
    }

    if (this.state.error) {
      alerts.push(<div key="danger" className="alert alert-danger">
        {this.state.error}
      </div>);
    }

    let formElements;

    if (!this.state.success) {
      formElements = <fieldset>
        <TextControl
          ref={(c) => (this.input.username = c)}
          name="username"
          label="Username or email"
          hasError={this.state.hasError.username}
          help={this.state.help.username}
          disabled={this.state.loading}
        />
        <TextControl
          ref={(c) => (this.input.password = c)}
          name="password"
          label="Password"
          type="password"
          hasError={this.state.hasError.password}
          help={this.state.help.password}
          disabled={this.state.loading}
        />
        <ControlGroup hideLabel={true} hideHelp={true}>
          <Button
            type="submit"
            inputClasses={{ 'btn-primary': true }}
            disabled={this.state.loading}>

                        Sign in
            <Spinner space="left" show={this.state.loading} />
          </Button>
          {/* <a href="/signup">Sign up</a> */}
          {<Link to="/login/forgot" className="btn btn-link">Forgot your password?</Link>}
        </ControlGroup>
        <Link to="/signup" className="btn btn-link">Sign up</Link>
      </fieldset>;
    }

    return (
      <section className="container">
        <Helmet>
          <title>Sign in</title>
        </Helmet>
        <div className="container">
          <h1 className="page-header">Sign in</h1>
          <div className="row">
            <div className="col-sm-6">
              <form onSubmit={this.handleSubmit.bind(this)}>
                {alerts}
                {formElements}
              </form>
            </div>
            <div className="col-sm-6" style={{ 'textAlign':'center' }}>
              <img src="http://127.0.0.1:8000/public/media/homework256.png" alt="logo_image" height="160px"/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


module.exports = LoginPage;
