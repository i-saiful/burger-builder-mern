import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_docode from 'jwt-decode'

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password
    }

    let url = process.env.REACT_APP_BACKEND_URL
    console.log(url);
    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = `${url}/user`;
    } else {
        authUrl = `${url}/user/auth`
    }
    axios.post(authUrl, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user._id);
            let decode = jwt_docode(response.data.token)
            const expirationTime = new Date(decode.exp * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.token, response.data.user._id));
        })
        .catch(err => {
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data));
        })
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Logout
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            // Logout
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
