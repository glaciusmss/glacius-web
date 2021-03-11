import Vuex from 'vuex';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import SetupShop from '@/containers/ShopList/SetupShop.vue';
import { PrimaryButton, Spinner } from '@/components';
import flushPromises from 'flush-promises';
import FontAwesomeIcon from '@/config/font_awesome';
import { ErrorUtils } from '@/mixins';

const localVue = createLocalVue();
localVue.component('font-awesome-icon', FontAwesomeIcon);
localVue.component('spinner', Spinner);

localVue.use(Vuex);

describe('SetupShop test', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      addShop: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        shop: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(SetupShop, {
      localVue,
      store,
    });

    expect(wrapper.text()).toContain('Add shop');
  });

  it('should show add shop modal on add shop clicked', async () => {
    const wrapper = shallowMount(SetupShop, {
      localVue,
      store,
    });

    expect(wrapper.vm.$data.isOpenShopModalOpen).toBeFalsy();

    await wrapper.findAllComponents(PrimaryButton).at(0).vm.$emit('click');
    await flushPromises();

    expect(wrapper.vm.$data.isOpenShopModalOpen).toBeTruthy();
  });

  it('should add shop on add shop click', async () => {
    const wrapper = mount(SetupShop, {
      localVue,
      store,
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    await wrapper.setData({ isOpenShopModalOpen: true, name: 'test_shop', description: 'test_description' });

    await wrapper.findAllComponents(PrimaryButton).at(1).vm.$emit('click');
    await flushPromises();

    expect(actions.addShop).toHaveBeenCalledWith(expect.objectContaining({}), { name: 'test_shop', description: 'test_description' });
  });

  it('should not call addShop agn when isSubmitting', async () => {
    const wrapper = mount(SetupShop, {
      localVue,
      store,
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    await wrapper.setData({ isSubmitting: true, isOpenShopModalOpen: true });

    await wrapper.findAllComponents(PrimaryButton).at(1).vm.$emit('click');
    await flushPromises();

    expect(actions.addShop).not.toHaveBeenCalled();
  });

  it('should reset form after add shop', async () => {
    const wrapper = mount(SetupShop, {
      localVue,
      store,
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    await wrapper.setData({ isOpenShopModalOpen: true, name: 'test_shop', description: 'test_description' });

    await wrapper.findAllComponents(PrimaryButton).at(1).vm.$emit('click');
    await flushPromises();

    expect(wrapper.vm.$data.name).toEqual('');
    expect(wrapper.vm.$data.description).toEqual('');
    expect(wrapper.vm.$data.isOpenShopModalOpen).toBeFalsy();
  });

  it('should handle error', async () => {
    const mockHandleError = jest.spyOn(ErrorUtils.methods, 'handleError');
    actions.addShop.mockImplementationOnce(() => { throw new Error('test_error'); });

    const wrapper = mount(SetupShop, {
      localVue,
      store,
      stubs: {
        Portal: { template: '<div><slot /></div>' },
      },
    });

    await wrapper.setData({ isOpenShopModalOpen: true });

    await wrapper.findAllComponents(PrimaryButton).at(1).vm.$emit('click');
    await flushPromises();

    expect(actions.addShop).toHaveBeenCalled();
    expect(mockHandleError).toHaveBeenCalledWith(new Error('test_error'), 'description');
  });
});
