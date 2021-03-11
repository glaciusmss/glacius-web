import { createLocalVue, shallowMount } from '@vue/test-utils';
import ShopList from '@/containers/ShopList/ShopList.vue';
import Vuex from 'vuex';
import { RESET_STATE } from '@/store/modules/setting';
import { SET_CURRENT_SHOP } from '@/store/modules/app';
import { VueGoodTable } from 'vue-good-table';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ShopList test', () => {
  let $router;
  let settingMutations;
  let appMutations;
  let store;

  beforeEach(() => {
    $router = {
      push: jest.fn(),
    };

    appMutations = {
      [SET_CURRENT_SHOP]: jest.fn(),
    };

    settingMutations = {
      [RESET_STATE]: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          mutations: appMutations,
        },
        shop: {
          namespaced: true,
          state: {
            shopList: [{ id: 1, name: 'test_shop' }],
          },
        },
        setting: {
          namespaced: true,
          mutations: settingMutations,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(ShopList, {
      localVue,
      store,
      mocks: { $router, $route: {} },
    });

    expect(wrapper.text()).toContain('Shop List');
  });

  it('should reset selected shop and setting on mount', () => {
    shallowMount(ShopList, {
      localVue,
      store,
      mocks: { $router, $route: {} },
    });

    expect(appMutations[SET_CURRENT_SHOP]).toHaveBeenCalled();
    expect(settingMutations[RESET_STATE]).toHaveBeenCalled();
  });

  it('should redirect to dashboard on shop click', async () => {
    const wrapper = shallowMount(ShopList, {
      localVue,
      store,
      mocks: { $router, $route: {} },
    });

    await wrapper.findComponent(VueGoodTable).vm.$emit('on-row-click', { row: { id: 1 } });
    await flushPromises();

    expect($router.push).toHaveBeenCalledWith('/portal/1');
  });
});
