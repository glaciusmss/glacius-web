import request from '@/utils/request';

export const SET_CONNECTED_MARKETPLACE = 'UPDATE_CONNECTED_MARKETPLACE';
export const DELETE_CONNECTED_MARKETPLACE = 'DELETE_CONNECTED_MARKETPLACE';
export const SET_IS_CONNECTED_MARKETPLACES_LOADED = 'SET_IS_CONNECTED_MARKETPLACES_LOADED';
export const SET_ALL_SETTINGS = 'SET_ALL_SETTINGS';
export const SET_IS_ALL_SETTINGS_LOADED = 'SET_IS_ALL_SETTINGS_LOADED';
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const RESET_STATE = 'RESET_STATE';

export const initialState = () => ({
  connectedMarketplaces: [],
  isConnectedMarketplacesLoaded: false,
  allSettings: {},
  isAllSettingsLoaded: false,
});

export const state = initialState();

export const getters = {
  isMarketplaceConnected(state) {
    return (marketplaceName) => !!state.connectedMarketplaces.find((connectedMarketplace) => `${connectedMarketplace.name}` === marketplaceName);
  },
  findSettingByIdentifier(state) {
    return (identifier) => state.allSettings[identifier] ?? {};
  },
  findSettingByIdentifierAndCollection(state, getters) {
    return (identifier, collection) => {
      const setting = getters.findSettingByIdentifier(identifier);
      return setting[collection];
    };
  },
};

export const mutations = {
  [SET_CONNECTED_MARKETPLACE](state, payload) {
    state.connectedMarketplaces = payload;
  },
  [DELETE_CONNECTED_MARKETPLACE](state, payload) {
    const index = state.connectedMarketplaces.findIndex((marketplace) => marketplace.name === payload);
    state.connectedMarketplaces.splice(index, 1);
  },
  [SET_IS_CONNECTED_MARKETPLACES_LOADED](state, payload) {
    state.isConnectedMarketplacesLoaded = payload;
  },
  [SET_ALL_SETTINGS](state, payload) {
    state.allSettings = payload;
  },
  [SET_IS_ALL_SETTINGS_LOADED](state, payload) {
    state.isAllSettingsLoaded = payload;
  },
  [UPDATE_SETTING](state, {
    identifier, collection, key, value,
  }) {
    const oldSetting = state.allSettings[identifier][collection].find((setting) => setting.setting_key === key);
    Object.assign(oldSetting, { setting_value: value });
  },
  [RESET_STATE](state) {
    Object.assign(state, initialState());
  },
};

export const actions = {
  async loadConnectedMarketplaces({ state, commit, rootState }) {
    if (state.isConnectedMarketplacesLoaded) {
      return;
    }

    try {
      const { data } = await request({
        url: '/marketplace-integration',
        method: 'GET',
        params: { shop_id: rootState.app.currentShop?.id },
      });

      commit(SET_CONNECTED_MARKETPLACE, data);
      commit(SET_IS_CONNECTED_MARKETPLACES_LOADED, true);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async connect({ rootState }, { data, identifier }) {
    const requestOpt = {
      url: `/${identifier}/oauth`,
      method: 'POST',
      params: { shop_id: rootState.app.currentShop?.id },
      data,
    };

    try {
      const { data } = await request(requestOpt);

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async disconnect({ commit, rootState }, payload) {
    try {
      await request({
        url: `/${payload}/oauth`,
        method: 'DELETE',
        params: { shop_id: rootState.app.currentShop?.id },
      });

      commit(DELETE_CONNECTED_MARKETPLACE, payload);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async loadAllSettings({ state, commit, rootState }) {
    if (state.isAllSettingsLoaded) {
      return;
    }

    try {
      const { data } = await request({
        url: '/setting',
        method: 'GET',
        params: { shop_id: rootState.app.currentShop?.id },
      });

      commit(SET_ALL_SETTINGS, data);
      commit(SET_IS_ALL_SETTINGS_LOADED, true);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateSetting({ getters, rootState }, identifier) {
    try {
      await request({
        url: `/setting/${identifier}`,
        method: 'PATCH',
        params: { shop_id: rootState.app.currentShop?.id },
        data: { data: getters.findSettingByIdentifier(identifier) },
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
