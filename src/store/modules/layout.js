export const UPDATE_DARK = 'UPDATE_DARK';
export const UPDATE_SIDE_MENU = 'UPDATE_SIDE_MENU';
export const RESET_STATE = 'RESET_STATE';

export const initialState = () => ({
  dark: false,
  isSideMenuOpen: false,
});

export const state = initialState();

export const getters = {

};

export const mutations = {
  [UPDATE_DARK](state, payload) {
    state.dark = payload;
  },
  [UPDATE_SIDE_MENU](state, payload) {
    state.isSideMenuOpen = payload;
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
