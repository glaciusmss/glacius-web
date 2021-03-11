import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ProfileDropdown from '@/containers/Layout/ProfileDropdown.vue';
import ProfileDropdownItem from '@/containers/Layout/components/ProfileDropdownItem.vue';
import flushPromises from 'flush-promises';
import { Modal } from '@/components';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ProfileDropdown test', () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      logout: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
    });

    expect(wrapper.find('img').exists()).toBeTruthy();
  });

  it('should show dropdown on click', async () => {
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
    });

    expect(wrapper.vm.$data.isOpen).toBeFalsy();

    const dropdownToggler = wrapper.find('button');
    await dropdownToggler.trigger('click');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeTruthy();
  });

  it('should close dropdown on esc key click', async () => {
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
    });

    expect(wrapper.vm.$data.isOpen).toBeFalsy();

    await wrapper.setData({ isOpen: true });

    expect(wrapper.vm.$data.isOpen).toBeTruthy();

    const dropdownToggler = wrapper.find('button');
    await dropdownToggler.trigger('keydown.escape');
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeFalsy();
  });

  it('should close dropdown on outside click', async () => {
    global.addEventListener = jest.fn();
    global.removeEventListener = jest.fn();
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
    });

    expect(wrapper.vm.$data.isOpen).toBeFalsy();

    await wrapper.setData({ isOpen: true });

    expect(wrapper.vm.$data.isOpen).toBeTruthy();
    expect(global.addEventListener).toHaveBeenCalled();

    wrapper.vm.outsideClickHandler({ target: document.createElement('div') });
    await flushPromises();

    expect(wrapper.vm.$data.isOpen).toBeFalsy();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should clear window event before component get destroy', async () => {
    global.removeEventListener = jest.fn();
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
    });

    await wrapper.setData({ isOpen: true });

    expect(global.removeEventListener).not.toHaveBeenCalled();

    wrapper.destroy();

    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should show logout modal on logout click', async () => {
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
    });

    expect(wrapper.vm.$data.isLogoutModalOpen).toBeFalsy();

    await wrapper.setData({ isOpen: true });

    const logoutButton = wrapper.findAllComponents(ProfileDropdownItem).at(1);
    await logoutButton.vm.$emit('click');
    await flushPromises();

    expect(wrapper.vm.$data.isLogoutModalOpen).toBeTruthy();
  });

  it('should logout on confirm click', async () => {
    const $router = { replace: jest.fn() };
    const wrapper = shallowMount(ProfileDropdown, {
      localVue,
      store,
      mocks: { $router },
    });

    await wrapper.setData({ isOpen: true });

    const modal = wrapper.findComponent(Modal);
    await modal.vm.$emit('confirm-click');
    await flushPromises();

    expect(actions.logout).toHaveBeenCalled();
    expect($router.replace).toHaveBeenCalledWith('/login');
  });
});
