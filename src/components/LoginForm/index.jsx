import React, { Component } from 'react';
import Button from '../Button/ButtonStyled';
import { Label, FormButton } from '../Form/FormStyled';
import { connect } from 'react-redux';
import { BASE_URL } from '../../API/index';
import { addMessage, clearMessage, setLoadingState } from '../../redux/actions';
import { setAuthState, setUserInfo } from '../../redux/userActions';

class LoginForm extends Component {
  state = {
    errors: [],
    email: '',
    password: '',
  };

  addMessage({ error, success }) {
    this.clearMessage();
    this.props.addMessage({
      error: error || false,
      success: success || false,
    });
  }

  clearMessage() {
    this.setState({ isMessage: true });
    setTimeout(() => {
      this.props.clearMessage();
      this.setState({ isMessage: false });
    }, 3000);
  }

  handleChange = e => {
    this.setState({ [e.target.getAttribute('id')]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const body = JSON.stringify(data);

    this.props.setLoadingState(true);

    fetch(`${BASE_URL}users\/login`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
      },
      body,
    })
      .then(responce => responce.json())
      .then(data => {
        if (data.message) this.addMessage({ error: data.message });
        else if (data.token) {
          this.props.setAuthState(data.token);
          this.props.setUserInfo(data.user);
        }
      })
      .catch(error => {
        this.addMessage({ error: error.message });
      })
      .finally(() => this.props.setLoadingState(false));
  };

  render() {
    const { isLoading } = this.props;
    const disabled = { disabled: isLoading };
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <Label>
            <strong>Email</strong>
            <br />
            <Button
              as="input"
              type="email"
              required
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Label>
          <br />
          <Label>
            <strong>Password</strong>
            <br />
            <Button
              as="input"
              type="password"
              required
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Label>
          <br />
          <FormButton {...disabled}>Login</FormButton>
          <Button as="a" href="/register" style={{ border: 'none' }}>
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isLoading: store.isLoading,
});

export default connect(mapStateToProps, {
  addMessage,
  clearMessage,
  setLoadingState,
  setAuthState,
  setUserInfo,
})(LoginForm);
