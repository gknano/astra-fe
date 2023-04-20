import axiosOriginal from 'axios';
import qs from 'qs';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/';

const formatParams = (params: Record<string, unknown>): string => {
  return qs.stringify(params, { indices: false, arrayFormat: 'repeat' });
};

export const axios = axiosOriginal.create({
  baseURL: API_BASE_URL,
  paramsSerializer: formatParams,
});
