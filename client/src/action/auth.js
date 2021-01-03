import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    GET_USERS,
    GET_USER
} from './types';


/* Load User */ 
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register User
export const register = ({ name, email, password }, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        } 
    }

    const body = JSON.stringify({ name, email, password });

    try { 
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'danger')));
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        } 
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

/* Login User */
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
     };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }


        dispatch({
            type: LOGIN_FAIL
        });
    }
}


// /* Get All users */
// export const  getUsers = () => async dispatch => { 
//     if(localStorage.token) {
//         setAuthToken(localStorage.token);
//     }

//     try{
//         const res = await axios.get('/api/users');

//         dispatch({
//             type: GET_USERS,
//             payload: res.data
//         });
//     } catch (err) { 
//         dispatch({
//             type: AUTH_ERROR
//         })
//     }
// }

export const getUsers = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users');

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


/* Get user By ID */
export const  getUser = id => async dispatch => { 
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get(`/api/users/${id}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (err) { 
        dispatch({
            type: AUTH_ERROR
        })
    }
}



/* Logout user and clear Profile */

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
}
