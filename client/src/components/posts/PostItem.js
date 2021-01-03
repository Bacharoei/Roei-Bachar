import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../action/post';

const PostItem = ({

    deletePost,
    auth,
    post: {
        _id,
        text,
        recevier,
        subject,
        name,
        avatar,
        date
    } }) => {

    return (
        <Fragment>
            {auth.isAuthenticated && !auth.loading ? (
                <Fragment>
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <Link to={`/profiles`}>
                                <img className='round-img' src={avatar} alt="up" />
                                <p>Sent by:</p>
                                <h4>{name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className='my-1'><strong>Subject: </strong>{subject}</p>
                            <p className='my-1'> <strong>Message: </strong> {text}</p>
                            <p className="post-date">sent on {' '}
                                <Moment format="DD/MM/YYYY">{date}</Moment>
                            </p>
                            <button onClick={e => deletePost(recevier, _id)} type="button" className="btn btn-danger my-1">
                                <i className="fas fa-times" />
                            </button>
                        </div>
                    </div>
                </Fragment>
            ) : <h4> No posts found...</h4>}




        </Fragment>

    )
}


PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});


export default connect(mapStateToProps, { deletePost })(PostItem)
