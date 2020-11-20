import axios from 'axios';
import { handleError, handleResponse } from './response';
import URLs from './urls';

const addMaterial = (type, data) => {
  return axios
    .post(`${URLs.BASE_URL}/addMaterials`, data)
    .then(handleResponse)
    .catch(handleError);
};

const apiMaterialsCommon = { addMaterial };

export default apiMaterialsCommon;
