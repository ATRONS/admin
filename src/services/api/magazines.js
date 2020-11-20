import { ApiCore } from './core';

const url = 'magazines';
const plural = 'magazines';
const single = 'magazine';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiMagazines = new ApiCore({
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

apiMagazines.massUpdate = () => {
  // Add custom api call logic here
};

export default apiMagazines;
