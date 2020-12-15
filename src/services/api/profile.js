import { handleError, handleResponse } from './response';
import URLs from './urls';
const { axios } = require('./core');

const initialData = () => {
  return axios
    .get(`${URLs.BASE_URL}/initialData`)
    .then(handleResponse)
    .catch(handleError);
};

export const apiProfile = {
  initialData,
};
