// interceptors
import axios from 'axios';
import store from '@/store';

axios.interceptors.response.use(null, (error) => {
  if (error.response?.status === 401) {
    if (error.response?.config.url !== '/user/login' && error.response?.config.url !== '/user/logout') {
      return store.dispatch('auth/logoutUser');
    }
  } else if (error.response?.status === 403) {
    return Promise.reject(error);
  } else if (error.response?.status === 422) {
    // transform laravel validation error
    const validationError = error.response?.data?.errors ?? {};
    validationError.isValidationError = true;
    return Promise.reject(validationError);
  }

  return Promise.reject(error);
});
