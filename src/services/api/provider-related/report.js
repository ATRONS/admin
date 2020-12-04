import { handleError, handleResponse } from '../response';
import URLs from '../urls';
const { axios } = require('../core');

const commonURL = `${URLs.MAIN_URL}/provider`;

const earningByMaterials = () => {
  return axios
    .get(`${commonURL}/earnings`)
    .then(handleResponse)
    .catch(handleError);
};

const transactions = (params) => {
  return axios
    .get(`${commonURL}/transactions`)
    .then(handleResponse)
    .catch(handleError);
};

const earningsSummaries = (params) => {
  return axios
    .get(`${commonURL}/earningsPerDayPerMaterial`, { params })
    .then(handleResponse)
    .catch(handleError);
};

export const apiReports = {
  earningByMaterials,
  transactions,
  earningsSummaries,
};
