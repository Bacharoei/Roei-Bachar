import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';



const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
    },

}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="user-pic" className="round-img" />
            <div>
                <h2>{name}</h2>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                    send mail
                </Link>
            </div>

        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,


}

export default ProfileItem
