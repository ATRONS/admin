import axios from 'axios';
import { handleError, handleResponse } from './response';
// const URLs.MAIN_URL = 'http://127.0.0.1:3333/api/v1';
import URLs from './urls';

/** @param {string} resource */
const getAll = (resource, params) => {
  return axios
    .get(`${URLs.MAIN_URL}/${resource}`, { params })
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const getSingle = (resource, id) => {
  return axios
    .get(`${URLs.MAIN_URL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model) => {
  return axios
    .post(`${URLs.MAIN_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model) => {
  return axios
    .put(`${URLs.MAIN_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model) => {
  return axios
    .patch(`${URLs.MAIN_URL}/${resource}`, model)
    .then(handleResponse)
    .catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id) => {
  return axios
    .delete(`${URLs.MAIN_URL}/${resource}`, id)
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove,
};
