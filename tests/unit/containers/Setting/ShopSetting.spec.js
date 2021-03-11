import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import ShopSetting from '@/containers/Setting/ShopSetting.vue';
import { PrimaryButton, Spinner } from '@/components';
import flushPromises from 'flush-promises';
import { ErrorUtils } from '@/mixins';

const localVue = createLocalVue();
localVue.component('spinner', Spinner);

localVue.use(Vuex);

describe('ShopSetting test', () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      updateShop: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            currentShop: { id: 1, name: 'test_shop', description: 'test_desc' },
          },
        },
        shop: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = mount(ShopSetting, {
      localVue,
      store,
    });

    expect(wrapper.text()).toContain('Shop name');
    expect(wrapper.text()).toContain('Shop description');
  });

  it('should save form on save click', async () => {
    const wrapper = mount(ShopSetting, {
      localVue,
      store,
    });

    await wrapper.setData({ name: 'another_shop' });

    const btnSave = wrapper.findComponent(PrimaryButton);
    await btnSave.vm.$emit('click');
    await flushPromises();

    expect(actions.updateShop).toHaveBeenCalledWith(expect.objectContaining({}), { id: 1, name: 'another_shop', description: 'test_desc' });
  });

  it('should handle error', async () => {
    const mockHandleError = jest.spyOn(ErrorUtils.methods, 'handleError');
    const wrapper = mount(ShopSetting, {
      localVue,
      store,
    });

    actions.updateShop.mockImplementationOnce(() => { throw new Error('test_error'); });

    const btnSave = wrapper.findComponent(PrimaryButton);
    await btnSave.vm.$emit('click');
    await flushPromises();

    expect(actions.updateShop).toHaveBeenCalled();
    expect(mockHandleError).toHaveBeenCalledWith(new Error('test_error'), 'description');
  });

  it('should not save form on save click when submitting', async () => {
    const wrapper = mount(ShopSetting, {
      localVue,
      store,
    });

    await wrapper.setData({ isSubmitting: true });

    const btnSave = wrapper.findComponent(PrimaryButton);
    await btnSave.vm.$emit('click');
    await flushPromises();

    expect(actions.updateShop).not.toHaveBeenCalled();
  });
});
