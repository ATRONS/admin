import { handleError, handleResponse } from '../response';
import URLs from '../urls';
const { axios } = require('../core');

const commonURL = `${URLs.MAIN_URL}/provider/profile`;

const activateAccount = (payload) => {
  return axios
    .put(`${commonURL}/activate`, payload)
    .then(handleResponse)
    .catch(handleError);
};

export const apiProfile = {
  activateAccount,
};
