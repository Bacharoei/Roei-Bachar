import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUsers } from '../../action/auth';
import Pitem from './Pitem';


const Profiles = ({ getUsers, user: { users, loading } }) => {
    
    useEffect(() => {
        getUsers();
     }, [ getUsers]);

    return ( 
    <Fragment>
        { loading ? <Spinner /> : <Fragment>
            <h1 class="large text-primary">Users List</h1>
            <p class="lead">
                <i class="fab fa-connectdevelop"></i>Browse and connect with users
            </p>
            <div class="profiles">
            {users.length > 0 ? (
                    users.map(user => (
                        <Fragment>
                            <Pitem key={user._id} user={user} />                       
                        </Fragment>
                    ))
                ) : <h4> No profiles found... </h4>}   
            </div>
            </Fragment>}  
    </Fragment>
     );
};

Profiles.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

  const mapStateToProps = state => ({
    profile: state.profile,
    user: state.auth,

  });
  
export default connect(mapStateToProps, { getUsers} )(Profiles)

