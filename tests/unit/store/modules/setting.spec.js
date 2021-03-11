import {
  getters,
  mutations,
  actions,
  initialState,
  SET_CONNECTED_MARKETPLACE,
  DELETE_CONNECTED_MARKETPLACE,
  SET_IS_CONNECTED_MARKETPLACES_LOADED,
  SET_ALL_SETTINGS,
  SET_IS_ALL_SETTINGS_LOADED,
  UPDATE_SETTING,
  RESET_STATE,
} from '@/store/modules/setting';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('vuex setting module', () => {
  describe('getters', () => {
    it('isMarketplaceConnected', () => {
      const state = initialState();

      expect(getters.isMarketplaceConnected(state)('test_marketplace')).toBeFalsy();

      state.connectedMarketplaces = [{
        id: 1,
        name: 'test_marketplace',
      }];

      expect(getters.isMarketplaceConnected(state)('test_marketplace')).toBeTruthy();
    });

    it('findSettingByIdentifier', () => {
      const state = initialState();

      expect(getters.findSettingByIdentifier(state)('test_identifier')).toMatchObject({});

      state.allSettings = {
        test_identifier: { sync: { setting_value: 'test_setting' } },
      };

      expect(getters.findSettingByIdentifier(state)('test_identifier'))
        .toMatchObject(state.allSettings.test_identifier);
    });

    it('findSettingByIdentifierAndCollection', () => {
      const findSettingByIdentifier = jest.fn();
      findSettingByIdentifier.mockReturnValueOnce({ sync: { setting_value: 'test_setting' } });
      const mockGetters = { findSettingByIdentifier };

      const state = initialState();

      expect(getters.findSettingByIdentifierAndCollection(state, mockGetters)('test_identifier', 'sync'))
        .toMatchObject({ setting_value: 'test_setting' });
    });
  });

  describe('mutations', () => {
    it('SET_CONNECTED_MARKETPLACE', () => {
      const state = initialState();

      mutations[SET_CONNECTED_MARKETPLACE](state, [{ id: 1, name: 'test_marketplace' }]);
      expect(state.connectedMarketplaces.length).toEqual(1);
      expect(state.connectedMarketplaces).toContainEqual({ id: 1, name: 'test_marketplace' });
    });

    it('DELETE_CONNECTED_MARKETPLACE', () => {
      const state = initialState();
      state.connectedMarketplaces = [{
        id: 1, name: 'test_marketplace',
      }, {
        id: 2, name: 'another_marketplace',
      }];

      expect(state.connectedMarketplaces.length).toEqual(2);

      mutations[DELETE_CONNECTED_MARKETPLACE](state, 'test_marketplace');
      expect(state.connectedMarketplaces).not.toContainEqual(expect.objectContaining({ name: 'test_marketplace' }));
    });

    it('SET_IS_CONNECTED_MARKETPLACES_LOADED', () => {
      const state = initialState();

      mutations[SET_IS_CONNECTED_MARKETPLACES_LOADED](state, true);
      expect(state.isConnectedMarketplacesLoaded).toBeTruthy();
    });

    it('SET_ALL_SETTINGS', () => {
      const state = initialState();

      mutations[SET_ALL_SETTINGS](state, { test_identifier: { sync: [{ setting_key: 'test_key', setting_value: 'test_setting' }] } });
      expect(state.allSettings).toHaveProperty('test_identifier');
    });

    it('SET_IS_ALL_SETTINGS_LOADED', () => {
      const state = initialState();

      mutations[SET_IS_ALL_SETTINGS_LOADED](state, true);
      expect(state.isAllSettingsLoaded).toBeTruthy();
    });

    it('UPDATE_SETTING', () => {
      const state = initialState();
      state.allSettings = { test_identifier: { sync: [{ setting_key: 'test_key', setting_value: 'test_setting' }] } };

      mutations[UPDATE_SETTING](state, {
        identifier: 'test_identifier',
        collection: 'sync',
        key: 'test_key',
        value: 'test_value',
      });
      expect(state.allSettings.test_identifier.sync).toContainEqual(expect.objectContaining({ setting_value: 'test_value' }));
    });

    it('RESET_STATE', () => {
      const state = initialState();

      mutations[RESET_STATE](state);
      expect(state).toEqual(initialState());
    });
  });

  describe('actions', () => {
    it('loadConnectedMarketplaces', async () => {
      const commit = jest.fn();
      const vuexData = {
        state: { isConnectedMarketplacesLoaded: true },
        commit,
        rootState: { app: { currentShop: { id: 1 } } },
      };

      // nothing happened
      const result = await actions.loadConnectedMarketplaces(vuexData);
      expect(result).toBeUndefined();

      vuexData.state.isConnectedMarketplacesLoaded = false;
      const promise = actions.loadConnectedMarketplaces(vuexData);

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/marketplace-integration',
          method: 'GET',
          params: { shop_id: 1 },
        }),
      );

      mockAxios.mockResponse({ data: [{ id: 1, name: 'test_marketplace' }] });

      await promise;
      expect(commit).toHaveBeenCalledWith(SET_CONNECTED_MARKETPLACE, [{ id: 1, name: 'test_marketplace' }]);
      expect(commit).toHaveBeenCalledWith(SET_IS_CONNECTED_MARKETPLACES_LOADED, true);

      const errPromise = actions.loadConnectedMarketplaces(vuexData);

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('connect', async () => {
      const vuexData = {
        rootState: { app: { currentShop: { id: 1 } } },
      };

      const promise = actions.connect(vuexData, { data: { shop_name: 'test_shop' }, identifier: 'test_identifier' });

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/test_identifier/oauth',
          method: 'POST',
          params: { shop_id: 1 },
          data: { shop_name: 'test_shop' },
        }),
      );

      mockAxios.mockResponse({ data: { url: 'http://example.com' } });

      await expect(promise).resolves.toEqual(expect.objectContaining({ url: 'http://example.com' }));

      const errPromise = actions.connect(vuexData, { data: { shop_name: 'test_shop' }, identifier: 'test_identifier' });

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('disconnect', async () => {
      const commit = jest.fn();
      const vuexData = {
        commit,
        rootState: { app: { currentShop: { id: 1 } } },
      };

      const promise = actions.disconnect(vuexData, 'test_identifier');

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/test_identifier/oauth',
          method: 'DELETE',
          params: { shop_id: 1 },
        }),
      );

      mockAxios.mockResponse({ data: 'done' });

      await promise;

      const errPromise = actions.disconnect(vuexData, 'test_identifier');

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('loadAllSettings', async () => {
      const commit = jest.fn();
      const settings = { test_identifier: { sync: [{ setting_key: 'test_key', setting_value: 'test_setting' }] } };
      const vuexData = {
        state: { isAllSettingsLoaded: true },
        commit,
        rootState: { app: { currentShop: { id: 1 } } },
      };

      // nothing happened
      const result = await actions.loadAllSettings(vuexData);
      expect(result).toBeUndefined();

      vuexData.state.isAllSettingsLoaded = false;
      const promise = actions.loadAllSettings(vuexData);

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/setting',
          method: 'GET',
          params: { shop_id: 1 },
        }),
      );

      mockAxios.mockResponse({ data: settings });

      await promise;
      expect(commit).toHaveBeenCalledWith(SET_ALL_SETTINGS, settings);
      expect(commit).toHaveBeenCalledWith(SET_IS_ALL_SETTINGS_LOADED, true);

      const errPromise = actions.loadAllSettings(vuexData);

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });

    it('updateSetting', async () => {
      const findSettingByIdentifier = jest.fn();
      findSettingByIdentifier.mockReturnValueOnce({ sync: { setting_value: 'test_setting' } });
      const vuexData = {
        getters: { findSettingByIdentifier },
        rootState: { app: { currentShop: { id: 1 } } },
      };

      const promise = actions.updateSetting(vuexData, 'test_identifier');

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/setting/test_identifier',
          method: 'PATCH',
          params: { shop_id: 1 },
          data: { data: { sync: { setting_value: 'test_setting' } } },
        }),
      );

      mockAxios.mockResponse({ data: 'done' });

      await promise;

      const errPromise = actions.updateSetting(vuexData, 'test_identifier');

      mockAxios.mockError('error');

      await expect(errPromise).rejects.toMatch('error');
    });
  });
});
