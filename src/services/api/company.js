import { ApiCore } from './core';
import { handleError, handleResponse } from './response';
import URLs from './urls';

const url = 'authors';
const plural = 'authors';
const single = 'author';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiCompany = new ApiCore({
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

apiCompany.materials = (authorId, params) => {
  return axios
    .get(`${URLs.BASE_URL}/${single}/${authorId}/materials`, { params })
    .then(handleResponse)
    .catch(handleError);
};

export default apiCompany;
