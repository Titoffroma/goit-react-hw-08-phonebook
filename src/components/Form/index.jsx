import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/ButtonStyled';
import { Label, FormButton } from './FormStyled';
import { connect } from 'react-redux';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  clearValue = e => {
    this.setState({ name: '', number: '' });
    this.props.handleSubmit(e);
  };

  handleChange = e => {
    this.setState({ [e.target.getAttribute('id')]: e.target.value });
  };

  handleAwait(el) {
    el.setAttribute('disabled', '');
  }

  render() {
    const { isLoading } = this.props;
    const disabled = { disabled: isLoading };
    return (
      <form onSubmit={this.clearValue}>
        <Label>
          <strong>Name</strong>
          <br />
          <Button
            as="input"
            type="text"
            required
            id="name"
            value={this.state.name}
            {...disabled}
            onChange={this.handleChange}
          />
        </Label>
        <br />
        <Label>
          <strong>Number</strong>
          <br />
          <Button
            as="input"
            type="tel"
            required
            id="number"
            value={this.state.number}
            {...disabled}
            onChange={this.handleChange}
          />
        </Label>
        <br />
        <FormButton {...disabled}>Add contact</FormButton>
      </form>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({
  isLoading: contacts.isLoading,
});

export default connect(mapStateToProps)(Form);
