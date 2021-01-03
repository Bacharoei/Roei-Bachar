import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import img from '../../img/logo.jpg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) { 
   return <Redirect to='/dashboard' />
  }
    return (
        <section className="landing">
          
        <div className="dark-overlay">
          <div className="landing-inner">
          <img className="logo-img" src={img} alt="/" />
            <h1 className="x-large ">
            <i className="fas fa-envelope text-primary" alt=""></i> Herolo Email System
              </h1>
            <p className="lead">
            weolcome to Herolo Email System
            </p>
            <p className="lead">
            Get more with Herolo Emgail
            </p>
            <div className="buttons">

              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}  


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, )(Landing)
