import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { deleteAccount } from '../../action/profile';
import { getUser } from '../../action/auth';
import { Link } from 'react-router-dom'


const Dashboard = ({
    getUser,
    match,
    auth: { user, loading },
    deleteAccount
}) => {


    useEffect(() => {
        getUser(match.params.id);
    }, [getUser]);


    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary"> Dashboard </h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            <Link to={`/users/${user && user._id}`} className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Ibox  </Link>
            <Link to="/profiles" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> New Email </Link>
            <div className="my-2">
                <button className="btn btn-danger" onClick={e => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete My Account
                    </button>
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    getUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});


export default connect(
    mapStateToProps,
    { getUser, deleteAccount })(Dashboard)

