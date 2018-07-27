import axios from '../../axios-backend';

import * as actionTypes from './actionTypes';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

const authLoginSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    token: token,
    userId: userId
  }
}

const authSignupSuccess = (userId) => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
    userId: userId
  }
}

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
      setTimeout(() => {
          dispatch(logout());
      }, expirationTime * 1000);
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password
    }
    const url = '/auth/signin';
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.userId);
        dispatch(authLoginSuccess(response.data.token, response.data.userId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
} 

export const signup = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      firstName,
      lastName,
      email,
      password,
    }
    const url = '/auth/signup';
    axios.post(url, authData)
      .then(response => {
        dispatch(authSignupSuccess(response.data._id));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
} 

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logout());
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if (expirationDate <= new Date()) {
              dispatch(logout());
          } else {
              const userId = localStorage.getItem('userId');
              dispatch(authLoginSuccess(token, userId));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
          }   
      }
  }
}