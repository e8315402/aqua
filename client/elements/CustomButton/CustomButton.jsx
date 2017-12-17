const React = require('react');
const Button = require('react-bootstrap').Button;
const ClassNames = require('classnames');
const PropTypes = require('prop-types');

class CustomButton extends React.Component {
  render() {
    const { fill, simple, pullRight, block, ...rest } = this.props;

    const btnClasses = ClassNames({
      'btn-fill': fill,
      'btn-simple': simple,
      'pull-right': pullRight,
      'btn-block': block
    });

    return (
      <Button
        className={btnClasses}
        {...rest}
      />
    );
  }
}

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool
};

module.exports = CustomButton;
