
const Actions = require('./actions');
const Alert = require('../../../../components/alert.jsx');
const Button = require('../../../../components/form/button.jsx');
const ControlGroup = require('../../../../components/form/control-group.jsx');
const LinkState = require('../../../../helpers/link-state');
const PropTypes = require('prop-types');
const React = require('react');
const SelectControl = require('../../../../components/form/select-control.jsx');
const Spinner = require('../../../../components/form/spinner.jsx');
const TextControl = require('../../../../components/form/text-control.jsx');


const propTypes = {
  _id: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.string,
  hasError: PropTypes.object,
  help: PropTypes.object,
  isActive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  loading: PropTypes.bool,
  showSaveSuccess: PropTypes.bool,
  username: PropTypes.string
};


class DetailsForm extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      isActive: props.isActive,
      username: props.username,
      email: props.email
    };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      isActive: nextProps.isActive,
      username: nextProps.username,
      email: nextProps.email
    });
  }

  handleSubmit(event) {

    event.preventDefault();
    event.stopPropagation();

    const id = this.props._id;
    const data = {
      isActive: this.state.isActive,
      username: this.state.username,
      email: this.state.email
    };

    Actions.saveDetails(id, data);
  }

  render() {

    const alerts = [];

    if (this.props.showSaveSuccess) {
      alerts.push(<Alert
        key="success"
        type="success"
        onClose={Actions.hideDetailsSaveSuccess}
        message="Success. Changes have been saved."
      />);
    }

    if (this.props.error) {
      alerts.push(<Alert
        key="danger"
        type="danger"
        message={this.props.error}
      />);
    }

    const formElements = <fieldset>
      <legend>Details</legend>
      {alerts}
      <SelectControl
        name="isActive"
        label="Active"
        value={this.state.isActive}
        onChange={LinkState.bind(this)}
        hasError={this.props.hasError.isActive}
        help={this.props.help.isActive}
        disabled={this.props.loading}>

        <option value={true}>true</option>
        <option value={false}>false</option>
      </SelectControl>
      <TextControl
        name="username"
        label="Username"
        value={this.state.username}
        onChange={LinkState.bind(this)}
        hasError={this.props.hasError.username}
        help={this.props.help.username}
        disabled={this.props.loading}
      />
      <TextControl
        name="email"
        label="Email"
        value={this.state.email}
        onChange={LinkState.bind(this)}
        hasError={this.props.hasError.email}
        help={this.props.help.email}
        disabled={this.props.loading}
      />
      <ControlGroup hideLabel={true} hideHelp={true}>
        <Button
          type="submit"
          inputClasses={{ 'btn-primary': true }}
          disabled={this.props.loading}>

                    Save changes
          <Spinner space="left" show={this.props.loading} />
        </Button>
      </ControlGroup>
    </fieldset>;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {formElements}
      </form>
    );
  }
}

DetailsForm.propTypes = propTypes;


module.exports = DetailsForm;
