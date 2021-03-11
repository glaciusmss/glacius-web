import { createLocalVue, shallowMount } from '@vue/test-utils';
import DesktopSidebar from '@/containers/Layout/DesktopSidebar.vue';
import SidebarContent from '@/containers/Layout/components/SidebarContent.vue';

const localVue = createLocalVue();

describe('DesktopSidebar test', () => {
  it('should render', () => {
    const wrapper = shallowMount(DesktopSidebar, {
      localVue,
    });

    expect(wrapper.findComponent(SidebarContent).exists()).toBeTruthy();
  });
});
