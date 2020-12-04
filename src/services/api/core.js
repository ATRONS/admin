import axios from 'axios';
import { getCurrentUser, getUserToken } from '../../helpers/Utils';
import { apiProvider } from './main';
import URLs from './urls';

const configureAxios = () => {
  axios.defaults.baseURL = URLs.MAIN_URL;
  // axios.defaults.headers.common['Authorization'] = ;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  // window.axiosInstance = axios;
  const token = getUserToken();
  setAxiosToken(token);
};

const setAxiosToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

class ApiCore {
  constructor(options, isProvider) {
    const urlCommonPrefix = isProvider ? 'provider' : 'admin';
    if (options.getAll) {
      this.getAll = (params) => {
        return apiProvider.getAll(`${urlCommonPrefix}/${options.url}`, params);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id) => {
        return apiProvider.getSingle(`${urlCommonPrefix}/${options.url}`, id);
      };
    }

    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(`${urlCommonPrefix}/${options.url}`, model);
      };
    }

    if (options.put) {
      this.put = (model) => {
        return apiProvider.put(`${urlCommonPrefix}/${options.url}`, model);
      };
    }

    if (options.patch) {
      this.patch = (model) => {
        return apiProvider.patch(`${urlCommonPrefix}/${options.url}`, model);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(`${urlCommonPrefix}/${options.url}`, id);
      };
    }
  }
}

export { ApiCore, setAxiosToken, configureAxios, axios };
