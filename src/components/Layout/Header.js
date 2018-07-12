import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import userActions from '../../actions/userActions';

import './header.css';

function mapStoreToProps(store) {
  return {
    user: store.user,
  };
}
class Header extends React.Component {
  onLogout = () => {
    this.props.dispatch(userActions.logout());
  };

  renderLogoutButtons(username) {
    return (
      <div className="Header__bar__end">
        <Link to={`/user/${username}`} className="Header__bar__item">
          {username}
        </Link>
        <button type="button" onClick={this.onLogout}>
          <span className="icon has-text-grey">
            <i className="fas fa-power-off" />
          </span>
        </button>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <header className="Header">
        <div className="container">
          <div className="Header__bar">
            <Link to="/">
              <h1 className="title">
                G<span className="is-hidden-mobile">uess </span>T<span className="is-hidden-mobile">
                  he{' '}
                </span>G<span className="is-hidden-mobile">ame</span>!
              </h1>
            </Link>
            <Link to="/play" className="Header__bar__item">
              <span className="icon has-text-primary">
                <i className="fas fa-play" />
              </span>
              <span>Play</span>
            </Link>
            {user.username && (
              <Link to="/add-screenshot" className="Header__bar__item">
                <span className="icon has-text-grey">
                  <i className="fas fa-plus" />
                </span>
                <span>
                  Add <span className="is-hidden-mobile">Screenshot</span>
                </span>
              </Link>
            )}

            {user.username && this.renderLogoutButtons(user.username)}
            {!user.username && renderLoginButtons()}
          </div>
        </div>
      </header>
    );
  }
}
export default connect(mapStoreToProps)(Header);

function renderLoginButtons() {
  return (
    <div className="Header__bar__end">
      <Link to="/login" className="button is-primary">
        Login
      </Link>
      <Link to="/register" className="button is-primary">
        Register
      </Link>
    </div>
  );
}
