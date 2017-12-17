/* global window */

const Alert = require('../../../components/alert.jsx');
const Button = require('../../../components/form/button.jsx');
const PropTypes = require('prop-types');
const React = require('react');
const Spinner = require('../../../components/form/spinner.jsx');


const propTypes = {
  action: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool
};


class DeleteForm extends React.Component {
  handleSubmit(event) {

    event.preventDefault();
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.props.action();
  }

  render() {

    let alert;

    if (this.props.error) {
      alert = <Alert type="danger" message={this.props.error} />;
    }

    return (
      <div className="panel panel-danger panel-danger-zone">
        <div className="panel-heading">
          <h3 className="panel-title">Danger zone</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit.bind(this)}>
            {alert}
            <Button
              type="submit"
              inputClasses={{
                'btn-danger': true,
                'pull-right': true
              }}
              disabled={this.props.loading}>

                            Delete
              <Spinner
                space="left"
                show={this.props.loading}
              />
            </Button>
            <p>
                            This cannot be undone and could result in
                            orphaned document relationships.
            </p>
          </form>
        </div>
      </div>
    );
  }
}

DeleteForm.propTypes = propTypes;


module.exports = DeleteForm;
