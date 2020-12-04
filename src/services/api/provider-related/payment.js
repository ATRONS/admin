import { handleError, handleResponse } from '../response';
import URLs from '../urls';
const { axios } = require('../core');

const paymentInitialData = () => {
  return axios
    .get(`${URLs.MAIN_URL}/account/login`)
    .then(handleResponse)
    .catch(handleError);
};

const requestPayment = (payment) => {
  return axios
    .post(`${URLs.MAIN_URL}/account/login`)
    .then(handleResponse)
    .catch(handleError);
};

export const apiPaymnet = { paymentInitialData, requestPayment };
