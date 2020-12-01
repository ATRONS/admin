import axios from 'axios';
import { handleError, handleResponse } from './response';
import URLs from './urls';

const login = (email, password) => {
  return axios
    .post(`${URLs.MAIN_URL}/account/login`, { email, password })
    .then(handleResponse)
    .catch(handleError);
};

const logout = () => {
  return axios
    .post(`${URLs.MAIN_URL}/account/logout`)
    .then(handleResponse)
    .catch(handleError);
};

const forgetPassword = (email) => {
  return axios
    .post(`${URLs.MAIN_URL}/forgetPassword`, { email })
    .then(handleResponse)
    .catch(handleError);
};

export const apiAuth = {
  login,
  logout,
  forgetPassword,
};
