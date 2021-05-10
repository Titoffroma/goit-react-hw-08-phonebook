import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/ButtonStyled';
import { connect } from 'react-redux';
import { setLoadingState } from '../../redux/actions';
import { setAuthState } from '../../redux/userActions';
import { BASE_URL } from '../../API';

class UserMenu extends Component {
  handleClick = e => {
    this.props.setLoadingState(true);

    const headers = new Headers({
      accept: 'application/json',
      authorization: 'Bearer ' + this.props.token,
    });

    const request = new Request(`${BASE_URL}users\/logout`, {
      method: 'POST',
      headers,
    });

    fetch(request).then(response => {
      if (response.ok) this.props.setAuthState(false);
      else this.props.setLoadingState(false);
    });
  };

  render() {
    const { isLoading, user, token } = this.props;
    const userMail = user ? user.email : '';
    const disabled = { disabled: isLoading };
    return (
      token && (
        <div>
          <Button
            as="input"
            disabled
            value={userMail}
            style={{ border: 'none' }}
          />
          <Button {...disabled} onClick={this.handleClick}>
            Logout
          </Button>
        </div>
      )
    );
  }
}

const mapStateToProps = ({ user, contacts }) => ({
  token: user.Auth,
  user: user.user,
  isLoading: contacts.isLoading,
});

export default connect(mapStateToProps, { setAuthState, setLoadingState })(
  UserMenu,
);
