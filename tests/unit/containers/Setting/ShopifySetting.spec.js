import { createLocalVue, shallowMount } from '@vue/test-utils';
import ShopifySetting from '@/containers/Setting/ShopifySetting.vue';
import Connection from '@/containers/Setting/components/Connection.vue';
import Vuex from 'vuex';
import { UPDATE_SETTING } from '@/store/modules/setting';
import DynamicForm from '@/containers/Setting/components/DynamicForm.vue';
import flushPromises from 'flush-promises';
import { PrimaryButton } from '@/components';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ShopifySetting test', () => {
  let store;
  let getters;
  let mutations;
  let actions;

  beforeEach(() => {
    getters = {
      isMarketplaceConnected: jest.fn(),
      findSettingByIdentifierAndCollection: jest.fn(),
    };

    mutations = {
      [UPDATE_SETTING]: jest.fn(),
    };

    actions = {
      updateSetting: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        setting: {
          namespaced: true,
          getters,
          mutations,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    getters.isMarketplaceConnected.mockReturnValueOnce(() => false);

    const wrapper = shallowMount(ShopifySetting, {
      localVue,
      store,
    });

    expect(wrapper.findComponent(Connection).exists()).toBeTruthy();
  });

  it('should show setting when connected', () => {
    getters.isMarketplaceConnected.mockReturnValueOnce(() => true);
    getters.findSettingByIdentifierAndCollection.mockReturnValueOnce(() => [{
      type: 'boolean',
      setting_key: 'test_key',
      setting_value: true,
    }]);

    const wrapper = shallowMount(ShopifySetting, {
      localVue,
      store,
    });

    expect(wrapper.findComponent(DynamicForm).exists()).toBeTruthy();
  });

  it('should update form when form changed', async () => {
    getters.isMarketplaceConnected.mockReturnValueOnce(() => true);
    getters.findSettingByIdentifierAndCollection.mockReturnValueOnce(() => [{
      type: 'boolean',
      setting_key: 'test_key',
      setting_value: true,
    }]);

    const wrapper = shallowMount(ShopifySetting, {
      localVue,
      store,
    });

    await wrapper.findComponent(DynamicForm).vm.$emit('change', false);
    await flushPromises();

    expect(mutations[UPDATE_SETTING]).toBeCalledWith(expect.objectContaining({}), {
      key: 'test_key',
      value: false,
      collection: 'sync',
      identifier: 'shopify',
    });
  });

  it('should save form on save click', async () => {
    getters.isMarketplaceConnected.mockReturnValueOnce(() => true);
    getters.findSettingByIdentifierAndCollection.mockReturnValueOnce(() => [{
      type: 'boolean',
      setting_key: 'test_key',
      setting_value: true,
    }]);

    const wrapper = shallowMount(ShopifySetting, {
      localVue,
      store,
    });

    await wrapper.findComponent(PrimaryButton).vm.$emit('click');
    await flushPromises();

    expect(actions.updateSetting).toHaveBeenCalledWith(expect.objectContaining({}), 'shopify');
  });

  it('should not save form on save click when submitting', async () => {
    getters.isMarketplaceConnected.mockReturnValueOnce(() => true);
    getters.findSettingByIdentifierAndCollection.mockReturnValueOnce(() => [{
      type: 'boolean',
      setting_key: 'test_key',
      setting_value: true,
    }]);

    const wrapper = shallowMount(ShopifySetting, {
      localVue,
      store,
    });

    await wrapper.setData({ isSubmitting: true });

    await wrapper.findComponent(PrimaryButton).vm.$emit('click');
    await flushPromises();

    expect(actions.updateSetting).not.toHaveBeenCalled();
  });
});
