export const SET_CURRENT_SHOP = 'SET_CURRENT_SHOP';
export const UPDATE_CURRENT_SHOP = 'UPDATE_CURRENT_SHOP';
export const UPDATE_IS_CURRENT_SHOP_LOADED = 'UPDATE_IS_CURRENT_SHOP_LOADED';
export const RESET_STATE = 'RESET_STATE';

export const initialState = () => ({
  currentShop: null,
});

export const state = initialState();

export const getters = {
};

export const mutations = {
  [SET_CURRENT_SHOP](state, payload) {
    state.currentShop = payload;
  },
  [UPDATE_CURRENT_SHOP](state, payload) {
    Object.assign(state.currentShop, payload);
  },
  [RESET_STATE](state) {
    Object.assign(state, initialState());
  },
};

export const actions = {
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
