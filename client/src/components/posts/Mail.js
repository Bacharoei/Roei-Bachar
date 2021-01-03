import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfile } from '../../action/profile'
import { Link } from 'react-router-dom';
import { addPost } from '../../action/post'


const Mail = ({
    getProfile,
    addPost,
    match,
    profile: { profile, profileId, loading },
    auth,
    history
}) => {

    const [formData, setFromData] = useState({
        sender: [auth.user.name],
        recevier: "",
        subject: "",
        text: "",
    });
    const { recevier, sender, subject, text } = formData;

    useEffect(() => {
        getProfile(match.params.id);
    }, [getProfile])

    const onChange = e => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        addPost(profileId, formData, history)
    }

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :
                <Fragment>
                    <Link to="/profiles" className="btn btn-dark">Back to profiles</Link>

                    <h1 className="large text-primary">Post mail</h1>
                    <div className="post-form">
                        <div className="bg-primary p">
                            <h3>Create new email </h3>
                        </div>
                    </div>

                    <form className="form" onSubmit={e => onSubmit(e)} >
                        <div className="form-group">

                            <label for="sender" >Sender</label>
                            <input
                                type="text"
                                placeholder="sender"
                                name="sender"
                                value={sender}
                                onChange={e => onChange(e)}
                                disabled
                            />
                        </div>



                        <div className="form-group">
                            <select value={recevier} onChange={e => onChange(e)} name="recevier">
                                <option value="0"> * Select User </option>
                                <option value={profile.user._id}> {profile.user.name} </option>

                            </select>
                        </div>




                        <div className="form-group">
                            <label for="subject" >subject</label>

                            <input
                                type="text"
                                placeholder="subject"
                                name="subject"
                                value={subject}
                                onChange={e => onChange(e)}

                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="text"
                                cols="30"
                                rows="5"
                                placeholder="your message"
                                value={text}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <input type="submit" class="btn btn-dark my-1" value="Submit"></input>



                    </form>







                </Fragment>}
        </Fragment>
    )
}

Mail.propTypes = {
    getProfile: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth


});

export default connect(mapStateToProps, { getProfile, addPost })(Mail)
