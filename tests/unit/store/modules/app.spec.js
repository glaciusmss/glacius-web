import {
  initialState, mutations, SET_CURRENT_SHOP, UPDATE_CURRENT_SHOP, RESET_STATE,
} from '@/store/modules/app';

describe('vuex auth module', () => {
  describe('mutations', () => {
    it('SET_CURRENT_SHOP', () => {
      const state = initialState();

      mutations[SET_CURRENT_SHOP](state, { id: 1, name: 'test_shop' });
      expect(state.currentShop).toEqual(expect.objectContaining({ name: 'test_shop' }));
    });

    it('UPDATE_CURRENT_SHOP', () => {
      const state = { currentShop: { id: 1, name: 'test_shop' } };

      mutations[UPDATE_CURRENT_SHOP](state, { id: 1, name: 'another_shop' });
      expect(state.currentShop).toEqual(expect.objectContaining({ name: 'another_shop' }));
    });

    it('RESET_STATE', () => {
      const state = initialState();

      mutations[RESET_STATE](state);
      expect(state).toEqual(initialState());
    });
  });
});
