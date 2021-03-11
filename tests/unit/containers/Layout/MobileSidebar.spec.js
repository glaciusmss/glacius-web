import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { UPDATE_SIDE_MENU } from '@/store/modules/layout';
import MobileSidebar from '@/containers/Layout/MobileSidebar.vue';
import SidebarContent from '@/containers/Layout/components/SidebarContent.vue';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MobileSidebar test', () => {
  let store;
  let mutations;

  beforeEach(() => {
    mutations = {
      [UPDATE_SIDE_MENU]: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        layout: {
          namespaced: true,
          state: {
            isSideMenuOpen: true,
          },
          mutations,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(MobileSidebar, {
      localVue,
      store,
    });

    expect(wrapper.findComponent(SidebarContent).exists()).toBeTruthy();
  });

  it('should close sidebar on esc click', async () => {
    const wrapper = shallowMount(MobileSidebar, {
      localVue,
      store,
    });

    const sidebarDiv = wrapper.findAll('div').at(2);
    await sidebarDiv.trigger('keydown.escape');
    await flushPromises();

    expect(mutations[UPDATE_SIDE_MENU]).toHaveBeenCalledWith(expect.objectContaining({}), false);
  });
});
