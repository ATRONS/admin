import { ApiCore } from './core';
import { apiProvider } from './main';
import { handleError, handleResponse } from './response';
import URLs from './urls';
const { axios } = require('./core');

const url = 'users/providers';
const plural = 'users/providers';
const single = 'users/provider';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiProviders = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single,
});

apiProviders.books = (authorId, params) => {
  // Add custom api call logic here
  return axios
    .get(`${URLs.BASE_URL}/${single}/${authorId}/books`, { params })
    .then(handleResponse)
    .catch(handleError);
};

apiProviders.searchAuthor = (params) => {
  return axios
    .get(`${URLs.BASE_URL}/${url}`, { params })
    .then(handleResponse)
    .catch(handleError);
};

apiProviders.deactivate = (authorId, params) => {
  // Add custom api call logic here
  return axios
    .get(`${URLs.BASE_URL}/${single}/${authorId}/deactivate`, { params })
    .then(handleResponse)
    .catch(handleError);
};

apiProviders.getRequests = (filter) => {
  return axios
    .get(`${URLs.BASE_URL}/${url}/requests`, { params: filter })
    .then(handleResponse)
    .catch(handleError);
};

apiProviders.updateRequest = (id, payload) => {
  return axios
    .put(`${URLs.BASE_URL}/${url}/requests/${id}`, payload)
    .then(handleResponse)
    .catch(handleError);
};

export default apiProviders;
