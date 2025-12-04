import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from './ActionTypes';
import { API_BASE_URL } from '../../config/api';
import syncGuestCartToServer from '../../utils/sync-cart-to-server';
import { store } from '../Store';

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
      // Fetch user profile for fresh data
      await dispatch(getUser(user.jwt));
    }

    console.log('Register successful:', user);
    dispatch(registerSuccess(user));
    syncGuestCartToServer(user.jwt, store.dispatch);
  } catch (error) {
    const errMsg = error.response?.data?.error || error.message;
    dispatch(registerFailure(errMsg));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
      // Fetch user profile for fresh data
      await dispatch(getUser(user.jwt));
    }

    console.log('Login successful:', user);
    syncGuestCartToServer(user.jwt, store.dispatch);
    dispatch(loginSuccess(user));
  } catch (error) {
    console.log('error', error);
    const errMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    console.error('Login error:', errMsg);
    dispatch(loginFailure(errMsg));
  }
};

export const loginWithGoogle = (credential) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
      token: credential,
    });

    const user = response.data;

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
      // Fetch user profile for fresh data
      await dispatch(getUser(user.jwt));
    }

    console.log('Google login successful:', user);
    syncGuestCartToServer(user.jwt, store.dispatch);
    dispatch(loginSuccess(user));
  } catch (error) {
    const errMsg = error.response?.data?.error || error.message;
    console.error('Google login error:', errMsg);
    dispatch(loginFailure(errMsg));
  }
};

// Get user from token
export const getUser = (token) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    console.error('Error fetching user:111111111', error);
    const errMsg = error.response?.data?.error || error.message;
    if (errMsg == "User Not Found, Please Login Again") {
      localStorage.clear();
      window.location.href = '/';
    }
    dispatch({ type: GET_USER_FAILURE, payload: errMsg });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
  window.location.href = '/';
};
