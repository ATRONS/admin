import { ApiCore } from '../core';
import { handleError, handleResponse } from '../response';
import URLs from '../urls';
const { axios } = require('../core');

const url = 'requests';
const plural = 'requests';
const single = 'request';

const apiRequests = new ApiCore(
  {
    getAll: true,
    getSingle: true,
    post: true,
    put: false,
    patch: true,
    delete: false,
    url: url,
    plural: plural,
    single: single,
  },
  true
);

apiRequests.paymentInitialData = () => {
  return axios
    .get(`${URLs.PROVIDERS_URL}/requests/withdrawable`)
    .then(handleResponse)
    .catch(handleError);
};

// const requestPayment = (payment) => {
//   return axios
//     .post(`${URLs.MAIN_URL}/account/login`)
//     .then(handleResponse)
//     .catch(handleError);
// };

export default apiRequests;
