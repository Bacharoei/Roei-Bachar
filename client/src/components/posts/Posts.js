import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { getPost } from '../../action/post'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
import PostItem from './PostItem';


const Posts = ({ getPost, auth, match, post: {post, recevier, user, loading}, }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return ( 
    <Fragment>
    {loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to your Ibox
            </p>
            <Link to="/dashboard" className="btn"> back to dashboard </Link>
            <div className="posts">
                {user === recevier  && (
                    <Fragment>
                    <div className="posts">
                        {post.length > 0 ? (
                            post.map(post => (
                                <PostItem key={post._id} post={post} />
                            ))
                        ) : <h4> No posts found...</h4>}
                    </div>
                    </Fragment>

                )}
                        
                
            </div>
             </Fragment>
    }
</Fragment>
    )}

Posts.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth

    
})


export default connect(mapStateToProps, { getPost })(Posts)
