import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../action/auth';



const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {


    const authLinks = (
        <ul>
          <li>
            <Link to={`/dashboard`}>
              <i className="fas fa-user"></i>{' '}
              <span className="hide-sm">Dashboard</span></Link>
          </li>
          <li>
            <Link onClick={logout} to="/">
              <i className="fas fa-sign-out-alt"></i>{' '}
              <span className="hide-sm">Logout</span></Link>
          </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/login">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Login</span></Link>
            </li>
            <li>
                <Link to="/register">
                    <i className="fas fa-key"></i>{' '}
                    <span className="hide-sm">Register</span></Link>
            </li>
        </ul>

    );


    return (
        <nav className="navbar bg-dark">

            <h2>
                <Link to="/">
                    <i className="fas fa-envelope" /> Herolo Email System
        </Link>
            </h2>
            {
                !loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks} </Fragment>)
            }

        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});


export default connect(mapStateToProps, {  logout })(Navbar);