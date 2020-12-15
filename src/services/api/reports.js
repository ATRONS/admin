import { handleError, handleResponse } from './response';
import URLs from './urls';
const { axios } = require('./core');

const dashboardReports = () => {
  return axios
    .get(`${URLs.BASE_URL}/dashboardReport`)
    .then(handleResponse)
    .catch(handleError);
};

export const apiReports = {
  dashboardReports,
};
