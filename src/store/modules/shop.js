import request from '@/utils/request';
import { UPDATE_CURRENT_SHOP } from '@/store/modules/app';

export const UPDATE_SHOP_LIST = 'UPDATE_SHOP_LIST';
export const UPDATE_IS_SHOP_LIST_LOADED = 'UPDATE_IS_SHOP_LIST_LOADED';
export const ADD_SHOP = 'ADD_SHOP';
export const UPDATE_SHOP = 'UPDATE_SHOP';
export const RESET_STATE = 'RESET_STATE';

export const initialState = () => ({
  shopList: [],
  isShopListLoaded: false,
});

export const state = initialState();

export const getters = {
  isShopExist(state, getters) {
    return (shopId) => !!getters.findShop(shopId);
  },
  findShop(state) {
    return (shopId) => state.shopList.find((shop) => `${shop.id}` === shopId);
  },
};

export const mutations = {
  [UPDATE_SHOP_LIST](state, payload) {
    state.shopList = payload;
  },
  [UPDATE_IS_SHOP_LIST_LOADED](state, payload) {
    state.isShopListLoaded = payload;
  },
  [ADD_SHOP](state, payload) {
    state.shopList.push(payload);
  },
  [UPDATE_SHOP](state, payload) {
    const oldShop = state.shopList.find((shop) => shop.id === payload.id);
    Object.assign(oldShop, payload);
  },
  [RESET_STATE](state) {
    Object.assign(state, initialState());
  },
};

export const actions = {
  async loadShopList({ commit, state }) {
    if (state.isShopListLoaded) {
      return;
    }

    const { data } = await request({
      url: '/shop',
      method: 'GET',
    });

    commit(UPDATE_SHOP_LIST, data);
    commit(UPDATE_IS_SHOP_LIST_LOADED, true);
  },

  async addShop({ commit }, payload) {
    try {
      const { data } = await request({
        url: '/shop',
        method: 'POST',
        data: payload,
      });

      commit(ADD_SHOP, data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async updateShop({ commit }, payload) {
    try {
      await request({
        url: `/shop/${payload.id}`,
        method: 'PATCH',
        data: payload,
      });

      commit(UPDATE_SHOP, payload);
      commit(`app/${UPDATE_CURRENT_SHOP}`, payload, { root: true });

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
