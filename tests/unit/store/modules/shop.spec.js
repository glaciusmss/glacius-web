import {
  ADD_SHOP,
  getters,
  actions, initialState, mutations, RESET_STATE, UPDATE_IS_SHOP_LIST_LOADED, UPDATE_SHOP, UPDATE_SHOP_LIST,
} from '@/store/modules/shop';
import mockAxios from 'jest-mock-axios';
import { UPDATE_CURRENT_SHOP } from '@/store/modules/app';

describe('vuex shop module', () => {
  describe('getters', () => {
    it('isShopExist', () => {
      const findShop = jest.fn();
      findShop.mockReturnValueOnce([{ id: 1, name: 'test_shop' }]);
      const state = initialState();

      expect(getters.isShopExist(state, { findShop })('test_shop')).toBeTruthy();
    });

    it('findShop', () => {
      const state = initialState();

      expect(getters.findShop(state)('test_shop')).toBeUndefined();

      state.shopList = [{ id: 1, name: 'test_shop' }];

      expect(getters.findShop(state)('1')).toEqual(expect.objectContaining({ name: 'test_shop' }));
    });
  });

  describe('mutations', () => {
    it('UPDATE_SHOP_LIST', () => {
      const state = initialState();

      mutations[UPDATE_SHOP_LIST](state, [{ id: 1, name: 'test_shop' }]);

      expect(state.shopList).toContainEqual(expect.objectContaining({ name: 'test_shop' }));
    });

    it('UPDATE_IS_SHOP_LIST_LOADED', () => {
      const state = initialState();

      mutations[UPDATE_IS_SHOP_LIST_LOADED](state, true);

      expect(state.isShopListLoaded).toBeTruthy();
    });

    it('ADD_SHOP', () => {
      const state = initialState();

      mutations[ADD_SHOP](state, { id: 1, name: 'test_shop' });

      expect(state.shopList).toContainEqual(expect.objectContaining({ name: 'test_shop' }));
    });

    it('UPDATE_SHOP', () => {
      const state = initialState();
      state.shopList = [{ id: 1, name: 'test_shop' }];

      mutations[UPDATE_SHOP](state, { id: 1, name: 'changed_shop' });

      expect(state.shopList).toContainEqual(expect.objectContaining({ name: 'changed_shop' }));
    });

    it('RESET_STATE', () => {
      const state = initialState();

      mutations[RESET_STATE](state);
      expect(state).toEqual(initialState());
    });
  });

  describe('actions', () => {
    it('loadShopList', async () => {
      const commit = jest.fn();
      const vuexData = {
        state: { isShopListLoaded: true },
        commit,
      };

      // nothing happened
      const result = await actions.loadShopList(vuexData);
      expect(result).toBeUndefined();

      vuexData.state.isShopListLoaded = false;
      const promise = actions.loadShopList(vuexData);

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/shop',
          method: 'GET',
        }),
      );

      mockAxios.mockResponse({ data: [{ id: 1, name: 'test_shop' }] });

      await promise;
      expect(commit).toHaveBeenCalledWith(UPDATE_SHOP_LIST, [{ id: 1, name: 'test_shop' }]);
      expect(commit).toHaveBeenCalledWith(UPDATE_IS_SHOP_LIST_LOADED, true);

      const errPromise = actions.loadShopList(vuexData);

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('addShop', async () => {
      const commit = jest.fn();
      const vuexData = {
        commit,
      };

      const promise = actions.addShop(vuexData, { name: 'test_shop', description: 'test_desc' });

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/shop',
          method: 'POST',
          data: { name: 'test_shop', description: 'test_desc' },
        }),
      );

      mockAxios.mockResponse({ data: { id: 1, name: 'test_shop', description: 'test_desc' } });

      await promise;
      expect(commit).toHaveBeenCalledWith(ADD_SHOP, { id: 1, name: 'test_shop', description: 'test_desc' });

      const errPromise = actions.addShop(vuexData, { name: 'test_shop', description: 'test_desc' });

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('updateShop', async () => {
      const commit = jest.fn();
      const vuexData = {
        commit,
      };

      const promise = actions.updateShop(vuexData, { id: 1, name: 'test_shop', description: 'test_desc' });

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/shop/1',
          method: 'PATCH',
          data: { id: 1, name: 'test_shop', description: 'test_desc' },
        }),
      );

      mockAxios.mockResponse({ data: 'done' });

      await promise;
      expect(commit).toHaveBeenCalledWith(UPDATE_SHOP, { id: 1, name: 'test_shop', description: 'test_desc' });
      expect(commit).toHaveBeenCalledWith(`app/${UPDATE_CURRENT_SHOP}`, { id: 1, name: 'test_shop', description: 'test_desc' }, { root: true });

      const errPromise = actions.updateShop(vuexData, { id: 1, name: 'test_shop', description: 'test_desc' });

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });
  });
});
