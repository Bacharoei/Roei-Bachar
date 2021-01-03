import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { setAlert } from '../../action/alert';
import { register } from '../../action/auth';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2} = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Password Dont match', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    };

    return (
        <Fragment>
            <Alert />
            <section className="container">
                <h1 className="large text-primary mb-0">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Create Your Account
                </p>
                <small className="form-text">
                    This site use your personal email
                </small>

                <form onSubmit={e => onSubmit(e)} className="form">
                    <div className="form-group">
                        <input 
                        type="text" 
                        name="name"
                        placeholder="Name" 
                        value={name} 
                        onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input 
                        type="email"
                        name="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password"
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => onChange(e)}                                 
                        minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        name="password2" 
                        placeholder="Confirm Password" 
                        value={password2} 
                        onChange={e => onChange(e)} 
                        minLength="6" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="register" />
                </form>
                <p className="my-1 lead">
                    Already have an account?
                    <Link to="/login">Sign In</Link>
                </p>
            </section>
            
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
