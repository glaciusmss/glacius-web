import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export function setAuthToHeader(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeAuthFromHeader() {
  delete axios.defaults.headers.common.Authorization;
}

let requestCancelTokenSource = null;

export function setRequestCancelTokenSource(source) {
  requestCancelTokenSource = source;
}

export function getRequestCancelTokenSource() {
  return requestCancelTokenSource;
}

export function cancelRequest() {
  // this is called on component destroyed
  if (requestCancelTokenSource) {
    requestCancelTokenSource.cancel('canceled: route changed');
    requestCancelTokenSource = undefined;
  }
}

export default function request(options) {
  if (!requestCancelTokenSource) {
    requestCancelTokenSource = axios.CancelToken.source();
  }

  return axios({
    ...options,
    baseURL: process.env.VUE_APP_SERVER_BASE_URL,
    cancelToken: requestCancelTokenSource.token,
  });
}
