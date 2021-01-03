import axios from 'axios';
import { setAlert } from './alert';

import { 
    GET_PROFILE, 
    PROFILE_ERROR,
    GET_PROFILES,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    // GET_REPOS
} from './types';

/* Get User Profile */
export const  getUserProfile = () => async dispatch => { 

    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}

/* Get All Profiles */
export const  getProfiles = () => async dispatch => { 
    dispatch({type: CLEAR_PROFILE});

    try{
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}

/* Get Profile By ID */
export const  getProfile = id => async dispatch => { 

    try{
        const res = await axios.get(`/api/profile/user/${id}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}

/* Get user By ID */
export const  getUser = id => async dispatch => { 
    try{
        const res = await axios.get(`/api/users/${id}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}

/* Get All Profiles */
export const  getUsers = () => async dispatch => { 
    dispatch({type: CLEAR_PROFILE});

    try{
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }

        });
    }
}




// Create or update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => { 
    try {
        const config = { 
            headers: { 
                'Conetent-Type': 'Application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        
        dispatch({ 
            type: GET_PROFILE,
            payload: res.data
         });

        dispatch(setAlert(edit ? ' Profile updated, back to dashboard' : ' Profile Created, back to dashboard', 'success'));
        // history.push('/dash')
        setTimeout(() => { 
            history.push('/dash')
        }, 2500)
        

        if(!edit) { 
            history.push('/dash');
            
        }


     } catch (err) { 
        const errors = err.response.data.errors;

        if(errors){
            errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

     }
}


        //Delete Account & profile
        export const deleteAccount = () => async dispatch => { 
            if(window.confirm('Are you sure? this can NOT be undone')) {
                try {
                    await axios.delete('/api/profile');
    
                    dispatch({type: CLEAR_PROFILE});
                    dispatch({type: ACCOUNT_DELETED});
    
                    dispatch(setAlert('Your Account has been permanantly deleted'));
                    
                } catch (err) {
                    dispatch({
                        type: PROFILE_ERROR,
                        payload: { msg: err.response.statusText, status: err.response.status}
                    });
                    
                }
            }
        }




     
    
