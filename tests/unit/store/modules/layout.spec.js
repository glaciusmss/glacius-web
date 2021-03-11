import {
  initialState, mutations, UPDATE_DARK, UPDATE_SIDE_MENU, RESET_STATE,
} from '@/store/modules/layout';

describe('vuex layout module', () => {
  describe('mutations', () => {
    it('UPDATE_DARK', () => {
      const state = initialState();

      mutations[UPDATE_DARK](state, true);
      expect(state.dark).toBeTruthy();
    });

    it('UPDATE_SIDE_MENU', () => {
      const state = initialState();

      mutations[UPDATE_SIDE_MENU](state, true);
      expect(state.isSideMenuOpen).toBeTruthy();
    });

    it('RESET_STATE', () => {
      const state = initialState();

      mutations[RESET_STATE](state);
      expect(state).toEqual(initialState());
    });
  });
});
