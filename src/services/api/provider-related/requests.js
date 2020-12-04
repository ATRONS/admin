import { ApiCore } from '../core';

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

export default apiRequests;
