import { ApiCore } from './core';
import apiRequests from './provider-related/requests';
import { handleError, handleResponse } from './response';
import URLs from './urls';
const { axios } = require('./core');

const url = 'materials';
const plural = 'materials';
const single = 'material';

const apiMaterials = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single,
});

const addMaterial = (type, data) => {
  // return axios
  //   .get(`${URLs.BASE_URL}/${}/${authorId}/books`, { params })
  //   .then(handleResponse)
  //   .catch(handleError);
};

apiMaterials.getAllTags = () => {
  return axios
    .get(`${URLs.BASE_URL}/${url}/tags`)
    .then(handleResponse)
    .catch(handleError);
};

apiMaterials.getRatings = (id, params) => {
  return axios
    .get(`${URLs.BASE_URL}/${url}/${id}/ratings`, { params })
    .then(handleResponse)
    .catch(handleError);
};

apiMaterials.getLastXdayEarnings = (id, params) => {
  return axios
    .get(`${URLs.BASE_URL}/${url}/${id}/report/lastXDays`, { params })
    .then(handleResponse)
    .catch(handleError);
};

// const apiMaterialsCommon = { addMaterial };

export default apiMaterials;
