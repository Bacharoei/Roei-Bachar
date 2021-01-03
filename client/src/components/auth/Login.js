import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../action/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({ email, password });
    };

    // Redirerct if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }


    return (
        <Fragment>
            <Alert />
            <section className="container ">
                <h1 className="large text-primary">
                    <i className="fas fa-user" />
                    {' '} Sign In
                </h1>
                <p className="lead">
                    sign into your account
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            minLength="5"
                            required
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>

                <p className="my-1 lead">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>

            </section>



        </Fragment>

    )

}

Login.prototype = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
