import { createLocalVue, shallowMount } from '@vue/test-utils';
import BaseLayout from '@/containers/Layout/BaseLayout.vue';
import { PortalTarget } from 'portal-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('BaseLayout test', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        layout: {
          namespaced: true,
          state: {
            dark: true,
          },
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(BaseLayout, {
      localVue,
      store,
      stubs: ['router-view'],
    });

    expect(wrapper.findComponent(PortalTarget).exists()).toBeTruthy();
  });

  it('should apply theme-dark when dark mode is enabled', () => {
    const wrapper = shallowMount(BaseLayout, {
      localVue,
      store,
      stubs: ['router-view'],
    });

    expect(wrapper.find('div').classes()).toContain('theme-dark');
  });
});
