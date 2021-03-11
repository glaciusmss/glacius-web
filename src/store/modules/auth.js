import request, {
  removeAuthFromHeader,
  setAuthToHeader,
} from '@/utils/request';
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '@/utils/local_storage';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const RESET_STATE = 'RESET_STATE';

export const initialState = () => ({
  token: false,
  authChecked: false,
});

export const state = initialState();

export const getters = {
  isAuthenticated(state) {
    return state.authChecked && !!state.token;
  },
};

export const mutations = {
  [SET_TOKEN](state, payload) {
    state.token = payload;
  },
  [SET_AUTH_CHECKED](state, payload) {
    state.authChecked = payload;
  },
  [RESET_STATE](state) {
    Object.assign(state, initialState());
  },
};

export const actions = {
  async login({ commit }, payload) {
    try {
      const { data } = await request({
        url: '/user/login',
        method: 'POST',
        data: payload,
      });

      saveAuthToken(data.token);
      commit(SET_TOKEN, data.token);
      commit(SET_AUTH_CHECKED, false);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout({ dispatch }) {
    request({
      url: '/user/logout',
      method: 'POST',
    }).catch(() => {
      // we dont want logout to fail
    });

    removeAuthToken();
    removeAuthFromHeader();

    dispatch('resetAllState', null, { root: true });
  },

  async checkAuth({ commit, state, dispatch }) {
    if (!state.authChecked) {
      await dispatch('checkToken');
      dispatch('setAuthToRequest');

      commit(SET_AUTH_CHECKED, true);
    }
  },

  async checkToken({ commit, state }) {
    const { token } = state;

    if (token) {
      // token already in state
      return;
    }

    // look from localStorage
    const tokenFromLocalStorage = getAuthToken();
    if (tokenFromLocalStorage) {
      commit(SET_TOKEN, tokenFromLocalStorage);
    }
  },

  setAuthToRequest({ state }) {
    const { token } = state;

    setAuthToHeader(token);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
