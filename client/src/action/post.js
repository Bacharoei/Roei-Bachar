import axios from 'axios';
import { setAlert } from './alert';

import { 
    GET_POSTS, 
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    GET_POST,

} from './types';

/* Get Posts  */
export const  getPosts = () => async dispatch => { 
    try{
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}

/* Add Post  */
export const  addPost = (userId, formData, history) => async dispatch => { 
    const config = {
        headers: {
            'Conetent-Type': 'Application/json'
        }
    }

    try{
        const res = await axios.post(`/api/posts/${userId}`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created, Back to dashboard', 'success'))
        window.scrollTo({top: 0, behavior: "smooth"});
        setTimeout(() => { 
            history.push('/dashboard')
        }, 2500)
        
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}

/* Get Post  */
export const  getPost = (userId) => async dispatch => { 

    try{
        const res = await axios.get(`/api/posts/users/${userId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });

    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}


/* Delete Post  */
export const  deletePost = (userId, postId) => async dispatch => { 

    try{
        await axios.delete(`/api/posts/users/${userId}/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert('Post removed', 'success'))
    } catch (err) { 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}




