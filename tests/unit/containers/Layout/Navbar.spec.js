import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { UPDATE_DARK, UPDATE_SIDE_MENU } from '@/store/modules/layout';
import Navbar from '@/containers/Layout/Navbar.vue';
import ProfileDropdown from '@/containers/Layout/ProfileDropdown.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Navbar test', () => {
  let store;
  let mutations;

  beforeEach(() => {
    mutations = {
      [UPDATE_DARK]: jest.fn(),
      [UPDATE_SIDE_MENU]: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        layout: {
          namespaced: true,
          state: {
            dark: false,
            isSideMenuOpen: false,
          },
          mutations,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      store,
      stubs: ['router-link'],
    });

    expect(wrapper.findComponent(ProfileDropdown).exists()).toBeTruthy();
  });

  it('should update dark theme on theme toggler click', async () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      store,
      stubs: ['router-link'],
    });

    const themeToggler = wrapper.findAll('button').at(1);
    await themeToggler.trigger('click');
    await flushPromises();

    expect(mutations[UPDATE_DARK]).toHaveBeenCalled();
  });

  it('should update side menu on side menu toggler click', async () => {
    const wrapper = shallowMount(Navbar, {
      localVue,
      store,
      stubs: ['router-link'],
    });

    const themeToggler = wrapper.findAll('button').at(0);
    await themeToggler.trigger('click');
    await flushPromises();

    expect(mutations[UPDATE_SIDE_MENU]).toHaveBeenCalled();
  });
});
