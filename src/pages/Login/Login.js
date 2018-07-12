import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import userActions from '../../actions/userActions';

function mapStoreToProps(store) {
  return {
    user: store.user,
  };
}
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      error: false,
      username: '',
      password: '',
    };
  }

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
    });
  };

  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      submitting: true,
      error: false,
    });
    userService
      .login({
        username: this.state.username.trim(),
        password: this.state.password,
      })
      .then(res => {
        const newState = {
          submitting: false,
        };
        if (!res.error) {
          newState.username = '';
          newState.password = '';
          this.props.dispatch(userActions.login(res));
        } else {
          newState.error = res.message;
        }
        this.setState(newState);
      });
  };

  renderForm() {
    const { username, password, submitting, error } = this.state;

    const valid = username && password;

    return (
      <form className="LoginPage__form" onSubmit={this.handleSubmit}>
        <h2 className="subtitle">Login form</h2>
        <div className="field">
          <label className="label" htmlFor="username">
            Username or email
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Type your username or your email"
              value={username.value}
              onChange={this.onUsernameChange}
            />
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Type your password"
              value={password.value}
              onChange={this.onPasswordChange}
            />
          </label>
          {password.error && <p className="help is-danger">{password.error}</p>}
        </div>

        {error && <p className="notification is-danger">{error}</p>}
        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className="button is-link"
              disabled={!valid || submitting}
            >
              Submit{submitting && 'ting...'}
            </button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-text">
              Register instead
            </Link>
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <section className="LoginPage smallContainer">
        {!user.username && this.renderForm()}
        {user.username && (
          <div className="notification is-info">
            <p>
              You are logged in! <Link to="/logout">Log out</Link>
            </p>
          </div>
        )}
      </section>
    );
  }
}
export default connect(mapStoreToProps)(LoginPage);