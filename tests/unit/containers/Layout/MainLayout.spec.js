import { createLocalVue, shallowMount } from '@vue/test-utils';
import MainLayout from '@/containers/Layout/MainLayout.vue';
import DesktopSidebar from '@/containers/Layout/DesktopSidebar.vue';
import MobileSidebar from '@/containers/Layout/MobileSidebar.vue';
import Navbar from '@/containers/Layout/Navbar.vue';
import Vuex from 'vuex';
import { SET_CURRENT_SHOP } from '@/store/modules/app';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('MainLayout test', () => {
  let store;
  let appMutations;
  let shopGetters;

  beforeEach(() => {
    appMutations = {
      [SET_CURRENT_SHOP]: jest.fn(),
    };

    shopGetters = {
      findShop: jest.fn(),
      isShopExist: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          mutations: appMutations,
        },
        shop: {
          namespaced: true,
          getters: shopGetters,
        },
      },
    });
  });

  it('should render', async () => {
    shopGetters.isShopExist.mockReturnValueOnce(() => true);
    shopGetters.findShop.mockReturnValueOnce(() => ({ id: 1, name: 'test_shop' }));
    const wrapper = shallowMount(MainLayout, {
      localVue,
      stubs: ['router-view'],
      store,
      mocks: { $route: { params: { shopId: 1 } } },
    });

    await flushPromises();

    expect(wrapper.findComponent(DesktopSidebar).exists()).toBeTruthy();
    expect(wrapper.findComponent(MobileSidebar).exists()).toBeTruthy();
    expect(wrapper.findComponent(Navbar).exists()).toBeTruthy();
  });

  it('should redirect if shop is not exist', async () => {
    shopGetters.isShopExist.mockReturnValueOnce(() => false);
    const $router = { push: jest.fn() };
    shallowMount(MainLayout, {
      localVue,
      store,
      stubs: ['router-view'],
      mocks: { $router, $route: { params: { shopId: 1 } } },
    });

    await flushPromises();

    expect(shopGetters.isShopExist).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith('/portal/shop/list');
  });
});
