import { ApiCore } from './core';

const url = 'books';
const plural = 'books';
const single = 'book';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiBooks = new ApiCore({
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

export default apiBooks;
