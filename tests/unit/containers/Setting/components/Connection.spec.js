import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import {
  DangerButton, Modal, PrimaryButton, Spinner,
} from '@/components';
import Connection from '@/containers/Setting/components/Connection.vue';
import flushPromises from 'flush-promises';
import { ErrorUtils } from '@/mixins';

const localVue = createLocalVue();
localVue.component('spinner', Spinner);

localVue.use(Vuex);

describe('Connection test', () => {
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    getters = {
      isMarketplaceConnected: jest.fn(),
    };

    actions = {
      connect: jest.fn(),
      disconnect: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        setting: {
          namespaced: true,
          getters,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    getters.isMarketplaceConnected.mockReturnValue(() => true);
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    expect(wrapper.text()).toContain('Connected');
  });

  it('should show disconnect confirmation modal on disconnect click', async () => {
    getters.isMarketplaceConnected.mockReturnValue(() => true);
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    const btnDisconnect = wrapper.findComponent(DangerButton);
    await btnDisconnect.vm.$emit('click');
    await flushPromises();

    expect(wrapper.vm.$data.isDisconnectModalOpen).toBeTruthy();
  });

  it('should disconnect on disconnect click', async () => {
    getters.isMarketplaceConnected.mockReturnValue(() => true);
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    await wrapper.setData({ isDisconnectModalOpen: true });

    const modal = wrapper.findComponent(Modal);
    await modal.vm.$emit('confirm-click');
    await flushPromises();

    expect(actions.disconnect).toHaveBeenCalledWith(expect.objectContaining({}), 'test_identifier');
  });

  it('should not disconnect on disconnect click when submitting', async () => {
    getters.isMarketplaceConnected.mockReturnValue(() => true);
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    await wrapper.setData({ isDisconnectModalOpen: true, isDisconnectSubmitting: true });

    const modal = wrapper.findComponent(Modal);
    await modal.vm.$emit('confirm-click');
    await flushPromises();

    expect(actions.disconnect).not.toHaveBeenCalled();
  });

  it('should connect on connect click', async () => {
    getters.isMarketplaceConnected.mockReturnValue(() => false);
    actions.connect.mockReturnValue({ url: 'http://localhost/' });
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    await wrapper.setData({ field: 'test_field' });

    const btnConnect = wrapper.findComponent(PrimaryButton);
    await btnConnect.vm.$emit('click');
    await flushPromises();

    expect(actions.connect).toHaveBeenCalledWith(expect.objectContaining({}), {
      identifier: 'test_identifier',
      data: {
        rtn_url: 'http://localhost/',
        test_field_key: 'test_field',
      },
    });
  });

  it('should not connect on connect click when submitting', async () => {
    getters.isMarketplaceConnected.mockReturnValue(() => false);
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    await wrapper.setData({ isSubmitting: true });

    const btnConnect = wrapper.findComponent(PrimaryButton);
    await btnConnect.vm.$emit('click');
    await flushPromises();

    expect(actions.connect).not.toHaveBeenCalled();
  });

  it('should handle connect error', async () => {
    getters.isMarketplaceConnected.mockReturnValue(() => false);
    const mockHandleError = jest.spyOn(ErrorUtils.methods, 'handleError');
    const wrapper = mount(Connection, {
      localVue,
      store,
      propsData: {
        hasField: true,
        fieldKey: 'test_field_key',
        identifier: 'test_identifier',
      },
    });

    actions.connect.mockImplementationOnce(() => { throw new Error('test_error'); });

    const btnConnect = wrapper.findComponent(PrimaryButton);
    await btnConnect.vm.$emit('click');
    await flushPromises();

    expect(actions.connect).toHaveBeenCalled();
    expect(mockHandleError).toHaveBeenCalledWith(new Error('test_error'), 'test_field_key');
  });
});
