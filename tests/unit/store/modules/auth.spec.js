import {
  mutations,
  actions,
  getters,
  initialState,
  RESET_STATE,
  SET_AUTH_CHECKED,
  SET_TOKEN,
} from '@/store/modules/auth';
import mockAxios from 'jest-mock-axios';
import { getAuthToken, saveAuthToken } from '@/utils/local_storage';
import axios from 'axios';

afterEach(() => {
  mockAxios.reset();
});

describe('vuex auth module', () => {
  describe('getters', () => {
    it('isAuthenticated', () => {
      const state = initialState();

      expect(getters.isAuthenticated(state)).toBeFalsy();

      state.authChecked = true;
      state.token = 'secret_token';

      expect(getters.isAuthenticated(state)).toBeTruthy();
    });
  });

  describe('mutations', () => {
    it('SET_TOKEN', () => {
      const state = initialState();

      mutations[SET_TOKEN](state, 'secret_token');
      expect(state).toEqual(expect.objectContaining({ token: 'secret_token' }));
    });

    it('SET_AUTH_CHECKED', () => {
      const state = initialState();

      mutations[SET_AUTH_CHECKED](state, true);
      expect(state).toEqual(expect.objectContaining({ authChecked: true }));
    });

    it('RESET_STATE', () => {
      const state = initialState();

      mutations[RESET_STATE](state);
      expect(state).toEqual(initialState());
    });
  });

  describe('actions', () => {
    it('login', async () => {
      const commit = jest.fn();
      const email = 'test@test.com';
      const password = 'secret';

      const promise = actions.login({ commit }, { email, password });

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/user/login',
          method: 'POST',
          data: { email, password },
        }),
      );

      mockAxios.mockResponse({ data: { token: 'secret_token' } });

      await promise;
      expect(commit).toHaveBeenCalledWith(SET_TOKEN, 'secret_token');
      expect(getAuthToken()).not.toBeNull();

      const errPromise = actions.login({ commit }, { email, password });

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('logout', async () => {
      const dispatch = jest.fn();
      actions.logout({ dispatch });

      expect(mockAxios).toHaveBeenCalled();
      mockAxios.mockResponse({ data: {} });

      expect(getAuthToken()).toBeNull();
      expect(dispatch).toHaveBeenCalledWith('resetAllState', null, { root: true });
    });

    it('checkAuth', async () => {
      const commit = jest.fn();
      const dispatch = jest.fn();

      const state = initialState();

      await actions.checkAuth({ commit, state, dispatch });

      expect(dispatch).toHaveBeenCalledWith('checkToken');
      expect(dispatch).toHaveBeenCalledWith('setAuthToRequest');
      expect(commit).toHaveBeenCalledWith(SET_AUTH_CHECKED, true);
    });

    it('checkToken', async () => {
      const commit = jest.fn();
      const state = { ...initialState(), token: 'secret_token' };

      await actions.checkToken({ commit, state });
      expect(commit).not.toHaveBeenCalled();

      state.token = false;
      saveAuthToken('secret_token');
      await actions.checkToken({ commit, state });
      expect(commit).toHaveBeenCalledWith(SET_TOKEN, 'secret_token');
    });

    it('setAuthToRequest', () => {
      const state = { ...initialState(), token: 'secret_token' };

      actions.setAuthToRequest({ state });

      expect(axios.defaults.headers.common.Authorization).toContain('secret_token');
    });
  });
});
