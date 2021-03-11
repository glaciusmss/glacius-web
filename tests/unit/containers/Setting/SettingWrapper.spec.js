import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import SettingWrapper, { tabToUrlMap } from '@/containers/Setting/SettingWrapper.vue';
import { Tabs } from '@/components';
import flushPromises from 'flush-promises';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('SettingWrapper test', () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      loadConnectedMarketplaces: jest.fn(),
      loadAllSettings: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        setting: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  it('should render', () => {
    const wrapper = shallowMount(SettingWrapper, {
      localVue,
      store,
      stubs: ['router-view'],
    });

    expect(actions.loadAllSettings).toHaveBeenCalled();
    expect(actions.loadConnectedMarketplaces).toHaveBeenCalled();
    expect(wrapper.findComponent(Tabs).exists()).toBeTruthy();
  });

  it('should go to correct path on tab switch', async () => {
    const $router = { push: jest.fn() };
    const wrapper = mount(SettingWrapper, {
      localVue,
      store,
      stubs: ['router-view'],
      mocks: { $router, $route: { params: { shopId: 1 } } },
    });

    let callCount = 0;

    // default is 0, we nid set it to -1 to trigger watch
    await wrapper.setData({ selectedTab: -1 });

    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(tabToUrlMap)) {
      const tabIns = wrapper.findAll('button').at(value);

      await tabIns.trigger('click');
      await flushPromises();

      callCount += 1;
      expect($router.push).toHaveBeenNthCalledWith(callCount, `/portal/1/setting/${key}`);
    }
    /* eslint-enable no-await-in-loop */

    expect($router.push).toHaveBeenCalledTimes(callCount);
  });
});
