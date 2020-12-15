// const MAIN_URL = 'http://192.168.43.157:5000/api/v1';
const MAIN_URL =
  'http://ec2-3-126-51-124.eu-central-1.compute.amazonaws.com/api/v1';
const BASE_URL = MAIN_URL + '/admin';
const PROVIDERS_URL = MAIN_URL + '/provider';

const books = 'books/';
const uploadMaterial = BASE_URL + '/upload/material';
const uploadImages = MAIN_URL + '/media/upload/image';

export default {
  BASE_URL,
  MAIN_URL,
  books,
  uploadMaterial,
  uploadImages,
  PROVIDERS_URL,
};
