import axios from 'axios';
import { handleError, handleResponse } from './response';
import URLs from './urls';

const login = (username, password) => {
  return axios
    .post(`${URLs.BASE_URL}/login`, { username, password })
    .then(handleResponse)
    .catch(handleError);
};

const forgetPassword = (email) => {
  return axios
    .post(`${URLs.BASE_URL}/forgetPassword`, { email })
    .then(handleResponse)
    .catch(handleError);
};

export const apiAuth = {
  login,
  forgetPassword,
};
